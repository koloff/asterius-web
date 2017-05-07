<template>
  <exercise-circular
    :exercise-key="exerciseKey"
    :sets-count="workoutExercise ? workoutExercise.sets : 0"
  >

    <div class="ui mini basic icon buttons inverted edit-sets-buttons">
      <button
        class="ui button"
        @click="reduceSets()">
        <i class="minus icon"></i>
      </button>
      <button
        class="ui button"
        @click="increaseSets()"
      >
        <i class="plus icon"></i>
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
      workoutExercise() {
        return tweakerStore.getWorkoutExercise(this.exerciseKey);
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

<style scoped>
  .edit-sets-buttons {
    margin-bottom: 5px !important;
    position: absolute;
    z-index: 999;
    bottom: 17%;
  }

  .edit-sets-buttons button {
    padding: 7px !important;
  }

</style>