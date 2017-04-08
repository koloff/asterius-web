import _ from 'lodash';

import authStore from './auth';
import firebase from 'firebase';


export default {
  state: {
    hasParameters: false,

    measuringUnit: 'metric',
    weight: null,
    height: null,
    experience: '',
    days: '1-2'
  },

  setDefaultState() {
    this.state = {
      hasParameters: false,

      measuringUnit: 'metric',
      weight: null,
      height: null,
      experience: '',
      days: ''
    };
  },

  async init() {
    return new Promise((resolve, reject) => {
      console.log(authStore.state.uid);
      this.userParametersRef = firebase.database().ref().child(`userParameters`).child(authStore.state.uid);

      this.userParametersRef.on('value', (snap) => {
        let value = snap.val();
        this.state.hasParameters = !!value;

        if (this.state.hasParameters) {
          // set the state
          this.state = value;
        }

        return resolve();
      })
    });
  },

  async updateParameters() {
    return new Promise((resolve, reject) => {


      if (this.state.weight === null || this.state.height === null || !this.state.days || !this.state.experience) {
        return reject(false);
      }

      this.state.weight = parseFloat(this.state.weight);
      this.state.height = parseFloat(this.state.height);


      let options = _.clone(this.state);

      this.userParametersRef.set(options)
        .then(() => {
          return resolve(true);
        })
        .catch((err) => {
          return reject(err);
        })
    })

  }
}