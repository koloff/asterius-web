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
    return new Promise((resolve, reject) => {
      database.watch(`/split/${authStore.state.uid}`, (snap) => {
        let val = snap.val();
        if (val) {
          this.state.split = val;
          tweakerStore.init(this.state.split[this.state.currentWorkout]);
          return resolve(true);
        }
      });
    })
  },

  setCurrentWorkout(type) {
    this.state.currentWorkout = type;
    tweakerStore.init(this.state.split[this.state.currentWorkout]);
  },

  async updateSplit() {
    return database.save(`/split/${authStore.state.uid}`, this.state.split);
  },

}