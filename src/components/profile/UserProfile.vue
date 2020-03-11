<template>
    <div class="profile container"
        v-if="profile">

        <div class="wallpaper">
            <img class="user-wallpaper" src="@/assets/bg.jpg">
        </div>

        <div class="profile_img">
            <img class="profile-ava" 
                :src="profile.avatar">
        </div>

        <div class="profile_information"
            v-if="profile">
            <h2 class="profile-name">
                {{profile.fullname}}
            </h2>
            <ul>
                <li><a href="">Follower </a><span>90000</span></li>
                <li><a href="">Following </a><span>100</span></li>
                <li><router-link 
                    :to="{ name: 'EditUserProfile', params: {id: this.profile.id}}">
                    Edit Information
                </router-link>
                </li>
            </ul>
            <div>
                <router-link 
                    :to="{name: 'NewPost' }" 
                    class="btn-small pink lighten-1 btn-new-post ">
                    New Post
                </router-link>
            </div>
            <div class="album" 
                v-if="posts">
                <div class="card" 
                    v-for="post in posts" 
                    :key="post.id">
                    <div class="card-image">
                        <img class="activator" :src="post.image">
                    </div>

                    <div class="card-content post-info">
                        <span class="card-title activator grey-text text-darken-4 post-title">
                            {{ post.title }}
                        </span>
                        <p class="grey-text text-darken-4">
                            {{post.timestamp}} 
                            <span class="like-count">
                                &#128151;
                            </span>
                            {{ post.like }}
                        </p>
                        <a class="btn grey lighten-2 btn-like" 
                            :class="{'pink-text' : post.has_been_liked}" 
                            @click="likePost(post.id)">
                            <i class="material-icons">
                                favorite
                            </i>
                        </a>
                   
                    </div>  
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import moment from 'moment'

export default {
    name: 'UserProfile',
    data(){
        return{
            profile: null,
            user_id: null,
            posts:  []
        }
    },
    beforeCreate(){
        document.body.className = "body-bg-no-image";
        //get the user slug from users collection
        let ref = db.collection('users')
        ref.doc(this.$route.params.id).get().then(user => 
        {
            this.profile =user.data()
            this.profile.id = user.id   //set id of this profile to id of the user in users collection
        })
        firebase.auth().onAuthStateChanged((user) =>
        { //check the current status of the user
            if(user){
                this.user_id = user.uid; //get the account uid
                let postdb = db.collection('posts').where('user_id', '==', this.user_id)//using account uid to find user own post and get post data
                postdb.get().then(snapshot => 
                {
                    if(snapshot){
                    snapshot.forEach(doc =>
                        {
                            let post = doc.data()
                            post.id = doc.id
                            post.timestamp = moment(doc.data().timestamp).format('lll')
                            this.posts.push(post)
                        })
                    }
                })
                
            }
            else
            {
                this.user = null
            }
        })
    },
    created(){
        
    }
}
</script>

<style>
    .profile{
        box-shadow:0px 0px 20px grey;
        position: relative;
        width: 50%;
        
    }
    .user-wallpaper{
        display: block;
        width: 100%;
        height: 300px;
    }
    .profile-ava{
        border: 5px solid rgb(218, 218, 218);
        border-radius: 50%;
        display: block;
        width: 13em;
        height: 13em;
        position: absolute;
        margin: -115px 0 auto 1em;  
    }
    .profile_information{
        background-color: white;
        height: auto;
        margin-bottom: 40px;
    }
    .profile-name{
        color: rgb(39, 21, 21);
        font-size: 2.5em;
        font-weight: 600;
        margin:0 0 0 6.5em;
        text-shadow:-2px   -2px #F3F3F3,
                                 -2px -1.5px #F3F3F3,
                                 -2px   -1px #F3F3F3,
                                 -2px -0.5px #F3F3F3,
                                 -2px    0px #F3F3F3,
                                 -2px  0.5px #F3F3F3,
                                 -2px    1px #F3F3F3,
                                 -2px  1.5px #F3F3F3,
                                 -2px    2px #F3F3F3,
                               -1.5px    2px #F3F3F3,
                                 -1px    2px #F3F3F3,
                               -0.5px    2px #F3F3F3,
                                  0px    2px #F3F3F3,
                                0.5px    2px #F3F3F3,
                                  1px    2px #F3F3F3,
                                1.5px    2px #F3F3F3,
                                  2px    2px #F3F3F3,
                                  2px  1.5px #F3F3F3,
                                  2px    1px #F3F3F3,
                                  2px  0.5px #F3F3F3,
                                  2px    0px #F3F3F3,
                                  2px -0.5px #F3F3F3,
                                  2px   -1px #F3F3F3,
                                  2px -1.5px #F3F3F3,
                                  2px   -2px #F3F3F3,
                                1.5px   -2px #F3F3F3,
                                  1px   -2px #F3F3F3,
                                0.5px   -2px #F3F3F3,
                                  0px   -2px #F3F3F3,
                               -0.5px   -2px #F3F3F3,
                                 -1px   -2px #F3F3F3,
                               -1.5px   -2px #F3F3F3;
    }
   .profile ul{
        margin-top: 2px;
        margin-left: 17em;

    }
    .profile ul li {
        display: inline-block;
        margin-right: 5em;
        margin-top:0.5em;
    }
    .btn-new-post{
        display: block;
        margin: auto;
        width: 95%;
    }
    .album{
        border-top: 3px solid black;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 30px;
        margin: 10px 20px auto;
    }
    .card{
        display: inline-block;
    }
    .card .card-content{
        padding: 0;
    }
    .ab{
        width: 100%;
        height: 100%;
        padding: none;
    }
</style>