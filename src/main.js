import 'babel-polyfill';
import Vue from 'vue';
import Root from './Root.vue';


import 'semantic-ui-css/semantic.css';
import 'semantic-ui-css/semantic';
import 'animate.css';
import './style/style.css';

// load js utils
import './utils/index';

// get routes
import router from './router';

// import filters
import './filters/index';

let vue = new Vue({
  router,
  el: '#app',
  render: h => h(Root)
});

window.vue = vue;
