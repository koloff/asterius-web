import _ from 'lodash';
import musclesStore from './muscles';
import exercisesStore from './exercises';

export default {

  state: {
    exercises: []
  },

  init() {
    // load exercises
    this.state.exercises = _.clone(exercisesStore.state.ec.exercises);
    this.state.muscles = _.clone(musclesStore.state.mc.muscles);

    this.loadMuscles();
    this.loadSelectedExercises();
  },

  loadMuscles() {
    this.state.muscles.forEach((muscle) => {
      muscle.selected = false;
    });
  },


  loadSelectedExercises() {
    let selectedExercises = [
      {key: 'dumbbellBenchPress', sets: 3}
    ];

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


  shouldExerciseShow(exKey) {
    console.log(this.state.muscles);
    let exercise = this.getExercise(exKey);
    let usedMusclesArr = Object.keys(exercise.musclesUsed);

    let notFound = true;
    let muscleSelected = false;
    this.state.muscles.forEach((muscle) => {
      if (usedMusclesArr.indexOf(muscle.key) < 0) {
        notFound = false;
      }
      if (muscle.selected) {
        muscleSelected = true;
      }
    });

    return notFound || muscleSelected;
  },

  getExercise(exKey) {
    return _.find(this.state.exercises, {key: exKey});
  },

  isExerciseAdded(exKey) {
    return !!this.getExercise(exKey);
  },

  increaseExerciseSets(exKey) {
    if (!this.isExerciseAdded(exKey)) {
      this.state.exercises.push({name: exKey, sets: 1})
    } else {
      this.getExercise(exKey).sets++;
    }
  },

  reduceExerciseSets(exKey) {
    let ex = this.getExercise(exKey);
    if (ex && ex.sets <= 1) {
      let index = this.state.exercises.indexOf(ex);
      if (index !== -1) {
        this.state.exercises.splice(index, 1);
      }
    } else if (ex) {
      this.getExercise(exKey).sets--;
    }
  },

  calculateMrvPercentage(muscle) {

    // get current volume from selected exercises and sets
    let currentVolume = 0;
    let usedMuscle;

    this.state.exercises.forEach((ex) => {
      let fullEx = getExercise(ex.name);

      usedMuscle = _.find(fullEx.musclesUsed, {name: muscle.name});
      if (usedMuscle) currentVolume += (usedMuscle.percentage / 100) * ex.sets;
    });

    return (currentVolume / muscle.mrv) * 100;
  }


}
