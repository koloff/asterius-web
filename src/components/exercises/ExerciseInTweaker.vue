<template>
  <exercise-circular
    :exercise-key="exerciseKey"
    :sets-count="workoutExercise ? workoutExercise.sets : 0"
  >
    <button class="ui tiny inverted button exercise-add-button"
            @click="addExercise()"
            :class="{disabled: workoutExercise}"
    >
      {{workoutExercise ? 'Added' : 'Add'}}
    </button>

  </exercise-circular>
</template>

<script>
  import ExerciseCircular from './ExerciseCircular.vue';
  import tweakerStore from '../../store/tweaker';

  export default {
    name: 'ExerciseInTweaker',
    props: ['exerciseKey'],
    data() {
      return {
        tweakerState: tweakerStore.state
      }
    },
    components: {ExerciseCircular},
    computed: {
      workoutExercise() {
        console.log(this.tweakerState);
        return tweakerStore.getWorkoutExercise(this.exerciseKey);
      }
    },
    methods: {
      addExercise() {
        tweakerStore.addExercise(this.exerciseKey);
      }
    }
  }
</script>

<style>
  .exercise-add-button {
    padding: 5px !important;
    margin-bottom: 5px !important;
    position: absolute;
    z-index: 999;
    bottom: 17%;
  }

</style>