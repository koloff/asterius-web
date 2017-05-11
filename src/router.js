import Vue from 'vue';
import VueRouter from 'vue-router';

import authStore from './store/auth';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/', component: require('./components/home/Home.vue')
    },
    {
      path: '/login', component: require('./components/authenticate/Login.vue')
    },
    {
      path: '/register', component: require('./components/authenticate/Register.vue')
    },
    {
      path: '/generate', component: require('./components/generate-parameters/Generate.vue')
    },
    {
      path: '/split', component: require('./components/split/Split.vue')
    },
    {
      path: '/train', component: require('./components/workout/Workout.vue')
    },
    {
      path: '/exercises', component: require('./components/exercises/Exercises.vue')
    },
    {
      path: '/workouts', component: require('./components/workout/PreviousWorkouts.vue')
    },
    {
      path: '/custom-workout', component: require('./components/workout/CreateCustomWorkout.vue')
    },
    {
      path: '/edit-custom-workout', component: require('./components/workout/CustomWorkoutTweaker.vue')
    },
  ]
});


router.beforeEach((to, from, next) => {
  // these paths will not be redirected if not authorized
  const unprotected = ['/login', '/register'];

  if (!authStore.state.uid && (unprotected.indexOf(to.path) < 0)) {
    next({path: '/login'})
  } else {
    next();
  }
});

export default router;