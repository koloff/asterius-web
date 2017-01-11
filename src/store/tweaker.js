import _ from 'lodash';
import {ec, getExercise} from '../algorithm/exercise/exercises-collection';

export default {
  state: {
    exercises: []
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

    console.log(muscle);
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