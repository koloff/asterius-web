import _ from 'lodash';

import authStore from './auth';
import firebase from 'firebase';


export default {
  state: {
    hasParameters: false,
    userParameters: {
      measuringUnit: 'metric',
      weight: null,
      height: null,
      experience: '',
      days: ''
    }
  },

  setDefaultState() {
    this.state = {
      hasParameters: false,
      userParameters: {
        measuringUnit: 'metric',
        weight: null,
        height: null,
        experience: '',
        days: ''
      }
    };
  },

  async init() {
    return new Promise((resolve, reject) => {
      console.log(authStore.state.uid);
      this.userParametersRef = firebase.database().ref().child(`userParameters`).child(authStore.state.uid);

      this.userParametersRef.on('value', (snap) => {
        let value = snap.val();
        this.state.hasParameters = !!value;
        console.log(this);
        console.log(this.state.hasParameters);

        if (this.state.hasParameters) {
          // set the state
          this.state.userParameters = value;
        }

        return resolve();
      })
    });
  },

  async updateParameters() {
    return new Promise((resolve, reject) => {


      if (this.state.userParameters.weight === null || this.state.userParameters.height === null || !this.state.userParameters.days || !this.state.userParameters.experience) {
        return reject(false);
      }

      this.state.userParameters.weight = parseFloat(this.state.userParameters.weight);
      this.state.userParameters.height = parseFloat(this.state.userParameters.height);


      let options = _.clone(this.state.userParameters);
      delete options.hasParameters;

      this.userParametersRef.set(options)
        .then(() => {
          this.state.hasParameters = true;
          return resolve(true);
        })
        .catch((err) => {
          return reject(err);
        })
    })

  }
}