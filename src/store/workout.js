import _ from 'lodash';

import database from '../database';
import authStore from './auth';

export default {
  state: {
    exercises: []
  },

  async init(yyyymmdd) {
    this.state.exercises = await database.get(`/workouts/${'pesho'}/${yyyymmdd}/exercises`);
  },


  setTodaysWorkout(exercises) {

  },

  getExercise(key) {
    return _.find(this.state.exercises, {key});
  }
}