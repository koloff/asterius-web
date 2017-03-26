import firebase from 'firebase';
import _ from 'lodash';


export default {
  state: {
    currentStepIndex: 0,
    timer: {
      seconds: 0,
      state: 'stopped' // stopped, running, paused
    }
  },

  init() {
  },


  // firebase related
  loadWorkout() {
    this.workoutRef = firebase.database().ref().child(`workouts/pesho/id1`);

    this.workoutRef.child('exercises').on('value', (ref) => {
      this.state.exercises = ref.val();
    });
    this.workoutRef.child('currentExerciseIndex').on('value', (ref) => {
      this.state.currentExerciseIndex = ref.val();
    });

    this.state.currentStepIndex = this.getFirstNotDoneStep();
  },

  getCurrentExercise() {
    return this.state.exercises[this.state.currentExerciseIndex];
  },

  setCurrentExercise(index) {
    this.workoutRef.child('/currentExerciseIndex').set(index);
    this.state.currentStepIndex = this.getFirstNotDoneStep();
  },

  getSetsCount(exercise) {
    return _.filter(exercise.steps, (step) => {
      if (step.type === 'set') return step;
    }).length;
  },

  getCurrentStep() {
    return this.getCurrentExercise().steps[this.state.currentStepIndex];
  },

  setCurrentStep(index) {
    return this.state.currentStepIndex = index;
  },

  getFirstNotDoneStep() {
    let index = _.findIndex(this.getCurrentExercise().steps, (step) => !step.performedValue);
    return (index >= 0) ? index : 999; // prevents -1 if all steps are done
  },

  nextStep() {
    // todo
  },

  startTimer() {
    this.state.timer.state = 'running';
    this.timerInterval = setInterval(() => {
      this.state.timer.seconds++;
    }, 1000)
  },

  stopTimer() {
    this.recordRest(this.state.timer.seconds);
    this.state.timer.state = 'stopped';
    clearInterval(this.timerInterval);
  },

  clearTimer() {
    if (this.state.timer.state === 'running') {
      this.stopTimer();
    }
    this.state.timer.seconds = 0;
  },

  recordSet(reps, weight) {
    let currentExerciseIndex = this.state.currentExerciseIndex;
    let currentStepIndex = this.state.currentStepIndex;

    this.workoutRef.child(`/exercises/${currentExerciseIndex}/steps/${currentStepIndex}/performedValue`).set({
      reps, weight
    })
  },

  recordRest(seconds) {
    let currentExerciseIndex = this.state.currentExerciseIndex;
    let currentStepIndex = this.state.currentStepIndex;

    this.workoutRef.child(`/exercises/${currentExerciseIndex}/steps/${currentStepIndex}/performedValue`).set({
      seconds
    })
  },

  getCurrentStepEstimatedValues() {
    let currentExerciseIndex = this.state.currentExerciseIndex;
    let currentStepIndex = this.state.currentStepIndex;
    console.log(currentExerciseIndex, currentStepIndex);

    return this.state.exercises[currentExerciseIndex].steps[currentStepIndex].estimatedValues;
  },

  getCurrentStepPerformedValue() {
    let currentExerciseIndex = this.state.currentExerciseIndex;
    let currentStepIndex = this.state.currentStepIndex;

    return this.state.exercises[currentExerciseIndex].steps[currentStepIndex].performedValue;
  }


}