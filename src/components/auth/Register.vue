<template>
    <div class="register container">
        <form @submit.prevent="register" class="card-panel">
            <h2 class="center pink-text text-lighten-1">Register</h2>
            <div class="field">
                <label for="name">Name </label>
                <input type="text" name="name" v-model="name">
            </div>
            <div class="field">
                <label for="email">Email </label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password </label>
                <input type="password" name="password" v-model="password">
                
            </div>
            <div class="field">
                <label for="repassword">Re-enter Password </label>
                <input type="password" name="repassword" v-model="repassword">
            </div>
            <p v-if="errors.length">
                 <b class="red-text">Please correct the following error(s):</b>
                    <ul>
                    <li class="red-text" v-for="(error,index) in errors" :key="index">{{ error }} </li>
                    </ul>
            </p>
            <div class="field center">
                <button class="btn pink lighten-1">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data(){
        return {
            name: null,
            email: null,
            password: null,
            repassword: null,
            errors: [],
            passwordFieldType: 'password'
        }
    },
    methods:{
        register(){
            this.errors = [];

            if (!this.name) {
            this.errors.push("Name required.");
            }
            else if (!this.validName(this.name)) {
                this.errors.push('Name require at least 5 characters');
            }
            if (!this.email) {
            this.errors.push('Email required.');
            } 
            if(!this.password){
                this.errors.push('Password required.')
            }
            if(!this.repassword){
                this.errors.push('Re-enter password required.')
            }
            else if (this.repassword != this.password) {
            this.errors.push('Password and re-enter password must be the same.');
            }
            if (!this.errors.length) {
            return true;
            }
        },
        validName(name) {
            if(this.name.length >= '5'){
                return true;
            }
            else{
                false
            }
        }
    },
        beforeCreate() {
        document.body.className = "body-bg-image";
    }
}
</script>

<style>
    .register{
        max-width: 500px;
        margin:60px auto;
    }
    .register h2{
        font-size: 2.4em;
    }
    .register .field{
        margin-bottom: 16px;
    }
    label{
        color: #000;
        font-size: 16px;
    }

</style>