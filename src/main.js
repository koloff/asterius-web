import 'babel-polyfill';
import Vue from 'vue';
import Root from './Root.vue';

import 'semantic-ui-css/semantic.css';
import 'semantic-ui-css/semantic';
import 'animate.css';
import './style/style.css';

import './lib/mapify/mapify';
import './lib/mapify/jquery.mapify.css';

// load firebase
require('./config/firebase');

// load js utils
import './utils/index';

// get routes
import router from './router';

// import filters
import './filters/index';

// init stores
import musclesStore from './store/muscles';
import exercisesStore from './store/exercises';
import workoutStore from './store/workout';
(async() => {
  try {

    // wait for the stores to fetch the needed data async
    await Promise.all([
      musclesStore.init(),
      exercisesStore.init(),
      workoutStore.init()
    ]);

    // init the app
    let vue = new Vue({
      router,
      el: '#app',
      render: h => h(Root)
    });

    window.Vue = Vue;
    window.vue = vue;

  } catch (err) {
    console.error(err);
  }
})();

import firebase from 'firebase';

function seedFirebase() {
  let db = firebase.database().ref();

  db.set({
    workouts: {
      'pesho': {
        'id1': {
          currentExercise: 0,
          date: '03/07/2017',
          exercises: [{
            type: 'exercise',
            key: 'dumbbellBenchPress',
            steps: [
              {
                type: 'rest',
                value: {
                  length: 90
                }
              }, {
                type: 'set',
                value: {
                  reps: 7,
                  weight: 72.5
                }
              }, {
                type: 'rest'
              }, {
                type: 'set'
              }
            ]
          },
            {
              type: 'exercise',
              key: 'lateralRaise',
              steps: [{
                type: 'rest',
                value: {
                  length: 90
                }
              }, {
                type: 'set',
                value: {
                  reps: 7,
                  weight: 72.5
                }
              },
                {
                  type: 'rest'
                }, {
                  type: 'set'
                }, {
                  type: 'rest'
                }, {
                  type: 'set'
                }
              ]
            },
            {
              type: 'exercise',
              key: 'lateralRaise',
              steps: [
                {
                  type: 'rest'
                }, {
                  type: 'set'
                }
              ]
            }
          ]

        }
      }
    }
  }).then((err, res) => {
    console.log(arguments);
  })

}

seedFirebase();