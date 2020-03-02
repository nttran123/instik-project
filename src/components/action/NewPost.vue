<template>
    <div class="new-post container">
        <div class="pink lighten-1">
            <h2 class="center white-text">New Post</h2>
        </div>
        <div class="row">
            <form @submit.prevent="newpost">
                <div class="row">
                    <div class="input-field col s12">
                    <textarea id="textarea1" class="materialize-textarea"></textarea>
                    <label for="textarea1" class='active'>Title</label>
                    </div>
                    <div class="field choose-image">
                        <input type="file">
                    </div>
                    <div class="field center">
                        <button class="btn pink lighten-1">Register</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'NewPost',
    data(){
        return{

        }
    },
    methods: {

    },
    beforeCreate(){
        document.body.className = "body-bg-no-image";
    }
}
</script>

<style>
    .container{
        height: auto;
    }
    h2{
        margin-top: 1em;
        font-size: 3em;
    }
    .row{
        height: 50px;
    }
    .up-image{
        width: 40%;
        margin-left: 1em;
        margin-bottom: 1em;
    }
    .post{
        margin: 1em;
    }
    .choose-image{
        margin-left: 1em;
    }
</style>