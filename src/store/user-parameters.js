import _ from 'lodash';
import database from '../database';
import authStore from './auth';

export default {
  state: {
    hasParameters: false,
    userParameters: {
      gender: '',
      measuringUnit: 'metric',
      age: 0,
      weight: 0,
      height: 0,
      experience: '',
      days: '',
      preferredMuscles: []
    },
  },

  setDefaultState() {
    this.state = {
      hasUserParameters: false,
      userParameters: {
        gender: '',
        measuringUnit: 'metric',
        age: 0,
        weight: 0,
        height: 0,
        experience: '',
        days: '',
        preferredMuscles: []
      },
    };
  },

  async init() {
    let userParameters = await database.get(`/userParameters/${authStore.state.uid}`);
    if (userParameters) {
      this.state.hasParameters = true;
      this.state.userParameters.gender = userParameters.gender;
      this.state.userParameters.measuringUnit = userParameters.measuringUnit;
      this.state.userParameters.age = userParameters.age;
      this.state.userParameters.weight = userParameters.weight;
      this.state.userParameters.height = userParameters.height;
      this.state.userParameters.experience = userParameters.experience;
      this.state.userParameters.days = userParameters.days;
      this.state.userParameters.preferredMuscles = userParameters.preferredMuscles || [];
    }
  },

  async updateParameters() {
    console.log('updating');
    if (!this.state.userParameters.gender
      || !this.state.userParameters.weight || !this.state.userParameters.height
      || !this.state.userParameters.days || !this.state.userParameters.experience) {
      return Promise.reject(false);
    }
    this.state.userParameters.age = parseFloat(this.state.userParameters.age);
    this.state.userParameters.weight = parseFloat(this.state.userParameters.weight);
    this.state.userParameters.height = parseFloat(this.state.userParameters.height);


    return database.save(`/userParameters/${authStore.state.uid}`, this.state.userParameters);
  }
}