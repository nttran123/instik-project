<template>
    <div class="nav-bar">
        <nav class="pink lighten-1">
            <div class="container">
                <a href="" class="brand-logo logo">Instik</a>
                <ul class="right">
                    <li><router-link :to="{ name: 'Register'}"><span>Register</span></router-link></li>
                    <li><router-link :to="{ name: 'Login'}"><span>Login</span></router-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
        return {
        }
    }
}
</script>

<style>

</style>