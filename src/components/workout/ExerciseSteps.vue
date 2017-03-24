<template>
  <div class="set-steps">
    <div class="ui fluid steps tiny">

      <div
        class="link step active"
        v-for="step in currentExercise.steps">
        <div class="content">
          <div class="title">SET</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import workoutStore from '../../store/workout';

  export default {
    name: 'ExerciseSteps',
    data() {
      return {
        workoutState: workoutStore.state
      }
    },
    computed: {
      currentExercise() {
        return workoutStore.getCurrentExercise();
      }
    }
  }
</script>

<style>

  .set-steps {
    overflow: auto;
  }

  .set-steps .step::before {
    margin-right: 4px !important;
  }

  .set-steps .step {
    padding: 14px 3px !important;
  }

</style>