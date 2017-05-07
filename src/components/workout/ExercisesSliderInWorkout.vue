<template>
  <div class="ui segment secondary exercises-slider">

    <!--in order to sync the computed-->
    <div v-show="false">{{currentExercise}}</div>

    <div class="exercises-slider-container">
      <div class="exercises-slider-content">

        <div class="exercises-slider-element"
             v-for="(exercise, index) in workoutState.exercises"
             :class="`exercise-in-workout-${index}`"
        >
          <exercise-in-workout
            :exercise="exercise"
            :exercise-index="index"
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
    name: 'ExercisesSliderInWorkout',
    components: {ExerciseInWorkout},
    data() {
      return {
        workoutState: workoutStore.state
      }
    },
    mounted() {
    },
    computed: {
      currentExercise() {
        let $container = $('.exercises-slider-container');
        let $el = $(`.exercise-in-workout-${this.workoutState.currentExerciseIndex}`);

        $container.scrollTo($el, 300, {
          offset: function() {
            return {
              top: -($container.height() - $el.height()) / 2,
              left: -($container.width() - $el.width()) / 2
            };
          }
        });


        return workoutStore.getCurrentExercise();
      }
    },
    methods: {
      getSetsCount(exercise) {
        return workoutStore.getSetsCount(exercise);
      },
      setAsCurrentCb(exerciseIndex) {
        workoutStore.setCurrentExercise(exerciseIndex);
      }
    }
  }
</script>
