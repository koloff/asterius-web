import _ from 'lodash';
import musclesStore from './muscles';
import exercisesStore from './exercises';
import splitStore from './split';

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
    this.state.workout = workout;
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

  increaseExerciseSets(exKey) {

  },

  reduceExerciseSets(exKey) {

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
