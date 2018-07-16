import Vue from 'vue';
import router from './router'

Vue.component('main-vue', require('./components/main.vue'));

new Vue({
    router,
    el : '#app',
})