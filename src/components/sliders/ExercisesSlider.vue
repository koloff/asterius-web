<template>
  <div class="ui segment secondary exercises-slider">
    <div class="exercises-slider-container">
      <div class="exercises-slider-content">

        <div class="exercises-slider-element"
             v-for="exercise in workoutState.exercises"
        >
          <exercise-in-workout
            :exercise="exercise"
            :exercise-key="exercise.key"
            :sets-count="getSetsCount(exercise)"
            :set-as-current-cb="setAsCurrentCb"
          ></exercise-in-workout>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import ExerciseInWorkout from '../exercises/ExerciseInWorkout.vue';
  import workoutStore from '../../store/workout';

  export default {
    name: 'ExercisesSlider',
    components: {ExerciseInWorkout},
    data() {
      return {
        workoutState: workoutStore.state
      }
    },
    mounted() {
    },
    methods: {
      getSetsCount(exercise) {
        return workoutStore.getSetsCount(exercise);
      },
      setAsCurrentCb(exercise, el) {
        workoutStore.setAsCurrent(exercise);

        let $container = $('.exercises-slider-container');
        let $el = $(el);

        $container.scrollTo($el, 300, {
          offset: function() {
            return {
              top: -($container.height() - $el.height()) / 2,
              left: -($container.width() - $el.width()) / 2
            };
          }
        });

      }
    }
  }
</script>

<style>
  .exercises-slider-container {
    overflow: auto;
    padding: 10px;
    white-space: nowrap;
  }

  .exercises-slider-container .exercises-slider-element {
    display: inline-block;
    margin-right: 10px !important;
  }
</style>