import _ from 'lodash';
import exercisesStore from './exercises';

export default {

  state: {
    workout: [],
    selectedMuscles: []
  },

  setDefaultState() {
    this.state = {
      workout: [],
      selectedMuscles: []
    };
  },

  init(workout) {
    // load exercises
    Vue.set(this.state, 'workout', workout);
  },

  shouldExerciseShow(exercise) {
    if (this.state.selectedMuscles.length === 0) {
      return false;
    }
    let usedMusclesArr = Object.keys(exercise.musclesUsed);
    let res = true;
    this.state.selectedMuscles.forEach((selectedMuscle) => {
      if (usedMusclesArr.indexOf(selectedMuscle) < 0) {
        res = false;
      }
    });
    return res;
  },


  switchMuscle(mKey) {
    if (this.state.selectedMuscles.indexOf(mKey) === -1) {
      this.state.selectedMuscles.push(mKey);
    } else {
      let index = this.state.selectedMuscles.indexOf(mKey);
      if (index >= 0) {
        this.state.selectedMuscles.splice(index, 1);
      }
    }
  },


  addExercise(exKey) {
    if (!this.getWorkoutExercise(exKey)) {
      this.state.workout.push({key: exKey, sets: 3});
    }
  },

  getWorkoutExercise(exKey) {
    return _.find(this.state.workout, {key: exKey});
  },

  reduceExerciseSets(exKey) {
    if (!this.getWorkoutExercise(exKey)) {
      return;
    }

    if (this.getWorkoutExercise(exKey).sets <= 1) {
      let index = this.state.workout.indexOf(this.getWorkoutExercise(exKey));
      this.state.workout.splice(index, 1);
    } else {
      this.getWorkoutExercise(exKey).sets--;
    }
  },

  increaseExerciseSets(exKey) {
    let exercise = this.getWorkoutExercise(exKey);
    if (!exercise) {
      this.state.workout.push({
        key: exKey,
        sets: 1
      })
    } else {
      exercise.sets++;
    }
  },


  calculateMrvPercentage(muscle) {
    // get current volume from selected exercises and sets
    let currentVolume = 0;

    this.state.workout.forEach((exerciseShort) => {
      let exercise = exercisesStore.getExercise(exerciseShort.key);
      let sets = exerciseShort.sets;

      _.forOwn(exercise.musclesUsed, (percentage, key) => {
        if (muscle.key === key) {
          currentVolume += sets * (percentage / 100);
        }
      })
    });

    return (currentVolume / muscle.mrv) * 100;
  }
}
