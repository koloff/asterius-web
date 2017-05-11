<template>
  <div class="ui grid stackable mobile reversed">
    <div class="column ten wide center aligned">

      <div class="row">


        <h4 v-if="selectedMuscles.length" class="ui header inverted" style="margin: 0 0 5px 0">
          SELECTED MUSCLES:
          <div style="margin-top: 5px" class="ui labels">
            <div class="ui label" v-for="muscle in selectedMuscles"
                 :style="{border: `3px solid ${muscle.info.color}`}"
            >{{muscle.info.broName}}
              <i class="delete icon" @click="switchMuscle(muscle.key)"></i>
            </div>
          </div>

          <div class="sub header">
            Exercises that train the selected muscles:
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
        THE WORKOUT
        <div class="sub header">
          This is how your wokrout will look like. <br> Reorder the exercises by dragging the hand. You can add or
          remove sets.
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
</template>

<script>
  import _ from 'lodash';

  import ExerciseInTweaker from '../exercises/ExerciseInTweaker.vue';
  import MuscleInTweaker from '../tweaker/MuscleInTweaker.vue';
  import WorkoutInTweaker from '../exercises/WorkoutInTweaker.vue';

  import musclesStore from '../../store/muscles';
  import exercisesStore from '../../store/exercises';
  import tweakerStore from '../../store/tweaker';

  export default {
    name: 'Split',
    components: {ExerciseInTweaker, MuscleInTweaker, WorkoutInTweaker},
    data() {
      return {
        musclesState: musclesStore.state,
        exercisesState: exercisesStore.state,
        tweakerState: tweakerStore.state
      }
    },
    mounted() {
      $('.scrollable').scrollable();
    },
    methods: {
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
        let selectedMuscles = this.tweakerState.selectedMuscles;
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
      max-height: 57vh;
    }

    .exercises-slider-container {
      margin-right: 15px;
    }
  }

</style>