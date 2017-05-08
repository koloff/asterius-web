import _ from 'lodash';
import moment from 'moment';

import database from '../database';
import authStore from './auth';
import workoutStore from './workout';

export default {
  state: {
    currentExerciseIndex: 0,
    currentSetIndex: 0,
    timer: {
      state: 'stopped',
      startMoment: null
    }
  },

  async init() {
    let yyyymmdd = moment().format('YYYY-MM-DD');
    this.currentWorkoutPath = `/currentWorkout/${'pesho'}`;
    this.currentInWorkoutsPath = `/workouts/${'pesho'}/${yyyymmdd}`;
    await workoutStore.init(yyyymmdd);
  },

  setCurrentExerciseIndex(index) {
    database.save(`${this.currentWorkoutPath}/currentExerciseIndex`, index);
    this.state.currentExerciseIndex = index;
  },

  setCurrentSetIndex(index) {
    database.save(`${this.currentWorkoutPath}/currentSetIndex`, index);
    this.state.currentSetIndex = index;
  },

  getCurrentExercise() {
    return workoutStore.state.exercises[this.state.currentExerciseIndex];
  },

  getCurrentSet() {
    return this.getCurrentExercise().sets[this.state.currentSetIndex];
  },


  getFirstNotPerformedSetIndex(exerciseIndex) {
    return _.findIndex(workoutStore.state.exercises[exerciseIndex].sets, (set) => !set.performedValue);
  },

  recordCurrentSet(reps, weight) {
    database.save(`${this.currentInWorkoutsPath}/exercises/${this.state.currentExerciseIndex}/${this.state.currentSetIndex}/performedValue`, {
      reps, weight
    });
    this.getCurrentSet().performedValue = {reps, weight};
  },

  startTimer() {
    this.state.timer.state = 'running';
    database.save(`${this.currentWorkoutPath}/timer/startMoment`, moment());
  },

  stopTimer() {
    this.state.timer.state = 'stopped';
  },

}
