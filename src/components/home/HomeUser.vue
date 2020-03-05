<template>
    <div class="home container">
        <div>
            <router-link :to="{name: 'NewPost' }" class="btn-small pink lighten-1 btn-new-post ">
                New Post
            </router-link>
        </div>
        <div class="post">
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
            posts:[],
            current_user_id: null,
            current_user_slug: null,
            followers:[],
            follower_posts: [],
            unfollower_posts: []
        }
    },
    methods: {

        follow(id){
            //find user_id of this post by post.id
            for (let i in this.posts) {
                if (this.posts[i].id == id) {
                    //check if 'followers' array empty or does not exist
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
        }
    },
    beforeCreate(){
        document.body.className = "body-bg-no-image";
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
                            })
                        })

                }
                
            })
        })
        

    },
    created(){
        //get current user information
        firebase.auth().onAuthStateChanged((user) =>{
            //check if user logged in
            if(user){
                //get current user uid 
                this.current_user_id = user.uid;   
                //get the current user information from 'firebase' using user.uid
                let ref = db.collection('users').where('user_id', '==', this.current_user_id)
                ref.get().then(snapshot => {
                    snapshot.forEach(doc =>{
                        //get the slug of the user
                        this.current_user_slug = doc.id
                        //The idea is we compare each 'post.user_id' with the follower array that we got from 'firebase'
                        //if 'post.user_id' included, push the post to another array named 'follower_posts'
                        //else push the post to other array named 'unfollower_posts'
                        // set 'this.posts' = this.follower_posts.concat(this.unfollower_post) to make the followers_posts have the first position in the array => showing first
                        let fl = db.collection('followers').where('user_id', '==', this.current_user_id)
                        fl.get().then((snapshot) => {
                            snapshot.forEach(doc=>{
                                let flws = doc.data().followers
                                flws.forEach(flw => {
                                    this.followers.push(flw)
                                })
                       
                            })
                            if(this.followers){
                                this.posts.filter(post => {
                                     if(this.followers.includes(post.user_id)){
                                     this.follower_posts.push(post)
                                     }
                                     else{
                                         this.unfollower_posts.push(post)
                                     }

                                })
                                this.posts = this.follower_posts.concat(this.unfollower_posts)  
                                console.log(this.follower_posts)  
                            }               
                        })

                    })

                })

            }
            //if no user
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
        margin: 1em auto 2em;
        width: 100%;
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
        margin: auto;
        width: 100%;
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