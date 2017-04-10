<template>
  <div class="set-steps">
    <div class="ui fluid steps tiny unstackable padless">

      <div
        class="link step"
        v-for="(step, index) in currentExercise.steps"
        :class="getClassNames(step, index)"
        @click="setCurrentStep(index)"
      >
        <div class="content">
          <div class="title">{{getStepText(step, index)}}</div>
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
        let firstNotPerformedStepIndex = workoutStore.getFirstNotPerformedStepIndex();
        return {
          active: (index === this.workoutState.currentStepIndex),
          disabled: (index > firstNotPerformedStepIndex && firstNotPerformedStepIndex >= 0)
        }
      },
      setCurrentStep(index) {
        workoutStore.setCurrentStep(index);
      },
      getStepText(step, index) {
        if (step.performedValue) {
          if (step.performedValue.reps) {
            return `${step.performedValue.reps}x${step.performedValue.weight}`
          } else if (step.performedValue.seconds || step.performedValue.seconds === 0) {
            return `${step.performedValue.seconds}S`
          }
        } else {
          if (step.type === 'set') {
            return 'SET'
          } else if (step.type === 'rest') {
            return 'REST';
          }
        }
      }
    },
    computed: {
      currentExercise() {
        return workoutStore.getCurrentExercise();
      },

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


  .ui.unstackable.steps {
    flex-direction: row;
  }

  .ui.unstackable.steps .step {
    width: auto !important;
  }

  @media only screen and (max-width: (@largestMobileScreen)) {
    .ui.unstackable.padless.steps .step {
      padding: @verticalPadding 0 !important;
    }
  }
</style>