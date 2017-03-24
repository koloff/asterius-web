<template>
  <div>

    <exercises-slider></exercises-slider>
    <exercise-steps></exercise-steps>
    <sets-selector></sets-selector>


  </div>
</template>

<script>

  import ExercisesSlider from '../sliders/ExercisesSlider.vue';
  import ExerciseSteps from './ExerciseSteps.vue';
  import SetsSelector from '../grids/SetsSelector.vue';

  export default {
    name: 'Workout',
    components: {SetsSelector, ExerciseSteps, ExercisesSlider}
  }
</script>

