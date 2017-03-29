import _ from 'lodash';

import authStore from './auth';
import firebase from 'firebase';


export default {
  state: {
    hasPreferredMuscles: false,
    preferredMuscles: []
  },

  async init() {
    return new Promise((resolve, reject) => {
      this.preferredMusclesRef = firebase.database().ref().child(`preferredMuscles`).child(authStore.state.uid);

      this.preferredMusclesRef.on('value', (snap) => {
        let value = snap.val();
        this.state.hasPreferredMuscles = !!value;

        if (this.state.hasPreferredMuscles) {
          // set the state
          this.state.preferredMuscles = value;
        }

        return resolve();
      })
    })
  },

  async updatePreferredMuscles() {
    return new Promise((resolve, reject) => {

      this.preferredMusclesRef.set(this.state.preferredMuscles)
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