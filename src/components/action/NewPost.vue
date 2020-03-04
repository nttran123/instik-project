<template>
    <div class="new-post container">
        <div class="pink lighten-1">
            <h2 class="center white-text new-post-title">New Post</h2>
        </div>
            <form @submit.prevent="sendPost">
                <div class="row">
                    <div class="input-field col s12">
                    <textarea id="textarea1" class="materialize-textarea" v-model="newPost.title"></textarea>
                    <label for="textarea1" class='active'>Title</label>
                    </div>
                    <div class="field choose-image">
                        <input type="file" @change="uploadImage">
                    </div>
                    <p class="red-text">Please wait until the image upload successfully! (3~5s)</p>
                    <p v-if="feedback" class="red-text">{{ this.feedback }}</p>
                    <div class="field center">
                        <button class="btn pink lighten-1">Send</button>
                    </div>
                </div>
            </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'NewPost',
    data(){
        return{
            newPost: {
                title: null,
                image: null,
                user_id: null
            },
            feedback: null,
        }
    },
    methods: {
        uploadImage(e){
            let file = e.target.files[0]
            //store image in a folder named: user_avatar in firestore
            var storageRef = firebase.storage().ref('user_post/'+file.name)

            let uploadTask =  storageRef.put(file)

            uploadTask.on('state_changed', (snapshot) => {

            }, (error) => {

            }, () => {
                //get the image link and set it to newAva
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.newPost.image = downloadURL
                    alert("Update image successfully")
                })
            })

        },
        sendPost(){
            if(this.newPost.title){
                db.collection('posts').add({
                    title: this.newPost.title,
                    image: this.newPost.image,
                    timestamp: Date.now(),
                    user_id: this.newPost.user_id,
                    like: 0,
                }).then(() => {
                    this.$router.push({name: 'HomeUser'}) //redirect to the user home page
                }).catch(err => {
                    console.log(err)//catch error(s)
                })
            }
            else{
                this.feedback = "Please enter the post title"
            }
        }
    },
    beforeCreate(){
        document.body.className = "body-bg-no-image";
    },
    created(){
        firebase.auth().onAuthStateChanged((user) =>{
            if(user){
                this.newPost.user_id = user.uid;                
            }
            else{
                this.newPost.user_id = null
            }
        })

    }
}
</script>

<style>
    .new-post{
        background-color: white;
    }
    .new-post-title{
        margin-top: 1em;
        font-size: 3em;
    }
    .row{
        height: 170px;
    }
    .up-image{
        width: 40%;
        margin-left: 1em;
        margin-bottom: 1em;
    }
    .post{
        margin: 1em;
    }
    .choose-image{
        margin-left: 1em;
    }
</style>