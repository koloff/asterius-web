<template>
  <div class="set-steps">
    <div class="ui fluid steps tiny">

      <div
        class="link step"
        v-for="(step, index) in currentExercise.steps"
        :class="getClassNames(step, index)"
        @click="setCurrentStep(index)"
      >
        <div class="content">
          <div class="title">{{index}}</div>
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
    methods: {
      getClassNames(step, index) {
        return {
          active: (index === this.workoutState.currentStep),
          disabled: (index > workoutStore.getFirstNotDoneStep())
        }
      },

      setCurrentStep(index) {
        workoutStore.setCurrentStep(index);
      }
    },
    computed: {
      currentExercise() {
        return workoutStore.getCurrentExercise();
      },
      currentStep() {

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