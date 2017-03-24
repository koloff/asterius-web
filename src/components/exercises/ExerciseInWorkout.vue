<template>
  <exercise-circular
    :exercise-key="exerciseKey"
    :sets-count="setsCount"
    :is-current="isCurrent"
  >
    <button
      v-if="!isCurrent"
      class="mini ui button basic exercise-go-button"
      @click="setAsCurrent(exercise)"
    >
      SELECT
    </button>
  </exercise-circular>
</template>

<script>
  import ExerciseCircular from './ExerciseCircular.vue';

  export default {
    name: 'ExerciseInWorkout',
    props: ['exercise', 'exerciseKey', 'setsCount', 'setAsCurrentCb'],
    components: {ExerciseCircular},
    methods: {
      setAsCurrent(exercise) {
        this.setAsCurrentCb(exercise, this.$el);
      }
    },
    computed: {
      isCurrent() {
        return this.exercise.current;
      }
    }
  }
</script>