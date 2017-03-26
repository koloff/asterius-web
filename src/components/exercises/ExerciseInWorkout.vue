<template>
  <exercise-circular
    :exercise-key="exerciseKey"
    :sets-count="setsCount"
    :is-current="isCurrent"
  >
    <button
      v-if="!isCurrent"
      class="mini ui button basic exercise-go-button"
      @click="setAsCurrent()"
    >
      SELECT
    </button>
  </exercise-circular>
</template>

<script>
  import ExerciseCircular from './ExerciseCircular.vue';
  import workoutStore from '../../store/workout';

  export default {
    name: 'ExerciseInWorkout',
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