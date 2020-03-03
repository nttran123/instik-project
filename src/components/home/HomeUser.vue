<template>
    <div class="home container">
        <div class="create-post">
            <router-link :to="{name: 'NewPost' }" class="btn-small pink lighten-1 newPost ">
                New Post
            </router-link>
        </div>

        <div class="card"  v-for="post in posts" :key="post.id">
            <div class="card-image">
                <img class="activator" :src="post.image">
            </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4 user-name"><img class="av" :src="post.ava">{{ post.userName }}</span>
                    <span class="card-title activator grey-text text-darken-4 post-title">{{ post.title }}</span>
                    <p class="grey-text text-darken-4">{{post.timestamp}}</p>
                    <a class="btn pink lighten-1" @click="likePost"><i class="material-icons">thumb_up</i>{{ post.like }}</a>
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
            user_id: null,
            posts:  [],
            user_info: []
        }
    },
    methods: {
        likePost(){

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
                            let ref = db.collection('users').where('user_id', '==', post.data().user_id)
                                ref.get().then(snapshot => {
                                    snapshot.forEach(doc =>{
                                        this.posts.push({
                                            id: post.id,
                                            image: post.data().image,
                                            like: post.data().like,
                                            timestamp: moment(post.data().timestamp).format('lll'),
                                            title: post.data().title,
                                            user_id: post.data().user_id,
                                            ava: doc.data().avatar,
                                            userName: doc.data().fullname
                                        }) //push the data to the posts array
                                        console.log(this.posts)
                                    })
                                })
                        }
                        
                    })
                })
                
    }


    
}
</script>

<style>

    .container{
        background-color: white;
        box-shadow:0px 0px 20px grey;
        height: auto;
        margin-top: 1em;
        max-width: 50%;
        position: relative;
    }
    .card{
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }
    .av{
        border: 5px solid rgb(218, 218, 218);
        border-radius: 50%;
        display: block;
        float: left;
        margin-right: 1em;
        height: 4em;
        width: 4em;
    }
    span{
        color: white;
    }
    .newPost{
        display: block;
        margin: 2em auto;
    }
    .user-name{
        font-weight: bold !important;
        font-size: 2em !important;
    }
    .post-title{
        font-size: 1.5em !important;
    }

</style>