<template>
  <div v-sortable="{animation: 150, onEnd: reorder, handle: '.handle'}">

    <div class="workout-exercise"
         v-for="(exerciseShort, index) in tweakerState.workout"
         :key="exerciseShort.key">

      <i class="hand rock icon big inverted handle"></i>
      <h5 class="ui header inverted">
        {{index + 1}}. &nbsp; {{getExercise(exerciseShort.key).info.name | uppercase}}
      </h5>

      <div class="ui statistic inverted mini sets-count">
        <div class="value">
          {{exerciseShort.sets}}
        </div>
        <div class="label">
          SET{{`${exerciseShort.sets > 1 ? 'S' : ''}`}} <br>
          <div class="ui mini basic icon buttons inverted">
            <button
              class="ui button"
              @click="reduceSets(exerciseShort.key)">
              <i class="minus icon"></i>
            </button>
            <button
              class="ui button"
              @click="increaseSets(exerciseShort.key)"
            >
              <i class="plus icon"></i>
            </button>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
  import _ from 'lodash';
  import Sortable from 'sortablejs';

  import exercisesStore from '../../store/exercises';
  import tweakerStore from '../../store/tweaker';

  export default {
    name: 'WorkoutInTweaker',
    data() {
      return {
        tweakerState: tweakerStore.state
      }
    },
    methods: {
      getExercise(exKey) {
        return exercisesStore.getExercise(exKey);
      },
      reorder ({oldIndex, newIndex}) {
        console.log(oldIndex, newIndex);
        const movedItem = this.tweakerState.workout.splice(oldIndex, 1)[0];
        this.tweakerState.workout.splice(newIndex, 0, movedItem)
      },
      increaseSets(exKey) {
        tweakerStore.increaseExerciseSets(exKey);
      },
      reduceSets(exKey) {
        tweakerStore.reduceExerciseSets(exKey);
      }
    }
  }
</script>

<style>
  .workout-exercise {
    position: relative;
    background: rgba(50, 50, 50, 0.8) !important;
    border: 2px solid #444 !important;
    border-radius: 4px !important;
    padding-left: 30px;
    padding-right: 70px;
    padding-top: 10px;
    margin-bottom: 15px !important;
  }

  .workout-exercise .header {
    margin: 10px 10px 35px 20px !important;
  }

  .handle {
    position: absolute;
    top: 15px;
    left: 10px;
  }

  .handle:hover {
    cursor: move !important;
  }

  .sets-count {
    position: absolute;
    right: 30px;
    top: -12px;
  }

  .sets-count .button {
    padding: 6px !important;
  }


</style>