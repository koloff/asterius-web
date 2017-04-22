import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/', component: require('./components/Home.vue')
    },
    {
      path: '/authenticate', component: require('./components/authenticate/AuthView.vue')
    },
    {
      path: '/generate', component: require('./components/profile/UserParameters.vue')
    },
    {
      path: '/split', component: require('./components/split/Split.vue')
    },
    {
      path: '/train', component: require('./components/program/Program.vue')
    },
    {
      path: '/workout/:type', component: require('./components/workout/Workout.vue')
    },
  ]
});
