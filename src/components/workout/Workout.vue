<template>
  <div>


    <h1 class="ui inverted header">WORKOUT</h1>

    <div class="workout-container">
      <template
        v-for="(exercise, index) in workoutState.exercises"
      >
        <div class="ui segment"
             :class="`exercise-index-${index}`">

          <h3 class="ui header">
            {{index + 1}}. {{getFullExercise(exercise.key).info.name | uppercase}}
            <div class="sub header">LAST SESSION: 26.03.17 <br>
              7x70 9x65 12x60
            </div>
          </h3>

          <exercise-steps
            :exercise-index="index">
          </exercise-steps>

          <sets-selector
            v-if="index === currentWorkoutState.currentExerciseIndex"
          ></sets-selector>

        </div>
      </template>
    </div>


    {{focusExercise}}

  </div>
</template>

<script>
  import moment from 'moment';

  import SetsSelector from './SetsSelector.vue';
  import ExerciseSteps from './ExerciseSteps.vue';

  import exercisesStore from '../../store/exercises';

  import currentWorkoutStore from '../../store/current-workout';
  import workoutStore from '../../store/workout';

  export default {
    name: 'Workout',
    components: {SetsSelector, ExerciseSteps},
    data() {
      return {
        currentWorkoutState: currentWorkoutStore.state,
        workoutState: workoutStore.state
      }
    },
    async beforeRouteEnter(to, from, next) {
      let yyyymmdd = moment().format('YYYY-MM-DD'); //  '2017-05-07'
      await currentWorkoutStore.init(yyyymmdd);
      next();
    },
    methods: {
      recordCurrentSet() {
        currentWorkoutStore.recordCurrentSet();
      },
      getFullExercise(key) {
        return exercisesStore.getExercise(key);
      },
    },
    computed: {
      focusExercise() {
        console.log(this.currentWorkoutState.currentExerciseIndex);
        this.$nextTick(() => {
          console.log('focusingg');

          let $container = $('body');
          let $el = $(`.exercise-index-${this.currentWorkoutState.currentExerciseIndex}`);


          console.log($el);
          console.log($container);
          $container.scrollTo($el, 300, {
            offset: function() {
              return {
                top: -50
              };
            }
          });
        })
      }
    }
  }
</script>