import _ from 'lodash';
import moment from 'moment';

import database from '../database';
import authStore from './auth';
import workoutStore from './workout';

import http from '../http/http';

export default {
  state: {
    currentExerciseIndex: 0,
    currentSetIndex: 0,
    currentlyTraining: false,
    timer: {}
  },

  getCurrentDayString() {
    return moment().format('YYYY-MM-DD');
  },

  async init(yyyymmdd) {
    this.currentWorkoutPath = `/currentWorkout/${authStore.state.uid}`;
    // the exercises are stored in that path (for easier fetching from other modules)
    this.currentInWorkoutsPath = `/workouts/${authStore.state.uid}/${moment().format('YYYY-MM-DD')}`;

    await workoutStore.init(yyyymmdd);

    if (yyyymmdd !== this.getCurrentDayString() || !workoutStore.state.exercises /*next day has come*/) {
      // not today -> probably finished todo: fix for 00:00
      this.deleteWorkoutForToday();
    }

    //watchers
    database.watch(`/${this.currentWorkoutPath}/currentExerciseIndex`, (snap) => {
      Vue.set(this.state, 'currentExerciseIndex', snap.val());
    });
    database.watch(`/${this.currentWorkoutPath}/currentSetIndex`, (snap) => {
      Vue.set(this.state, 'currentSetIndex', snap.val());
    });
    database.watch(`/${this.currentWorkoutPath}/currentlyTraining`, (snap) => {
      this.state.currentlyTraining = snap.val();
    });
    database.watch(`/${this.currentWorkoutPath}/timer`, (snap) => {
      Vue.set(this.state, 'timer', snap.val());
    });
  },

  async deleteWorkoutForToday() {
    database.save(this.currentInWorkoutsPath, null);
    database.save(this.currentWorkoutPath,  {
      currentExerciseIndex: 0,
      currentSetIndex: 0,
      currentlyTraining: false,
      timer: {
        state: 'stopped'
      }
    });
  },
  async createWorkoutForToday(exercises) {
    console.log(exercises);
    exercises.forEach(exercise => {
      let sets = [];
      for (let i = 0; i < exercise.sets; i++) {
        sets.push({isEstimated: false});
      }
      exercise.sets = sets;
    });
    database.save(this.currentInWorkoutsPath + '/exercises', exercises);
    console.log(this.currentInWorkoutsPath);
    database.save(this.currentWorkoutPath, {
      currentExerciseIndex: 0,
      currentSetIndex: 0,
      currentlyTraining: true,
      timer: {
        state: 'stopped'
      }
    });
    await this.init(this.getCurrentDayString());
  },

  setCurrentExerciseIndex(index) {
    console.log(index);
    database.save(`${this.currentWorkoutPath}/currentExerciseIndex`, index);
  },

  setCurrentSetIndex(index) {
    console.log(index);
    database.save(`${this.currentWorkoutPath}/currentSetIndex`, index);
  },

  getCurrentExercise() {
    return workoutStore.state.exercises[this.state.currentExerciseIndex];
  },

  getCurrentSet() {
    let set = this.getCurrentExercise().sets[this.state.currentSetIndex];
    if (set && !set.estimatedValues) {
      http.getAuthorized(`/algorithm/estimated-values/${this.getCurrentDayString()}/${this.state.currentExerciseIndex}/${this.state.currentSetIndex}`);
    }
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
      // todo
    }
  },

  initTimer() {
    if (this.state.timer.state === 'stopped') {
      database.save(`${this.currentWorkoutPath}/timer/startMoment`, '');
      database.save(`${this.currentWorkoutPath}/timer/state`, 'inited');
    }
  },

  startTimer() {
    if (this.state.timer.state === 'inited') {
      database.save(`${this.currentWorkoutPath}/timer/startMoment`, moment());
      database.save(`${this.currentWorkoutPath}/timer/state`, 'started');
    }
  },

  stopTimer() {
    console.log(this.state.timer.state);
    if (this.state.timer.state === 'started') {
      database.save(`${this.currentWorkoutPath}/timer/state`, 'stopped');
    }
  },

}
