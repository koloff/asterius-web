import _ from 'lodash';
import database from '../database';
import authStore from './auth';
import rootStore from './root';

export default {
  state: {
    hasParameters: false,
    userParameters: {
      measuringUnit: 'metric',
      age: null,
      weight: null,
      height: null,
      experience: '',
      days: '',
      preferredMuscles: []
    },
  },

  setDefaultState() {
    this.state = {
      hasUserParameters: false,
      userParameters: {
        measuringUnit: 'metric',
        age: null,
        weight: null,
        height: null,
        experience: '',
        days: '',
        preferredMuscles: []
      },
    };
  },

  init() {
    database.watch(`/userParameters/${authStore.state.uid}`, (snap) => {
      let val = snap.val();
      console.log(val);
      if (val) {
        this.state.hasParameters = true;

        this.state.userParameters.measuringUnit = val.measuringUnit;
        this.state.userParameters.age = val.age;
        this.state.userParameters.weight = val.weight;
        this.state.userParameters.height = val.height;
        this.state.userParameters.experience = val.experience;
        this.state.userParameters.days = val.days;
        this.state.userParameters.preferredMuscles = val.preferredMuscles || [];
      }
    });
  },

  async updateParameters() {
    console.log('updating');
    if (this.state.userParameters.weight === null ||
      this.state.userParameters.height === null || !this.state.userParameters.days || !this.state.userParameters.experience) {
      return Promise.reject(false);
    }

    this.state.userParameters.weight = parseFloat(this.state.userParameters.weight);
    this.state.userParameters.height = parseFloat(this.state.userParameters.height);


    return database.save(`/userParameters/${authStore.state.uid}`, this.state.userParameters);
  }
}