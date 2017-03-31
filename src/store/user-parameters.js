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
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    }
  },

  setDefaultState() {
    this.state = {
      hasParameters: false,

      measuringUnit: 'metric',
      weight: null,
      height: null,
      experience: '',
      days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
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

        if (this.state.hasParameters) {
          // set the state
          this.state.measuringUnit = value.measuringUnit;
          this.state.weight = value.weight;
          this.state.height = value.height;
          this.state.experience = value.experience;
          value.days.forEach((day) => {
            this.state.days[day] = true;
          })
        }

        return resolve();
      })
    });
  },

  async updateParameters() {
    return new Promise((resolve, reject) => {

      // check validity
      let days = [];
      _.forOwn(this.state.days, (day, key) => {
        if (day) {
          days.push(key);
        }
      });

      if (this.state.weight === null || this.state.height === null || days.length <= 0 || !this.state.experience) {
        return reject(false);
      }

      this.state.weight = parseFloat(this.state.weight);
      this.state.height = parseFloat(this.state.height);


      let options = _.clone(this.state);
      options.days = days;

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