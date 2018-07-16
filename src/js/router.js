
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
 const routes = [ 
    { path: '/login', component: require('./views/loginView.vue')},
    { path: '/', component: require('./views/homeView.vue')},

      ]

      

    export default new VueRouter({
      routes
    })
