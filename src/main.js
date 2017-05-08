import 'babel-polyfill';
import Vue from 'vue';
import Root from './components/Root.vue';

import 'semantic-ui-css/semantic.css';
import 'semantic-ui-css/semantic';
import 'animate.css';

import './style/style.css';

import './lib/mapify/mapify';
import './lib/mapify/jquery.mapify.css';

// env related
if (process.env.NODE_ENV !== 'production') {
  // Vue.config.debug = true;
  window.apiUrl = 'http://localhost:3377';
} else {
  window.apiUrl = 'https://asterius-a8808.appspot.com';
}
// load firebase
require('./config/firebase');

// load js utils
import './utils/index';

// get routes
import router from './router';

// import filters
import './filters/index';

// init database
import database from './database';
database.init();

//init stores
import authStore from './store/auth';
import rootStore from './store/root';

(async() => {
  await authStore.init();
  await rootStore.initCollectionStores();
  // init the app
  let vue = new Vue({
    router,
    el: '#app',
    render: h => h(Root)
  });

  window.Vue = Vue;
  window.vue = vue;

  // load directives
  require('./utils/sortable');
})();


// TEST DATA
function seedDatabase() {
  let currentWorkoutPath = `/currentWorkout/pesho`;
  let exercisesPath = `/exercises/pesho`;
  let workoutsPath = `/workouts/pesho/2017-05-08`;

  // currentWorkout format
  database.save(currentWorkoutPath, {
    timer: {
      start: Date.now(),
      duration: 90
    },
    currentExerciseIndex: 0,
    currentSetIndex: 0
  });

  database.save(workoutsPath, {
    exercises: [
      {
        key: 'dumbbellBenchPress',
        sets: [{
          estimatedValues: [{type: 2, weight: 10, reps: 10}, {type: 1, weight: 10, reps: 11}],
          performedValue: {weight: 10, reps: 11}
        },{
          estimatedValues: [{type: 2, weight: 10, reps: 10}, {type: 1, weight: 10, reps: 11}],
          performedValue: {weight: 10, reps: 11}
        },{
          estimatedValues: [{type: 2, weight: 10, reps: 10}, {type: 1, weight: 10, reps: 11}],
          performedValue: {weight: 10, reps: 11}
        },{
          estimatedValues: [{type: 2, weight: 10, reps: 10}, {type: 1, weight: 10, reps: 11}],
          performedValue: {weight: 10, reps: 11}
        },]
      }
    ]
  });

  database.save(exercisesPath, {
    'dumbbellBenchPress': {
      performedIn: {
        '2017-05-08': 0
      }
    }
  })


}

// seedDatabase();