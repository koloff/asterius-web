<template>
  <div>


    <h1 class="ui inverted header">WORKOUT</h1>

    <h3 class="ui header inverted">
      BENCH PRESS
      <div class="sub header">LAST SESSION: 26.03.17 <br>
        7x70 9x65 12x60
      </div>
    </h3>

    <exercise-steps
      :exercise-index="0">
    </exercise-steps>

    <sets-selector
    ></sets-selector>

  </div>
</template>

<script>
  import SetsSelector from './SetsSelector.vue';
  import ExerciseSteps from './ExerciseSteps.vue';

  import currentWorkoutStore from '../../store/current-workout';
  import workoutStore from '../../store/workout';

  export default {
    name: 'Workout',
    components: {SetsSelector, ExerciseSteps},
    data() {
      return {
        currentWorkoutState: currentWorkoutStore.state,
        workoutState: workoutStore.state
      }
    },
    async beforeRouteEnter(to, from, next) {
      await currentWorkoutStore.init();
      next();
    }
  }
</script>