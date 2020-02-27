<template>
    <div class="nav-bar">
        <nav class="pink lighten-1">
            <div class="container">
                <router-link :to="{ name: 'HomeUser'}" class="brand-logo left">Instik</router-link>
                <ul class="right">
                    <li v-if="!user"><router-link :to="{ name: 'Register'}"><span>Register</span></router-link></li>
                    <li v-if="!user"><router-link :to="{ name: 'Login'}"><span>Login</span></router-link></li>
                    <li v-if="user"><a>{{ user.email }}</a></li>
                    <li v-if="user"><a @click="logOut">Logout</a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>

import firebase from 'firebase'

export default {
    name: 'Navbar',
    data(){
        return {
            user: null,
        }
    },
    methods: {
        logOut(){
            firebase.auth().signOut().then(() =>{
                this.$router.push({ name: 'Login' })
            })
        }
    },
    created(){
        firebase.auth().onAuthStateChanged((user) =>{
            if(user){
                this.user = user
                
            }
            else{
                this.user = null
            }
        })

    }
}
</script>

<style>

</style>