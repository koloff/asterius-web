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
      path: '/create', component: require('./components/profile/EditProfile.vue')
    },
    {
      path: '/program', component: require('./components/Program.vue')
    },
    {
      path: '/workout', component: require('./components/workout/Workout.vue')
    },
    {
      path: '/program/:week/:day', component: require('./components/workout/WorkoutDetails.vue')
    },
    {
      path: '/experiment', component: require('./components/Experiment.vue')
    },

  ]
});
