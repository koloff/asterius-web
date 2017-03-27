<template>
  <div class="ui segment secondary exercises-slider">

    <div class="exercises-slider-container">
      <div class="exercises-slider-content">

        <div class="exercises-slider-element"
             v-for="(exercise, index) in tweakerState.exercises"
             v-show="shouldExerciseShow(exercise.key)"
             :class="`exercise-in-tweaker-${index}`"
        >
          <exercise-in-tweaker
            :exercise-key="exercise.key"
            :sets-count="exercise.sets"
          ></exercise-in-tweaker>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import ExerciseInTweaker from '../exercises/ExerciseInTweaker.vue';
  import tweakerStore from '../../store/tweaker';

  export default {
    name: 'ExercisesSliderInWorkout',
    components: {ExerciseInTweaker},
    data() {
      return {
        tweakerState: tweakerStore.state
      }
    },
    mounted() {
    },
    computed: {},
    methods: {
      shouldExerciseShow(exKey) {
        return tweakerStore.shouldExerciseShow(exKey);
      }
    }
  }
</script>
