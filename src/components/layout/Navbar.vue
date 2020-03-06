<template>
    <div class="nav-bar">

        <nav class="pink lighten-1">

            <div class="container">
                
                <router-link :to="{ name: 'HomeUser'}" 
                    class="brand-logo left">
                        Instik
                </router-link>

                <ul class="right">
                    <li v-if="!user">
                        <router-link :to="{ name: 'Register'}">
                            <span>
                                Register
                            </span>
                        </router-link>
                    </li>
                    <li v-if="!user">
                        <router-link :to="{ name: 'Login'}">
                            <span>
                                Login
                            </span>
                        </router-link>
                    </li>
                    <li v-if="user_info">
                        <router-link :to="{ name: 'UserProfile', params: {id: this.user_info.id}}">
                            <span>
                                {{ user_info.fullname }}
                            </span>
                        </router-link>
                    </li>
                    <li v-if="user">
                        <a @click="logOut">
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>

import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'Navbar',
    data(){
        return {
            user: null,
            user_info: null
        }
    },
    //log user out and redirect to login page
    methods: {
        logOut()
        {
            firebase.auth().signOut().then(() =>
            {
                this.$router.push({ name: 'Login' }),
                this.user = null,
                this.user_info = null
            })
        }
    },

    //get data of a current user from database before render
    created(){
        firebase.auth().onAuthStateChanged((user) =>
        {
            if(user)
            {
                this.user = user;
                let ref = db.collection('users').where('user_id', '==', this.user.uid)
                    ref.get().then(snapshot => 
                    {
                        if(snapshot){
                            snapshot.forEach(doc =>
                            {
                                if(doc)
                                {
                                    this.user_info = doc.data()
                                    this.user_info.id = doc.id
                                }

                            })
                        }
                    })
            }
            else
            {
                this.user = null
            }
        })

    }
}
</script>

<style>

</style>