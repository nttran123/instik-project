<template>
    <div v-if="profile" class="profile container">
        <div class="wallpaper">
            <img class="wp" src="@/assets/bg.jpg">
        </div>

        <div class="profile_img">
            <img class="av" :src="profile.avatar">
        </div>

        <div v-if="profile" class="profile_information">
            <h2>{{profile.fullname}}</h2>
            <ul>
                <li><a href="">Follower </a><span>90000</span></li>
                <li><a href="">Following </a><span>100</span></li>
            </ul>
            <div class="album">
                <div class="card" v-for="image in images" :key="image.id">
                    <div class="card-content">
                        <img class="ab" :src="image.url">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'UserProfile',
    data(){
        return{
            profile: null,
            images:[
                {
                    id: 1,
                    url: require('@/assets/bg.jpg')
                },
                {
                    id: 2,
                    url: require('@/assets/homebg.jpg')
                },
                {
                    id: 3,
                    url: require('@/assets/avatar.jpg')
                },
                {
                    id: 4,
                    url: require('@/assets/img1.jpg')
                },
                {
                    id: 5,
                    url: require('@/assets/img2.jpg')
                },
                {
                    id: 6,
                    url: require('@/assets/img3.jpg')
                },
                {
                    id: 7,
                    url: require('@/assets/img4.jpg')
                },
                {
                    id: 8,
                    url: require('@/assets/img5.jpg')
                },
                {
                    id: 9,
                    url: require('@/assets/img6.jpg')
                },
                {
                    id: 10,
                    url: require('@/assets/img7.jpg')
                },
                {
                    id: 11,
                    url: require('@/assets/img8.jpg')
                },
                {
                    id: 12,
                    url: require('@/assets/img9.jpg')
                },
                {
                    id: 13,
                    url: require('@/assets/img10.jpg')
                },
                {
                    id: 14,
                    url: require('@/assets/img11.jpg')
                },
                {
                    id: 15,
                    url: require('@/assets/img12.jpg')
                },
                {
                    id: 16,
                    url: require('@/assets/img13.jpg')
                },
                {
                    id: 17,
                    url: require('@/assets/img14.jpg')
                },
                {
                    id: 18,
                    url: require('@/assets/img15.jpg')
                },
                {
                    id: 19,
                    url: require('@/assets/img16.jpg')
                },
                {
                    id: 20,
                    url: require('@/assets/img17.jpg')
                }

            ]
        }
    },
    beforeCreate(){
        document.body.className = "body-bg-no-image";
    },
    created(){
        let ref = db.collection('users')
        ref.doc(this.$route.params.id).get().then(user => {
            this.profile =user.data()
        })
    }
}
</script>

<style>
    .container{
        width: 50%;
        position: relative;
        box-shadow:0px 0px 20px grey;
    }
    .wp{
        display: block;
        width: 100%;
        height: 300px;
    }
    .av{
        position: absolute;
        display: block;
        border-radius: 50%;
        width: 13em;
        height: 13em;
        border: 5px solid rgb(218, 218, 218);
        margin: -115px 0 auto 1em;
    }
    .profile_information{
        background-color: white;
        height: auto;
        margin-bottom: 40px;
    }
    h2{
        margin:0 0 0 6.5em;
        font-size: 2.5em;
        font-weight: 600;
        color: rgb(39, 21, 21);
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
    ul{
        margin-top: 2px;
        margin-left: 17em;

    }
    ul li {
        display: inline-block;
        margin-right: 5em;
        margin-top:0.5em;
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