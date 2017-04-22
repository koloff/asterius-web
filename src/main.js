import 'babel-polyfill';
import Vue from 'vue';
import Root from './Root.vue';

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

//init auth store
import authStore from './store/auth';
authStore.init();

// init the app
let vue = new Vue({
  router,
  el: '#app',
  render: h => h(Root)
});

window.Vue = Vue;
window.vue = vue;


// TEST DATA
import firebase from 'firebase';
function seedFirebase() {
  let db = firebase.database().ref();

  db.set({
    userParameters: {
      'pesho': {}
    },
    weeklyExercises: {
      'pesho': {
        exercises: {
          dumbbellBenchPress: 3
        }
      }
    },
    weeklySplits: {
      'pesho': {}
    },
    workouts: {
      'pesho': {
        workouts: {
          'pesho': {
            'id1': {
              currentExerciseIndex: 0,
              date: '03/07/2017',
              exercises: [{
                type: 'exercise',
                key: 'dumbbellBenchPress',
                steps: [{
                  type: 'set',
                  estimatedValues: [
                    {
                      type: 'target',
                      cells: [
                        {
                          reps: 8,
                          weight: 70
                        }
                      ]
                    },
                    {
                      type: 'good',
                      cells: [
                        {
                          reps: 7,
                          weight: 72.5
                        },
                        {
                          reps: 7,
                          weight: 70
                        }, {
                          reps: 10,
                          weight: 67.5
                        },
                      ]
                    },

                  ],
                }, {
                  type: 'rest',
                }, {
                  type: 'set',
                  estimatedValues: [
                    {
                      type: 'target',
                      cells: [
                        {
                          reps: 8,
                          weight: 70
                        }
                      ]
                    },
                    {
                      type: 'good',
                      cells: [
                        {
                          reps: 7,
                          weight: 72.5
                        },
                        {
                          reps: 7,
                          weight: 70
                        }, {
                          reps: 10,
                          weight: 67.5
                        },
                      ]
                    },

                  ],
                }, {
                  type: 'rest',
                }, {
                  type: 'set',
                  estimatedValues: [
                    {
                      type: 'target',
                      cells: [
                        {
                          reps: 8,
                          weight: 70
                        }
                      ]
                    },
                    {
                      type: 'good',
                      cells: [
                        {
                          reps: 7,
                          weight: 72.5
                        },
                        {
                          reps: 7,
                          weight: 70
                        }, {
                          reps: 10,
                          weight: 67.5
                        },
                      ]
                    },

                  ],
                }, {
                  type: 'rest',
                }]
              },
                {
                  type: 'exercise',
                  key: 'lateralRaise',
                  steps: [{
                    type: 'set'
                  }, {
                    type: 'rest'
                  }, {
                    type: 'set'
                  }, {
                    type: 'rest'
                  },
                  ]
                },
                {
                  type: 'exercise',
                  key: 'cableCrossover',
                  steps: [{
                    type: 'set'
                  }, {
                    type: 'rest'
                  }, {
                    type: 'set'
                  }, {
                    type: 'rest'
                  }
                  ]
                },
                {
                  type: 'exercise',
                  key: 'lateralRaise',
                  steps: [{
                    type: 'set'
                  }
                  ]
                }
              ]

            }
          }
        }
      }
    },
    users: {
      'pesho': {}
    },

  }).then((err, res) => {
    console.log(arguments);
  })

}

// seedFirebase();