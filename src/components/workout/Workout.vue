<template>
  <div>

    <exercises-slider></exercises-slider>
    <h3 class="ui header inverted">
      {{currentExerciseName | uppercase}}
      <div class="sub header">LAST SESSION: 26.03.17 <br>
        90S &nbsp;&nbsp; 7x10 &nbsp;&nbsp; 60S &nbsp;&nbsp; 10x7.5
      </div>
    </h3>


    <exercise-steps></exercise-steps>

    <sets-selector
      v-if="currentStep.type === 'set'"
    ></sets-selector>
    <timer
      v-if="currentStep.type === 'rest'"
    ></timer>


    <button
      class="ui button green"
      :class="{disabled: !currentStep.performedValue}"
      @click="nextStep()"
    >
      NEXT
    </button>
  </div>
</template>

<script>
  import exercisesStore from '../../store/exercises';
  import workoutStore from '../../store/workout';

  import ExercisesSlider from '../sliders/ExercisesSlider.vue';
  import ExerciseSteps from './ExerciseSteps.vue';
  import SetsSelector from '../grids/SetsSelector.vue';
  import Timer from './Timer.vue';

  export default {
    name: 'Workout',
    components: {SetsSelector, ExerciseSteps, ExercisesSlider, Timer},
    data() {
      return {
        workoutState: workoutStore.state
      }
    },
    beforeCreate() {
      workoutStore.loadWorkout();
    },
    computed: {
      currentExerciseName() {
        return exercisesStore.getExercise(workoutStore.getCurrentExercise().key).info.name
      },
      currentStep() {
        return workoutStore.getCurrentStep()
      },
      nextStep() {

      }
    }
  }
</script>

