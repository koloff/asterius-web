import 'babel-polyfill';
import Vue from 'vue';
import Root from './Root.vue';

import 'semantic-ui-css/semantic.css';
import 'semantic-ui-css/semantic';
import 'animate.css';
import './style/style.css';

import './lib/mapify/mapify';
import './lib/mapify/jquery.mapify.css';

// init stores
import musclesStore from './store/muscles';
import exercisesStore from './store/exercises';

// load js utils
import './utils/index';
// get routes
import router from './router';

// import filters
import './filters/index';


(async() => {
  try {

    // wait for the stores to fetch the needed data async
    await Promise.all([
      musclesStore.init(),
      exercisesStore.init()
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


