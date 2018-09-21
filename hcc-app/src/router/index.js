import Vue from 'vue'
import Router from 'vue-router'
import addPost from '@/components/addPost'
import viewAllPosts from '@/components/viewAllPosts'
import signUp from '@/components/signUp'
import singlePost from '@/components/singlePost'
import searchByTag from '@/components/searchByTag'
import profile from '@/components/userProfile'
import signIn from '@/components/signIn'
import singleUser from '@/components/singleUser'
import allUsers from '@/components/allUsers'
import home from '@/components/home'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/posts/add',
      name: 'addPost',
      component: addPost
    }, 
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/posts/',
      name: 'viewAllPosts',
      component: viewAllPosts
    },
    {
      path:'/signup',
      name:'signUp',
      component:signUp
    },
    {
      path:'/post/:title',
      name:'singlePost',
      component:singlePost
    },
    {
      path:'/posts/tags/:tag',
      name:'searchByTag',
      component:searchByTag
    },
    {
      path:'/profile/',
      name:'profile',
      component:profile
    },
    {
      path:'/signin/',
      name:'signIn',
      component:signIn
    },
    {
      path:'/user/:userName',
      name:'singleUser',
      component:singleUser
    },
    {
      path:'/users',
      name:'allUsers',
      component:allUsers
    }

  ],
  mode: 'history',

})
