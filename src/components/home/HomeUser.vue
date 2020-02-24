<template>
    <div class="home container">
        <div class="create-post">
            <p class="btn-small pink lighten-1 newPost ">
            <router-link :to="{ name: 'NewPost' }">
                <span>New Post</span>
            </router-link>
            </p>
        </div>

        <div class="card"  v-for="image in images" :key="image.id">
            <div class="card-image">
                <img class="activator" :src="image.url">
            </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4"><img class="av" src="@/assets/avatar.jpg">{{ image.title }}</span>
                    <a class="btn pink lighten-1"><i class="material-icons">thumb_up</i></a>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeUser',
    data(){
        return {
            images:[
                {
                    id: 1,
                    url: require('@/assets/bg.jpg'),
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, repellendus.'
                },
                 {
                    id: 2,
                    url: require('@/assets/avatar.jpg'),
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, repellendus.'
                },
                {
                    id: 3,
                    url: require('@/assets/img1.jpg'),
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, repellendus.'
                },
                {
                    id: 4,
                    url: require('@/assets/img2.jpg'),
                    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, repellendus.'
                },
            ]
        }
    }
}
</script>

<style>

    .container{
        max-width: 50%;
        height: auto;
        background-color: white;
        margin-top: 1em;
        position: relative;
        box-shadow:0px 0px 20px grey;
    }
    .card{
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }
    .av{
        display: block;
        border-radius: 50%;
        width: 4em;
        height: 4em;
        border: 5px solid rgb(218, 218, 218);
        float: left;
        margin-right: 1em;
    }
    span{
        color: white;
    }
    .newPost{
        display: block;
        margin: 2em auto;
    }

</style>