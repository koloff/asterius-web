<template>
  <exercise-circular
    :exercise-key="exerciseKey"
    :sets-count="setsCount"
    :is-current="isCurrent"
  >
    <button
      v-if="!isCurrent"
      class="mini ui button basic exercise-select-button"
      @click="setAsCurrent()"
    >
      SELECT
    </button>
  </exercise-circular>
</template>

<script>
  import ExerciseCircular from './ExerciseCircular.vue';
  import workoutStore from '../../store/workout_old';

  export default {
    name: 'ExerciseInTweaker',
    props: ['exercise', 'exerciseIndex', 'exerciseKey', 'setsCount', 'setAsCurrentCb'],
    components: {ExerciseCircular},
    methods: {
      setAsCurrent() {
        this.setAsCurrentCb(this.exerciseIndex, this.$el);
      }
    },
    computed: {
      isCurrent() {
        return this.exerciseIndex === workoutStore.state.currentExerciseIndex;
      }
    }
  }
</script>

<style>
  .exercise-select-button {
    position: absolute;
    z-index: 999;
    bottom: 18%;
  }
</style>