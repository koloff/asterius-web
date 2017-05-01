<template>
  <exercise-circular
    :exercise-key="exerciseKey"
    :sets-count="0"
  >
    <button class="ui tiny inverted button exercise-add-button">Add</button>

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
    computed: {},
    methods: {
      increaseSets() {
        tweakerStore.increaseExerciseSets(this.exerciseKey);
      },
      reduceSets() {
        tweakerStore.reduceExerciseSets(this.exerciseKey);
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