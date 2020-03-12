<template>
  <div class="nav-bar">
    <nav>
      <div class="nav-wrapper">
        <router-link :to="{ name: 'HomeUser'}" class="brand-logo logo">
          Instik
        </router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>

        <ul data-target="mobile-demo" class="right hide-on-med-and-down sidenav-trigger">
          <li><a href="#"><i class="material-icons">menu</i></a></li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
      <li v-if="user_info">
        <router-link :to="{ name: 'UserProfile', params: {id: this.user_info.id}}">
          {{ user_info.fullname }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Home'}">
          <i class="material-icons">home</i>HomePage
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'HomeUser'}">
          <i class="material-icons">web</i>Index
        </router-link>
      </li>
      <hr>
      <li v-if="!user">
        <router-link :to="{ name: 'Register'}">
          <i class="material-icons">create</i>Register
        </router-link>
      </li>
      <li v-if="!user">
        <router-link :to="{ name: 'Login'}">
          <i class="material-icons">check_box</i>Login
        </router-link>
      </li>
      <li v-if="user">
        <a @click="logOut">
          Logout
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import db from '@/firebase/init'

  export default {
    name: 'Navbar',
    data() {
      return {
        user: null,
        user_info: null
      }
    },
    //log user out and redirect to login page
    methods: {
      logOut() {
        firebase.auth().signOut().then(() => {
          this.$router.push({
              name: 'Login'
            }),
            this.user = null,
            this.user_info = null
        })
      }
    },

    //get data of a current user from database before render
    created() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          let ref = db.collection('users').where('user_id', '==', this.user.uid)
          ref.get().then(snapshot => {
            if (snapshot) {
              snapshot.forEach(doc => {
                if (doc) {
                  this.user_info = doc.data()
                  this.user_info.id = doc.id
                }

              })
            }
          })
        } else {
          this.user = null
        }
      })

    },
    //Stack Menu
    mounted() {
      $(document).ready(function () {
        $('.sidenav').sidenav({ edge: 'left'});
      });

    }

  }

</script>

<style>
  @media screen and (min-width: 993px) {
    .logo {
      margin-left: 5em;
    }
  }



</style>
