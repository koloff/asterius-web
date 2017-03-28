<template>
  <div class="ui segment secondary exercises-slider"
       style="height: 270px;display: flex; align-items:center; justify-content: center;">
    <div class="ui message info"
         v-if="!appropriateExerciseExists"
    >
      <div class="header">
        No such exercises
      </div>
      <p>There aren't any exercises that train selected muscles in the same time.</p>
    </div>

    <div class="exercises-slider-container">
      <div class="exercises-slider-content">
        <div class="exercises-slider-element"
             v-for="exercise in exercisesToShow"
             :key="exercise.key"
             :class="`exercise-in-tweaker-${index}`"
        >
          <exercise-in-tweaker
            :exercise-key="exercise.key"
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
    name: 'ExercisesSliderInTweaker',
    components: {ExerciseInTweaker},
    data() {
      return {
        tweakerState: tweakerStore.state
      }
    },
    mounted() {
    },
    computed: {
      exercisesToShow() {
        let arr = [];
        this.tweakerState.exercises.forEach((exercise) => {
          if (tweakerStore.shouldExerciseShow(exercise.key)) {
            arr.push(exercise)
          }
        });
        return arr;
      },
      appropriateExerciseExists() {
        return tweakerStore.appropriateExercisesCount() > 0;
      }
    },
    methods: {}
  }
</script>
