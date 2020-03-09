<template>
    <div class="login container">
        <form 
            @submit.prevent="login" 
            class="card-panel">

            <h2 class="center pink-text text-lighten-1">
                Login
            </h2>
            <div class="field">
                <label for="email">
                    Email
                </label>
                <input type="text" name="email" 
                    v-model="email">
            </div>
            <div class="field">
                <label for="password">
                    Password
                </label>
                <input type="password" name="password" 
                    v-model="password">
            </div>
            <p class="red-text center" 
                v-if="feedback">
                {{ feedback }}
            </p>
            <div class="field center">
                <button class="btn pink lighten-1">
                    login
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'login',
    data(){
        return {
            email: null,
            password: null,
            feedback: null
        }
    },
    methods:{
        login(){
            //validation
            if(this.email && this.password){
                this.feedback = null
                //sign in to the web using firebase method
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(cred =>
                {
                this.$router.push({ name: 'HomeUser'}) //after login, direct to home user page
                }).catch(err => {
                    alert(err)
                })
            }
            else{
                if(!this.email && this.password)
                {
                    this.feedback = "Please enter your Email"
                }
                else if(this.email && !this.password)
                {
                    this.feedback = "Please enter your Password"
                }
                else
                {
                    this.feedback = "Please enter your Email and password"
                }
            }

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