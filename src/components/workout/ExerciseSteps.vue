<template>
  <div class="set-steps">
    <div class="ui fluid steps tiny unstackable padless">
      <div
        class="link step"
        v-for="(set, index) in sets"
        :class="getClassNames(index)"
        @click="setCurrentSet(index)"
      >
        <div class="content">
          <div class="title">{{getSetText(set, index)}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import currentWorkoutStore from '../../store/current-workout';
  import workoutStore from '../../store/workout';

  export default {
    name: 'ExerciseSteps',
    props: ['exerciseIndex'],
    data() {
      return {
        currentWorkoutState: currentWorkoutStore.state,
        workoutState: workoutStore.state
      }
    },
    methods: {
      getClassNames(index) {
        let firstNotPerformedSetIndex = currentWorkoutStore.getFirstNotPerformedSetIndex(this.exerciseIndex);
        return {
          active: (index === this.currentWorkoutState.currentSetIndex && this.exerciseIndex === this.currentWorkoutState.currentExerciseIndex),
          disabled: (index > firstNotPerformedSetIndex && firstNotPerformedSetIndex >= 0)
        }
      },
      setCurrentSet(index) {
        currentWorkoutStore.setCurrentExerciseIndex(this.exerciseIndex);
        currentWorkoutStore.setCurrentSetIndex(index);
      },
      getSetText(set, index) {
        if (set.performedValue && set.performedValue.reps) {
          return `${set.performedValue.reps}x${set.performedValue.weight}`
        } else {
          return 'SET'
        }
      }
    },
    computed: {
      sets() {
        return workoutStore.state.exercises[this.exerciseIndex].sets;
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

</style>