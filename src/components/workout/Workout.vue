<template>
  <div>

    <exercises-slider></exercises-slider>
    <exercise-steps></exercise-steps>

    <sets-selector
      v-if="currentStep.type === 'set'"
    ></sets-selector>
    <timer
      v-if="currentStep.type === 'rest'"
    ></timer>


  </div>
</template>

<script>
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
      currentStep() {
        return workoutStore.getCurrentStep()
      }
    }
  }
</script>

