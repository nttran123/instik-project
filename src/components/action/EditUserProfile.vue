<template>
    <div class="edit-profile container">
        <form @submit.prevent="edit" class="card-panel">
            <h2 class="center pink-text text-lighten-1">Edit Profile</h2>
            <div class="field">
                <label for="editName">New name</label>
                <input type="text" name="editName" v-model="newName">
            </div>
            <div class="changeAvatar field">
                <label for="changeAvatar">Change profile image</label>
                <input type="file" name="changeAvatar">
            </div>
            <div class="field center">
                <button class="btn pink lighten-1">Edit</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'EditUserProfile',
    data(){
        return{
            newName: null,
            newAvatar: ""
        }
    },
    methods: {
        edit(){

        }
    },
    beforeCreate(){
        document.body.className = "body-bg-no-image";
    }
}
</script>

<style>
    .edit-profile{
        max-width: 500px;
        height: auto;
    }
    .changeAvatar{
        margin-top: 1.4em;
    }
</style>