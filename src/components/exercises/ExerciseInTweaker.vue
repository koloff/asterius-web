<template>
  <exercise-circular
    :exercise-key="exerciseKey"
    :sets-count="setsCount"
  >
    <div class="ui mini basic icon buttons exercise-sets-buttons">
      <button
        class="ui button"
        @click="increaseSets()"
      >
        <i class="plus icon"></i>
      </button>
      <button
        class="ui button"
        @click="reduceSets()">
        <i class="minus icon"></i>
      </button>
    </div>


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
      setsCount() {
        return tweakerStore.getExercise(this.exerciseKey).sets;
      }
    },
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
  .exercise-sets-buttons {
    position: absolute;
    z-index: 999;
    bottom: 17%;
  }

  .exercise-sets-buttons .button {
    text-align: center !important;
    padding: 6px 6px 6px 6px !important;
  }
</style>