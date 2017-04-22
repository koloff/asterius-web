import _ from 'lodash';
import http from '../http/http';

export default {
  state: {
    ec: null,
  },

  async init() {
    if (!this.state.ec) {
      try {
        this.state.ec = await http.get('/exercises/collection');
      } catch (err) {
        console.error(err);
      }
    }
  },

  getExercise(key) {
    return _.find(this.state.ec.exercises, function(exercise) {
      return exercise.key === key;
    });
  }

}