import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/auth/Register'
import Login from '@/components/auth/Login'
import Home from '@/components/home/Home'
import UserProfile from '@/components/profile/UserProfile'
import HomeUser from '@/components/home/HomeUser'
import NewPost from '@/components/action/NewPost'
import EditUserProfile from '@/components/action/EditUserProfile'

import firebase from 'firebase'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'UserProfile',
      component: UserProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'HomeUser',
      component: HomeUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-post',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/edit-profile',
      name: 'EditUserProfile',
      component: EditUserProfile
    }
  ]
})

router.beforeEach((to, from, next) => {
  //check to see if route requires Auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    //check Auth state of user
    let user = firebase.auth().currentUser
    if(user){
      //user signed in, process to route
      next()
    }
    else{
      //no user login, redirect to login
      next({name: 'Login'})
    }
  }
  else{
    next()
  }
})

export default router