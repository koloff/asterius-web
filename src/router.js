import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/', component: require('./components/App.vue')
    },
    {
      path: '/tweaker', component: require('./components/Tweaker.vue')
    },
    {
      path: '/edit-profile', component: require('./components/EditProfile.vue')
    },
    {
      path: '/experiment', component: require('./components/Experiment.vue')
    }
  ]
});
