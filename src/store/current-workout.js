import _ from 'lodash';
import moment from 'moment';

import database from '../database';
import authStore from './auth';
import workoutStore from './workout';

export default {
  state: {
    currentExerciseIndex: 0,
    currentSetIndex: 0,
    isFinished: false,
    timer: {
      state: 'stopped',
      startMoment: null
    }
  },

  async init(yyyymmdd) {
    let todayYyyymmdd = moment().format('YYYY-MM-DD');
    this.currentWorkoutPath = `/currentWorkout/${'pesho'}`;
    this.currentInWorkoutsPath = `/workouts/${'pesho'}/${yyyymmdd}`;

    if (yyyymmdd !== todayYyyymmdd) {
      // not today -> probably finished todo: fix for 00:00
      database.save(`/workouts/${'pesho'}/${yyyymmdd}/isFinished`, true);
      this.state.isFinished = true;
    }

    database.watch(`/${this.currentWorkoutPath}/currentExerciseIndex`, (snap) => {
      this.setCurrentExerciseIndex(snap.val());
    });
    database.watch(`/${this.currentWorkoutPath}/currentSetIndex`, (snap) => {
      this.setCurrentSetIndex(snap.val());
    });
    database.watch(`/${this.currentWorkoutPath}/timer`, (snap) => {
      Vue.set(this.state, 'timer', snap.val());
    });

    await workoutStore.init(yyyymmdd);
  },

  setWorkoutFinished() {
    database.save(`${this.currentWorkoutPath}/isFinished`, true);
    this.state.isFinished = true;
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
    database.save(`${this.currentInWorkoutsPath}/exercises/${this.state.currentExerciseIndex}/sets/${this.state.currentSetIndex}/performedValue`, {
      reps, weight
    });

    this.initTimer();
    Vue.set(this.getCurrentSet(), 'performedValue', {reps, weight});
  },

  isCurrentStepFinal() {
    return this.state.currentExerciseIndex >= workoutStore.state.exercises.length - 1
      && this.state.currentSetIndex >= this.getCurrentExercise().sets.length - 1;
  },

  nextCurrentStep() {

    // not last step
    if (!this.isCurrentStepFinal()) {
      if (this.state.currentSetIndex < this.getCurrentExercise().sets.length - 1) {
        this.setCurrentSetIndex(this.state.currentSetIndex + 1);
      } else {
        this.setCurrentExerciseIndex(this.state.currentExerciseIndex + 1);
        this.setCurrentSetIndex(0);
      }
      this.startTimer();
    } else {

    }

  },


  initTimer() {
    if (this.state.timer.state === 'stopped') {
      database.save(`${this.currentWorkoutPath}/timer/startMoment`, '');
      database.save(`${this.currentWorkoutPath}/timer/state`, 'inited');
      this.state.timer.state = 'inited';
    }
  },


  startTimer() {
    if (this.state.timer.state === 'inited') {
      database.save(`${this.currentWorkoutPath}/timer/startMoment`, moment());
      database.save(`${this.currentWorkoutPath}/timer/state`, 'started');
      this.state.timer.state = 'started';
    }
  },

  stopTimer() {
    console.log(this.state.timer.state);
    if (this.state.timer.state === 'started') {
      database.save(`${this.currentWorkoutPath}/timer/state`, 'stopped');
      this.state.timer.state = 'stopped';
    }
  },

}
