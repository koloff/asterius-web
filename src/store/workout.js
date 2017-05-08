import _ from 'lodash';

import database from '../database';
import authStore from './auth';

export default {
  state: {
    exercises: []
  },

  async init(yyyymmdd) {
    console.log(yyyymmdd);
    this.state.exercises = await database.get(`/workouts/${'pesho'}/${yyyymmdd}/exercises`);
    console.log(this.state.exercises);
  },

  getExercise(key) {
    return _.find(this.state.exercises, {key});
  }
}