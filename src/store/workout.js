import _ from 'lodash';
import firebase from 'firebase';

import splitStore from './split';
import authStore from './auth';


export default {
  state: {
    currentStepIndex: 0,
    timer: {
      seconds: 0,
      state: 'stopped' // stopped, running, paused
    },
    //firebase
    currentExerciseIndex: 0,
    exercises: {}
  },

  setDefaultState() {
    this.state = {
      currentStepIndex: 0,
      timer: {
        seconds: 0,
        state: 'stopped' // stopped, running, paused
      },
      //firebase
      currentExerciseIndex: 0,
      exercises: []
    }
  },


  // firebase related
  loadWorkout(type) {
    // todo
    console.log(type);
    this.workoutRef = firebase.database().ref().child(`workouts/${authStore.state.uid}/${type}`);

    let exercises = [];
    console.log(splitStore.state.split);
    splitStore.state.split[type].forEach((exercise) => {

      exercises.push({
        type: 'exercise',
        key: exercise.key,
        steps: [{
          type: 'set',
          estimatedValues: [
            {
              type: 'target',
              cells: [
                {
                  reps: 8,
                  weight: 70
                }
              ]
            },
            {
              type: 'good',
              cells: [
                {
                  reps: 7,
                  weight: 72.5
                },
                {
                  reps: 7,
                  weight: 70
                }, {
                  reps: 10,
                  weight: 67.5
                },
              ]
            },

          ],
        }, {
          type: 'rest',
        }, {
          type: 'set',
          estimatedValues: [
            {
              type: 'target',
              cells: [
                {
                  reps: 8,
                  weight: 70
                }
              ]
            },
            {
              type: 'good',
              cells: [
                {
                  reps: 7,
                  weight: 72.5
                },
                {
                  reps: 7,
                  weight: 70
                }, {
                  reps: 10,
                  weight: 67.5
                },
              ]
            },

          ],
        }, {
          type: 'rest',
        }, {
          type: 'set',
          estimatedValues: [
            {
              type: 'target',
              cells: [
                {
                  reps: 8,
                  weight: 70
                }
              ]
            },
            {
              type: 'good',
              cells: [
                {
                  reps: 7,
                  weight: 72.5
                },
                {
                  reps: 7,
                  weight: 70
                }, {
                  reps: 10,
                  weight: 67.5
                },
              ]
            },

          ],
        }, {
          type: 'rest',
        }]
      });
    });
    this.workoutRef.child('/exercises').set(exercises);

    this.workoutRef.child('/exercises').on('value', (ref) => {
      this.state.exercises = ref.val();
    });
    this.workoutRef.child('/currentExerciseIndex').once('value', (ref) => {
      this.setCurrentExercise(0);
    });
  },

  getCurrentExercise() {
    return this.state.exercises[this.state.currentExerciseIndex];
  },

  getFirstNotPerformedStepIndex() {
    let index = _.findIndex(this.getCurrentExercise().steps, (step) => !step.performedValue);
    return index;
  },

  setCurrentExercise(index) {
    this.state.currentExerciseIndex = index;
    this.workoutRef.child('/currentExerciseIndex').set(index);

    let firstNotPerformedStepIndex = this.getFirstNotPerformedStepIndex();
    if (firstNotPerformedStepIndex > -1) {
      this.setCurrentStep(firstNotPerformedStepIndex)
    } else {
      this.setCurrentStep(this.getCurrentExercise().steps.length - 1);
    }
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

  isCurrentStepFinal() {
    return this.state.currentExerciseIndex >= this.state.exercises.length - 1
      && this.state.currentStepIndex >= this.getCurrentExercise().steps.length - 1;

  },

  nextStep() {
    let currentExercise = this.getCurrentExercise();
    if (this.state.currentStepIndex < currentExercise.steps.length - 1) {
      this.state.currentStepIndex++;
      let currentStep = this.getCurrentStep();
      if (currentStep.type === 'rest') {
        this.startTimer();
      }
    } else {
      this.setCurrentExercise(this.state.currentExerciseIndex + 1);
    }
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
    this.state.timer.seconds = 0;
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
    return this.state.exercises[currentExerciseIndex].steps[currentStepIndex].estimatedValues;
  },

  getCurrentStepPerformedValue() {
    let currentExerciseIndex = this.state.currentExerciseIndex;
    let currentStepIndex = this.state.currentStepIndex;
    return this.state.exercises[currentExerciseIndex].steps[currentStepIndex].performedValue;
  }


}