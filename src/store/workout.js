import _ from 'lodash';
import moment from 'moment';
import database from '../database';
import authStore from './auth';
import tweakerStore from './tweaker';

export default {
  state: {
    exercises: []
  },

  async init(yyyymmdd) {
    database.watch(`/workouts/${authStore.state.uid}/${yyyymmdd}/exercises`, (snap) => {
      Vue.set(this.state, 'exercises', snap.val());
    });
  },

  getExercise(key) {
    return _.find(this.state.exercises, {key});
  }
}