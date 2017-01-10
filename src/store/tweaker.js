import _ from 'lodash';
export default {
  state: {
    exercises: []
  },

  getExercise(exName) {
    console.log(exName);
    console.log(_.find(this.state.exercises, {'name': exName}));
    return _.find(this.state.exercises, {'name': exName});
  },

  isExerciseAdded(exName) {
    return !!this.getExercise(exName);
  },

  increaseExerciseSets(exName) {
    if (!this.isExerciseAdded(exName)) {
      console.log('addd');
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
  }


}