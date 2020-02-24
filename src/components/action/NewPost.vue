<template>
    <div class="new-post container">
        <div class="pink lighten-1">
            <h2 class="center white-text">New Post</h2>
        </div>
        <div class="row">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                    <textarea id="textarea1" class="materialize-textarea"></textarea>
                    <label for="textarea1" class='active'>Title</label>
                    </div>
                </div>
            </form>
        </div>
        <button class="btn-small pink lighten-1 up-image">Choose Image</button>
        <div class="center">
            <p class=" btn-large pink lighten-1 up-post ">
                <router-link :to="{ name: 'HomeUser' }">
                    <span>Post</span>
                </router-link>
            </p>
        </div>


    </div>
</template>

<script>
export default {
    name: 'NewPost',
    data(){
        return{

        }
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
</style>