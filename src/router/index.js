import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/auth/Register'
import Login from '@/components/auth/Login'
import Home from '@/components/home/Home'
import UserProfile from '@/components/home/UserProfile'
import HomeUser from '@/components/home/HomeUser'
import NewPost from '@/components/action/NewPost'

Vue.use(Router)

export default new Router({
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
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/home',
      name: 'HomeUser',
      component: HomeUser
    },
    {
      path: '/new_post',
      name: 'NewPost',
      component: NewPost
    }
  ]
})
