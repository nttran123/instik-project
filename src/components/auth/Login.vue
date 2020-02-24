<template>
    <div class="login container">
        <form @submit.prevent="login" class="card-panel" method="POST">
            <h2 class="center pink-text text-lighten-1">Login</h2>
            <div class="field">
                <label for="username">User Name</label>
                <input type="text" name="username" v-model="username">
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <p class="red-text" v-if="feedback">{{ feedback }}<p>
            <div class="field center">
                <button class="btn pink lighten-1">login</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'login',
    data(){
        return {
            username: null,
            password: null,
            feedback: null,
        }
    },
    methods:{
        login(){


        }
    },
    beforeCreate() {
    document.body.className = "body-bg-image";
    }

}
</script>

<style>
    .login{
        max-width: 500px;
        margin-top: 60px;
    }
    .login h2{
        font-size: 2.4em;
    }
    .login .field{
        margin-bottom: 16px;
    }
    label{
        color: #000;
        font-size: 16px;
    }
</style>