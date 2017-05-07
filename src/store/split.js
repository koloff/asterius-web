import _ from 'lodash';
import database from '../database';
import authStore from './auth';
import tweakerStore from './tweaker';


export default {

  state: {
    currentWorkout: 'A',
    split: {}
  },

  setDefaultState() {
    this.state = {
      currentWorkout: 'A',
      split: {}
    };
  },

  async init() {
    let split = await database.get(`/split/${authStore.state.uid}`);
    if (split) {
      this.state.currentWorkout = 'A';
      this.state.split = split;
      tweakerStore.init(this.state.split[this.state.currentWorkout]);
      return true;
    } else {
      return false;
    }
  },

  setCurrentWorkout(type) {
    this.state.currentWorkout = type;
    tweakerStore.init(this.state.split[this.state.currentWorkout]);
  },

  async updateSplit() {
    return database.save(`/split/${authStore.state.uid}`, this.state.split);
  },

}