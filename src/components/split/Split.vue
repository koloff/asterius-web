<template>
  <div>
    <div
      class="ui inverted secondary fluid three pointing menu centered"
      :class="{one: Object.keys(splitState.split).length === 1, two: Object.keys(splitState.split).length === 2, three: Object.keys(splitState.split).length === 3}"
      style="border-bottom: 2px solid #444"
    >
      <a class="item"
         v-for="(workout, type) in splitState.split"
         :class="{active: splitState.currentWorkout === type}"
         @click="viewWorkout(type)"
      > Workout &nbsp; &nbsp; <strong> {{type}}</strong></a>
    </div>


    <div class="ui grid stackable mobile reversed" style="padding: 12px">

      <div class="column ten wide center aligned" style="padding: 0 0 0 0 !important;">

        <div class="row">
          <div class="ui message info"
               v-show="!exercisesToShow.length"
          >
            <div class="header">
              No such exercises
            </div>
            <p>There aren't any exercises that train selected muscles in the same time.</p>
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

        <div class="row">
          <div class="ui grid centered stackable">
            <div class="ui column twelve wide">

              <div v-sortable="{animation: 150, onEnd: reorder, handle: '.handle'}">
                <div class="workout-exercise"
                     v-for="(exerciseShort, index) in tweakerState.workout"
                     :key="exerciseShort.key"
                     style="padding: 7px;">


                  <div class="ui grid">
                    <div class="column ten wide middle aligned" style="padding-left: 55px;">

                      <i class="hand rock icon big inverted handle" style="position: absolute; left: 15px;"></i>
                      <h5 class="ui header inverted" style="display: inline-block; margin-top: 7px;">
                        {{index + 1}}. &nbsp; {{getExercise(exerciseShort.key).info.name | uppercase}}
                      </h5>
                    </div>

                    <div class="column six wide middle aligned">
                      <div class="ui statistic inverted mini right floated" style="margin-top: 10px">
                        <div class="value">
                          {{exerciseShort.sets}}
                        </div>
                        <div class="label">
                          SET{{`${exerciseShort.sets > 1 ? 'S' : ''}`}}
                        </div>
                      </div>

                      <div class="ui mini basic icon buttons right floated inverted" style="margin-top: 10px">
                        <button
                          class="ui button"
                          @click="increaseSets()"
                        >
                          <i class="plus icon"></i>
                        </button>
                        <button
                          class="ui button"
                          @click="reduceSets()">
                          <i class="minus icon"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>


            </div>
          </div>
        </div>
      </div>


      <div class="ui column six wide" style="padding: 0 0 0 0 !important;">
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
  import Sortable from 'sortablejs';

  import ExerciseInTweaker from '../exercises/ExerciseInTweaker.vue';
  import MuscleInTweaker from '../tweaker/MuscleInTweaker.vue';

  import musclesStore from '../../store/muscles';
  import exercisesStore from '../../store/exercises';

  import splitStore from '../../store/split';
  import tweakerStore from '../../store/tweaker';

  export default {
    name: 'Split',
    components: {ExerciseInTweaker, MuscleInTweaker},
    data() {
      return {
        musclesState: musclesStore.state,
        exercisesState: exercisesStore.state,
        splitState: splitStore.state,
        tweakerState: tweakerStore.state,
      }
    },
    async beforeRouteEnter(to, from, next) {
      let res = await splitStore.init();
      console.log(res);
      next();
    },
    mounted() {
      $('.scrollable').scrollable();
    },
    methods: {
      viewWorkout(type) {
        splitStore.setCurrentWorkout(type);
      },
      reorder ({oldIndex, newIndex}) {
        console.log(oldIndex, newIndex);
        const movedItem = this.tweakerState.workout.splice(oldIndex, 1)[0];
        this.tweakerState.workout.splice(newIndex, 0, movedItem)
      },
      getExercise(exKey) {
        return exercisesStore.getExercise(exKey);
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
        console.log('sadasd');
        this.exercisesState.ec.exercises.forEach((exercise) => {
          if (tweakerStore.shouldExerciseShow(exercise)) {
            arr.push(exercise)
          }
        });
        console.log(arr);
        return arr;
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

  .workout-exercise {
    background: rgba(50, 50, 50, 0.8) !important;
    border: 2px solid #444 !important;
    border-radius: 4px !important;
    margin-bottom: 15px !important;
  }

  .handle:hover {
    cursor: move !important;
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