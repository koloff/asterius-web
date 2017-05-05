<template>
  <div>
    <div
      class="ui inverted secondary fluid three pointing menu centered"
      :class="{one: Object.keys(splitState.split).length === 1, two: Object.keys(splitState.split).length === 2, three: Object.keys(splitState.split).length === 3}"
    >
      <a class="item"
         v-for="(workout, type) in splitState.split"
         :class="{active: splitState.currentWorkout === type}"
         @click="viewWorkout(type)"
      > Workout &nbsp; &nbsp; <strong> {{type}}</strong></a>
    </div>


    <div class="ui grid stackable mobile reversed">

      <div class="column ten wide center aligned">

        <div class="row">


          <h4 class="ui header inverted centered">
            FIND EXERCISES
            <div class="sub header">
              Find exercises that target the selected muscles.
            </div>
          </h4>
          <h4 v-if="selectedMuscles.length" class="ui header inverted" style="margin: 0 0 5px 0">
            SELECTED MUSCLES:
            <div style="margin-top: 5px" class="ui labels">
              <div class="ui label" v-for="muscle in selectedMuscles"
                   :style="{border: `3px solid ${muscle.info.color}`}"
              >{{muscle.info.broName}}
                <i class="delete icon" @click="switchMuscle(muscle.key)"></i>
              </div>
            </div>
          </h4>
          <div class="ui message inverted" v-show="!exercisesToShow.length">

            <div v-if="selectedMuscles.length">
              <h4 class="ui header inverted left aligned" style="margin-top: 10px">
                Exercises that target the selected muscles at the same time are not available
              </h4>
              <ul class="list">
                <li>If you click on multiple muscles, the system will look for exercises that target them in the same
                  time.
                </li>
                <li>You have most likely clicked on a few muscles that usually don't work together.
                </li>
              </ul>
            </div>
            <div v-else>
              <h4 class="ui header inverted left aligned" style="margin-top: 10px">
                Select muscles
              </h4>
              <ul class="list">
                <li>Click on the muscles you want to target to find exercises for them.</li>
              </ul>
            </div>


          </div>

          <div v-show="exercisesToShow.length" class="exercises-slider-container scrollable better-scroll">
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

        <h4 class="ui header inverted centered">
          YOUR WORKOUT
          <div class="sub header">
            Add or remove sets. Reorder the exercises by dragging the hand.
          </div>
        </h4>
        <div class="row">
          <div class="ui grid stackable centered">
            <div class="ui column eleven wide">
              <workout-in-tweaker></workout-in-tweaker>
            </div>
          </div>
        </div>

      </div>

      <div class="ui column six wide">
        <h4 class="ui header inverted centered">
          SELECT MUSCLES
          <div class="sub header">
            Select muscles to find exercises. The bar shows how much will this workout train the muscle.
          </div>
        </h4>
        <div class="muscles-in-tweaker better-scroll">
          <template
            v-for="(muscles, group) in groupedMuscles">
            <h2 class="ui header dividing inverted">
              {{group}}
            </h2>

            <muscle-in-tweaker
              v-for="muscle in muscles"
              :muscle="muscle">
            </muscle-in-tweaker>
          </template>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import _ from 'lodash';

  import ExerciseInTweaker from '../exercises/ExerciseInTweaker.vue';
  import MuscleInTweaker from '../tweaker/MuscleInTweaker.vue';
  import WorkoutInTweaker from '../exercises/WorkoutInTweaker.vue';

  import musclesStore from '../../store/muscles';
  import exercisesStore from '../../store/exercises';

  import splitStore from '../../store/split';
  import tweakerStore from '../../store/tweaker';

  export default {
    name: 'Split',
    components: {ExerciseInTweaker, MuscleInTweaker, WorkoutInTweaker},
    data() {
      return {
        musclesState: musclesStore.state,
        exercisesState: exercisesStore.state,
        splitState: splitStore.state,
        tweakerState: tweakerStore.state
      }
    },
    async beforeRouteEnter(to, from, next) {
      let res = await splitStore.init();
      next();
    },
    mounted() {
      $('.scrollable').scrollable();
    },
    methods: {
      viewWorkout(type) {
        splitStore.setCurrentWorkout(type);
        console.log(type);
        // todo fix for 1 and 2 workouts
        if (type === 'C' || type === 'B') {
          let $legsEl = $(`.muscle-in-tweaker[data-key='legsQuadriceps']`);
          $('.muscles-in-tweaker').scrollTo($legsEl, 300);
        } else {
          let $legsEl = $(`.muscle-in-tweaker[data-key='shouldersAnteriorHead']`);
          $('.muscles-in-tweaker').scrollTo($legsEl, 300);
        }
      },
      getMuscles(mKey) {
        return musclesStore.getMuscle(mKey);
      },
      switchMuscle(mKey) {
        tweakerStore.switchMuscle(mKey);
      }
    },
    computed: {
      groupedMuscles() {
        if (this.musclesState.mc.muscles) {
          return _.groupBy(this.musclesState.mc.muscles, 'info.group');
        }
      },
      exercisesToShow() {
        let arr = [];
        let a = this.tweakerState.selectedMuscles;
        this.exercisesState.ec.exercises.forEach((exercise) => {
          if (tweakerStore.shouldExerciseShow(exercise)) {
            arr.push(exercise)
          }
        });
        return arr;
      },
      selectedMuscles() {
        return this.tweakerState.selectedMuscles.map((mKey) => musclesStore.getMuscle(mKey));
      }
    }
  }
</script>

<style scoped>
  .exercises-slider-container {
    background: rgba(50, 50, 50, 0.8);
    border: 2px solid #444;
    border-radius: 4px;
    margin-bottom: 15px;
  }

  .muscles-in-tweaker {
    background: rgba(50, 50, 50, 0.8);
    overflow: auto;
    border: 2px solid #444;
    border-radius: 4px;
    padding: 7px;
  }

  @media (max-height: 700px) {
    .muscles-in-tweaker {
      overflow: auto;
      max-height: 50vh;
    }
  }

  @media (min-height: 700px) {
    .muscles-in-tweaker {
      overflow: auto;
      max-height: 80vh;
    }

    .exercises-slider-container {
      margin-right: 15px;
    }
  }

</style>