import _ from 'lodash';
import authStore from './auth';
import firebase from 'firebase';


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
      this.splitRef = firebase.database().ref().child(`split`).child(authStore.state.uid);
      this.splitRef.on('value', (snap) => {
        // set the state
        this.state.split = snap.val();
        return resolve();
      })
    })
  },

  async updateSplit() {
    return new Promise((resolve, reject) => {

      this.splitRef.set(this.state.split)
        .then(() => {
          return resolve(true);
        })
        .catch((err) => {
          console.log(err);
          return reject(err);
        })
    })
  },

  setCurrentWorkout(type) {
    this.state.currentWorkout = type;
  }

}