import _ from 'lodash';
import {ec, getExercise} from '../algorithm/exercise/exercises-collection';

export default {

  // todo: to generate basic training add sets by percentage for each muscle group
  state: {
    exercises: [

      //push
      {key: "dumbbell_bench_press", sets: [{reps: 8}, {reps: 8}, {reps: 8}]},
      {name: "Dumbbell Incline Bench Press", sets: 3},
      {name: "Low Cable Crossover", sets: 3},
      {name: "Cable Crossover", sets: 3},
      {name: "Dumbbell Shoulder Press", sets: 3},
      {name: "Skullcrushers", sets: 3},
      {name: "Rope Pushdown", sets: 3},
      {name: "Seated Triceps Press", sets: 3},

      //pull
      {name: "Lat Pulldown Wide Grip", sets: 3},
      {name: "cable_row", sets: 1, reps: 10, weight: 30},
      {name: "rest", duration: 30},
      {name: "Straight Arm Pulldown", sets: 3},
      {name: "Dumbbell Shrugs", sets: 3},
      {name: "Reverse Pec Deck", sets: 3},
      {name: "Barbell Curl", sets: 3},
      {name: "Overhead Cable Curl", sets: 3},
      {name: "Incline Dumbbell Curl", sets: 3},
      //legs

      {name: "Barbell Squat", sets: 3},
      {name: "Leg Extensions", sets: 3},
      {name: "Leg Curls", sets: 3},
      {name: "Smith Machine Calf Raise", sets: 3},
      {name: "Lateral Raises", sets: 3},
      {name: "Crunches", sets: 3},
      {name: "Twisted Crunches", sets: 3},
      {name: "Cable External Rotation", sets: 3}]
  },

  demo() {
    // let workout: {
    //
    // }
  },
  getExercise(exName) {
    return _.find(this.state.exercises, {'name': exName});
  },

  isExerciseAdded(exName) {
    return !!this.getExercise(exName);
  },

  increaseExerciseSets(exName) {
    if (!this.isExerciseAdded(exName)) {
      this.state.exercises.push({name: exName, sets: 1})
    } else {
      this.getExercise(exName).sets++;
    }
  },

  reduceExerciseSets(exName) {
    let ex = this.getExercise(exName);
    if (ex && ex.sets <= 1) {
      let index = this.state.exercises.indexOf(ex);
      if (index !== -1) {
        this.state.exercises.splice(index, 1);
      }
    } else if (ex) {
      this.getExercise(exName).sets--;
    }
  },

  calculateMRVPercentage(muscle) {

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