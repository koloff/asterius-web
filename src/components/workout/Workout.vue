<template>
  <div>

    <h1 class="ui header">WORKOUT {{type}}</h1>

    <exercises-slider-in-workout></exercises-slider-in-workout>
    <h3 class="ui header">
      {{currentExerciseName | uppercase}}
      <div class="sub header">LAST SESSION: 26.03.17 <br>
        7x70 &nbsp;&nbsp; 150S &nbsp;&nbsp; 9x65 &nbsp;&nbsp; 120S &nbsp;&nbsp; 12x60 &nbsp;&nbsp; 90S
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
      v-if="!isCurrentStepFinal"
      class="ui button big green fluid icon"
      :class="{disabled: !currentStep.performedValue}"
      @click="nextStep()"
    >
      <i class="ui icon angle double right"></i>
      NEXT
    </button>

    <button
      v-if="isCurrentStepFinal"
      class="ui button big green fluid icon"
      :class="{disabled: !currentStep.performedValue}"
      @click="finishWorkout()"
    >
      <i class="ui icon flag checkered"></i>
      FINISH
    </button>

  </div>
</template>

<script>
  import exercisesStore from '../../store/exercises';
  import workoutStore from '../../store/workout';

  import ExercisesSliderInWorkout from './ExercisesSliderInWorkout.vue';
  import ExerciseSteps from './ExerciseSteps.vue';
  import SetsSelector from './SetsSelector.vue';
  import Timer from './Timer.vue';

  export default {
    name: 'Workout',
    components: {SetsSelector, ExerciseSteps, ExercisesSliderInWorkout, Timer},
    data() {
      return {
        workoutState: workoutStore.state,
        type: this.$route.params.type
      }
    },
    beforeCreate() {
      workoutStore.loadWorkout(this.$route.params.type);
    },
    computed: {
      currentExerciseName() {
        return exercisesStore.getExercise(workoutStore.getCurrentExercise().key).info.name
      },
      currentStep() {
        return workoutStore.getCurrentStep()
      },
      isCurrentStepFinal() {
        return workoutStore.isCurrentStepFinal();
      }
    },
    methods: {
      nextStep() {
        workoutStore.nextStep();
      },

      finishWorkout() {

      }
    }
  }
</script>

