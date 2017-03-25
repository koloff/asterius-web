import firebase from 'firebase';
import _ from 'lodash';


export default {
  state: {
    currentStep: 0,
    timer: {
      seconds: 0,
      state: 'stopped' // stopped, running, paused
    },
    workout: {}
  },

  init() {
  },


  // firebase related
  loadWorkout() {
    this.workoutRef = firebase.database().ref().child(`workouts/pesho/id1`);

    this.workoutRef.child('exercises').on('value', (ref) => {
      this.state.exercises = ref.val();
    });
    this.workoutRef.child('currentExercise').on('value', (ref) => {
      this.state.currentExercise = ref.val();
    });

    this.state.currentStep = this.getFirstNotDoneStep();
  },

  getCurrentExercise() {
    return this.state.exercises[this.state.currentExercise];
  },

  setCurrentExercise(index) {
    this.workoutRef.child('/currentExercise').set(index);
    this.state.currentStep = this.getFirstNotDoneStep();
  },

  getSetsCount(exercise) {
    return _.filter(exercise.steps, (step) => {
      if (step.type === 'set') return step;
    }).length;
  },


  getCurrentStep() {
    return this.getCurrentExercise().steps[this.state.currentStep];
  },

  setCurrentStep(index) {
    return this.state.currentStep = index;
  },

  getFirstNotDoneStep() {
    let index = _.findIndex(this.getCurrentExercise().steps, (step) => !step.value);
     console.log(index);
    return index;
  }

}