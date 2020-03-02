<template>
    <div v-if="user_info" class="edit-profile container">
        <form @submit.prevent="edit" class="card-panel">
            <h2 class="center pink-text text-lighten-1">Edit Profile</h2>
            <div class="field">
                <label for="editName">New name</label>
                <input type="text" name="editName" v-model="user_info.fullname">
            </div>
            <div class="changeAvatar field">
                <label for="changeAvatar">Change profile image</label>
                <input type="file" @change="uploadImage" name="changeAvatar">
            </div>
            <div class="btn-edit field center">
                <button class="btn pink lighten-1">Edit</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'EditUserProfile',
    data(){
        return{
            user: null,
            user_info: null,
            newAva:null
        }
    },
    methods: {
        uploadImage(e){
            let file = e.target.files[0]
            //store image in a folder named: user_avatar in firestore
            var storageRef = firebase.storage().ref('user_avatar/'+file.name)

            let uploadTask =  storageRef.put(file)

            uploadTask.on('state_changed', (snapshot) => {

            }, (error) => {

            }, () => {
                //get the image link and set it to newAva
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.newAva = downloadURL
                    alert("Update image successfully")
                })
            })

        },
        edit(){
            //locate this user data location via user_id and update the information
            db.collection('users').doc(this.user_info.id).update({
                fullname: this.user_info.fullname, //name string
                avatar: this.newAva //image link string
            }).then(() => {
                this.$router.push({name: 'UserProfile', params: this.user_info.id}) //redirect to the user profile page
            }).catch(err => {
                console.log(err)//catch error(s)
            })
        }
    },
    beforeCreate(){
        document.body.className = "body-bg-no-image";//set the defaul background for the page before created hook
    },
    created(){
        //get all data of this user from firebase before rendering the page
        firebase.auth().onAuthStateChanged((user) =>{
            if(user){
                this.user = user;
                let ref = db.collection('users').where('user_id', '==', this.user.uid)
                ref.get().then(snapshot => {
                    snapshot.forEach(doc =>{
                        this.user_info = doc.data() //get all data of this user and put all into user_info
                        this.user_info.id = doc.id 
                    })
                })
                
            }
            else{
                this.user = null
            }
        })

    }
}
</script>

<style>
    .edit-profile{
        max-width: 500px;
        height: auto;
    }
    .changeAvatar{
        margin-top: 1.4em;
    }
    .btn-edit{
        margin-top: 1em;
    }
</style>