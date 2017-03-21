import Vue from 'vue';

export default Vue.filter('uppercase', function(str) {
  return str.toUpperCase();
});
