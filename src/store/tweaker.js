import _ from 'lodash';
import musclesStore from './muscles';
import exercisesStore from './exercises';
import splitStore from './split';

export default {

  state: {
    exercises: [],
    muscles: []
  },

  setDefaultState() {
    this.state = {
      exercises: [],
      muscles: []
    };
  },

  init() {
    // load exercises
    this.state.exercises = _.clone(exercisesStore.state.ec.exercises);
    this.state.muscles = _.clone(musclesStore.state.mc.muscles);

    this.loadMuscles();
    this.loadSelectedExercises(splitStore.state.split[splitStore.state.currentWorkout]);
  },

  loadMuscles() {
    this.state.muscles.forEach((muscle) => {
      muscle.selected = false;
    });
  },


  loadSelectedExercises(selectedExercises) {
    console.log(selectedExercises);

    this.state.exercises.forEach((exercise) => {
      exercise.sets = 0;
    });

    this.state.exercises.forEach((exercise) => {
      selectedExercises.forEach((selectedExercise) => {
        if (exercise.key === selectedExercise.key) {
          exercise.sets = selectedExercise.sets;
        }
      })
    });
  },

  getSelectedExercises() {
    let arr = [];
    this.state.exercises.forEach((exercise) => {
      if (exercise.sets) {
        arr.push({
          key: exercise.key,
          sets: exercise.sets
        })
      }
    });

    return arr;
  },


  shouldExerciseShow(exKey) {
    let exercise = this.getExercise(exKey);
    let usedMusclesArr = Object.keys(exercise.musclesUsed);

    let muscleSelected = false;
    let trainsSelectedMuscle = true;

    this.state.muscles.forEach((muscle) => {
      if (muscle.selected) {
        muscleSelected = true;
        if (usedMusclesArr.indexOf(muscle.key) < 0) {
          trainsSelectedMuscle = false;
        }
      }
    });

    let isIncluded = exercise.sets > 0;

    return (muscleSelected && trainsSelectedMuscle) || (!muscleSelected && isIncluded);
  },

  appropriateExercisesCount() {
    let count = 0;
    this.state.exercises.forEach((exercise) => {
      if (this.shouldExerciseShow(exercise.key)) {
        count++;
      }
    });

    return count;
  },


  getExercise(key) {
    return _.find(this.state.exercises, {key: key});
  },

  increaseExerciseSets(exKey) {
    let exercise = this.getExercise(exKey);
    exercise.sets++;
  },

  reduceExerciseSets(exKey) {
    let exercise = this.getExercise(exKey);
    if (exercise.sets >= 1) {
      exercise.sets--;
    }
  },

  calculateMrvPercentage(muscle) {
    // get current volume from selected exercises and sets
    let currentVolume = 0;
    let usedMuscle;

    this.state.exercises.forEach((exercise) => {
      _.forOwn(exercise.musclesUsed, (percentage, key) => {
        if (muscle.key === key) {
          currentVolume += exercise.sets * (percentage / 100);
        }
      })
    });

    return (currentVolume / muscle.mrv) * 100;
  }
}
