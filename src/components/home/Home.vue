<template>
    <div class="home container">
        <h2 class="center-align light-blue-text text-accent-2">
            Ins
            <span class="pink-text text-lighten-1">
                tik
            </span>
        </h2>
        <p class="center-align pink-text text-lighten-1 content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Nulla officia a quasi suscipit dicta eum laboriosam inventore, 
            nam ab. Sint quod quas, nobis pariatur eaque aliquid repellat, 
            repudiandae similique laudantium ipsa sed perspiciatis
        </p>
        <p class="btn-large pink lighten-1 bt">
            <router-link :to="{ name: 'Register' }">
                <span>START NOW</span>
            </router-link>
        </p>   
    </div>
</template>

<script>
export default {
    name: 'Home',
    data(){
        return{

        }
    },
    beforeCreate() {
        document.body.className = "body-bg-image-home";
    }
}
</script>

<style>
    .home{
        max-width: 40%;
        max-height: 20px;
        background: #F3F3F3;

    }
    h2{
        font-size: 6em;
    }
    .content{
        margin: auto 40px;
    }
    .bt{
        width: 40%;
        margin: 30px 30%;
        font-size: 1em;
    }
    span{
        color: white;
    }
</style>