import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
 

import Dashboard from './views/dashboard/Dashboard.vue'
 
 
import Gallery from './views/Gallery.vue'
import Redeem from './views/Redeem.vue'
  
import Publish from './views/Publish.vue'

import About from './views/About.vue'

import DigitalAssetsNew from './views/digitalassets/new.vue'
import DigitalAssetsShow from './views/digitalassets/show.vue'

import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({  
  mode: 'history',
  base: process.env.PUBLIC_URL,
  routes: [

   
    {
      path: '/',
      name: 'home',
      component: Home
    },
 
    {
      path: '/gallery/:page?',
      name: 'gallery',
      component: Gallery
    },


    {
      path: '/about',
      name: 'about',
      component: About
    },


    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },


    {
      path: '/redeem/',
      name: 'redeem',
      component: Redeem
    }, 
 

    {
      path: '/redeem/:code',
      name: 'redeem',
      component: Redeem
    }, 
 
    {
      path: '/publish/',
      name: 'publish',
      component: Publish
    }, 
 

    {
      path: '/*',
      component: NotFound
    },
    
 

  ]
})
