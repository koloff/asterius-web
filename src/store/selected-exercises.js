import _ from 'lodash';

import authStore from './auth';
import firebase from 'firebase';

import tweakerStore from './tweaker';

export default {
  state: {
    hasSelectedExercises: false,
    selectedExercises: []
  },

  setDefaultState() {
    this.state = {
      hasSelectedExercises: false,
      selectedExercises: []
    };
  },

  async init() {
    return new Promise((resolve, reject) => {
      this.selectedExercisesRef = firebase.database().ref().child(`selectedExercises`).child(authStore.state.uid);

      this.selectedExercisesRef.on('value', (snap) => {
        let value = snap.val();
        this.state.hasSelectedExercises = !!value;

        if (this.state.hasSelectedExercises) {
          // set the state
          this.state.selectedExercises = value;
        }

        return resolve();
      })
    })
  },

  async updateSelectedExercises() {
    let selectedExercises = tweakerStore.getSelectedExercises();
    return new Promise((resolve, reject) => {
      this.selectedExercisesRef.set(selectedExercises)
        .then(() => {
          return resolve(true);
        })
        .catch((err) => {
          console.log(err);
          return reject(err);
        })
    })
  }
}