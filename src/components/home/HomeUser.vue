<template>
    <div class="home container">
        <div>
            <router-link :to="{name: 'NewPost' }" class="btn-small pink lighten-1 btn-new-post ">
                New Post
            </router-link>
        </div>
        <div class="post" v-for="post in posts" :key="post.id">
            <div class="card user-post" v-for="post in posts" :key="post.id">
                <div class="card-image">
                    <img class="activator" :src="post.image">
                </div>
                    <div class="card-content post-info">
                        <a class="btn grey lighten-2 btn-follow" :class="{'pink-text' : post.has_been_followed}" @click="follow(post.id)"><i class="material-icons">add</i></a>
                        <span class="card-title activator grey-text text-darken-4 user-name"><router-link :to="{ name: 'UserProfile', params: {id: post.user_slug}}"><img class="av" :src="post.ava"></router-link>{{ post.userName }}</span>
                        <span class="card-title activator grey-text text-darken-4 post-title">{{ post.title }}</span>
                        <p class="grey-text text-darken-4">{{post.timestamp}} <span class="like-count">&#128151;</span>{{ post.like }}</p>
                        <a class="btn grey lighten-2 btn-like" :class="{'pink-text' : post.has_been_liked}" @click="likePost(post.id)"><i class="material-icons">favorite</i></a>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import moment from 'moment'

export default {
    name: 'HomeUser',
    data(){
        return {
            posts:  [],
            current_user_id: null,
            current_user_slug: null,
            followers: []
        }
    },
    methods: {

        follow(id){
            //find user_id of this post by post.id
            for (var i in this.posts) {
                if (this.posts[i].id == id) {
                    //if no follower yet
                    if(this.followers.length == 0){
                        //push user_id of this post to another array named 'followers'
                        this.followers.push(this.posts[i].user_id)
                        //change the value of 'has_been_followed' in 'posts' array to true
                        this.posts[i].has_been_followed = true
                        console.log(this.followers)
                        //update new information for the firebase document named 'followers'
                        db.collection('followers').doc(this.current_user_slug).update({
                            user_id: this.current_user_id,
                            //get data from 'followers' array and transfer to 'followers' field in firebase
                            followers: this.followers 
                        })
                    }
                    //if already has follower(s)
                    else{
                        //check if 'followers' array already has this post's user_id
                        if(this.followers.includes(this.posts[i].user_id)){
                            alert("You have already follow this person")
                        }
                        //if not, do the same things as above to get follower_id and update to 'followers' field in firebase
                        else{
                            this.followers.push(this.posts[i].user_id)
                            this.posts[i].has_been_followed = true
                            console.log(this.followers)
                            db.collection('followers').doc(this.current_user_slug).update({
                                user_id: this.current_user_id,
                                followers: this.followers
                            })
                        }
                    }    
                }
            }
            console.log(this.followers)

        },

        likePost(id){
            //run for loop to find current post data by post.id
            for (var i in this.posts) {
                if (this.posts[i].id == id) {
                    if(this.posts[i].has_been_liked == false){
                        this.posts[i].like++; //increse like by 1
                        this.posts[i].has_been_liked = true; 
                        //send to database
                        db.collection('posts').doc(id).update({
                        like: this.posts[i].like
                        })                   
                        break; //Stop this loop
                    }
                    else{
                        this.posts[i].like--; //decrease like by 1
                        this.posts[i].has_been_liked = false;
                        //send to database
                        db.collection('posts').doc(id).update({
                        like: this.posts[i].like
                        })
                    break; //Stop this loop
                    }
                    
                }
            }
            console.log(this.posts)
        }
    },
    beforeCreate(){
        document.body.className = "body-bg-no-image";
    },
    created(){
        //get all data from posts collection
        let postdb = db.collection('posts').orderBy('timestamp', "desc")
        postdb.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change =>{
                if(change.type == 'added'){
                    let post = change.doc
                    //get user data
                    let ref = db.collection('users').where('user_id', '==', post.data().user_id)
                        ref.get().then(snapshot => {
                            snapshot.forEach(doc =>{
                                //push the data from database to posts array
                                this.posts.push({
                                    id: post.id,
                                    image: post.data().image,
                                    like: post.data().like,
                                    //using moment extension to format dates
                                    timestamp: moment(post.data().timestamp).format('lll'), 
                                    title: post.data().title,
                                    user_id: post.data().user_id,
                                    ava: doc.data().avatar,
                                    userName: doc.data().fullname,
                                    user_slug: doc.id,
                                    has_been_liked: false,
                                    has_been_followed: false
                                }) //push the data to the posts array
                                console.log(this.posts)
                            })
                        })
                }
                
            })
        })
        firebase.auth().onAuthStateChanged((user) =>{
            if(user){
                this.current_user_id = user.uid;    
                let ref = db.collection('users').where('user_id', '==', this.current_user_id)
                ref.get().then(snapshot => {
                    snapshot.forEach(doc =>{
                        this.current_user_slug = doc.id
                    })
                })            
            }
            else{
                this.current_user_id = null
            }
        })
    }


    
}
</script>

<style>

    .home{
        height: auto;
        margin-top: 1em;
        max-width: 50%;
        position: relative;
    }
    .user-post{
        margin-bottom: 2em;
    }
    .av{
        border: 5px solid rgb(218, 218, 218);
        border-radius: 50%;
        display: block;
        float: left;
        margin: 0.4em;
        height: 4em;
        width: 4em;
    }
    .btn-new-post{
        display: block;
        margin: 2px auto;
        width: 96%;
    }
    .post-info{
        height: auto;
    }
    .user-name{
        margin-top: 0.5em;
        font-weight: bold !important;
        font-size: 2em !important;
    }
    .post-title{
        font-size: 1.5em !important;
    }
    .btn-like{
        margin-top:0.25em;
        margin-bottom: 0.5em;
        border: none;
    }
    .like-count{
        margin-left: 20px;
    }
    .btn-follow{
        float: right;
        margin-top:0.3em;
        margin-right: 14em;
    }

</style>