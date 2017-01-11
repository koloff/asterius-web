<template>
  <div>

    <div class="ui grid two columns stackable">
      <div class="column">

        <h2 class="ui header">
          Find exercises
          <div class="sub header">Manage your account settings and set e-mail preferences.</div>
        </h2>

        <div class="ui segment">
          <div v-for="(checkbox, key) in imageCheckboxes.upperBodyFront" class="ui checkbox">
            <input v-model="checkbox.checked" type="checkbox" name="example"/>
            <label>{{checkbox.name}}</label>
          </div>

          <div>
            <div class="ui cards three doubling">
              <template v-for="muscleGroup in mc">
                <muscle-mini-info
                  v-for="muscle in muscleGroup.parts"
                  v-if="isCheckedFromPictureByName(muscle.name)"
                  :name="muscle.name"
                  :bro-name="muscle.broName"
                />
              </template>
            </div>
          </div>
        </div>


        <div class="ui two cards stackable">
          <exercise
            v-for="exercise in ec"
            v-if="doesExerciseTrainCheckedMuscle(exercise)"
            :name="exercise.name"
            :type="exercise.type"
            :musclesUsed="exercise.musclesUsed"
          ></exercise>
        </div>
      </div>

      <div class="column">
        <h2 class="ui header">
          Account Settings
          <div class="sub header">Manage your account settings and set e-mail preferences.</div>
        </h2>

        <div class="ui segment">
          <div class="ui horizontal list">
            <selected-exercise-mini
              v-for="exercise in tweakerState.exercises"
              :exercise="exercise"
            ></selected-exercise-mini>
          </div>
        </div>

        <template
          v-for="group in mc">
          <div class="ui segment">
            <h2 class="ui header dividing">
              {{group.name}}
            </h2>
            <div class="ui equal width grid">
              <div class="ui stackable row">
                <selected-volume-bar
                  v-for="muscle in group.parts"
                  :muscle="muscle"
                ></selected-volume-bar>
              </div>
            </div>
          </div>
        </template>


      </div>
    </div>


  </div>
</template>

<script>

  import _ from 'lodash';
  import {mc} from '../algorithm/muscle/muscles-collection';
  import {ec} from '../algorithm/exercise/exercises-collection';
  import tweakerStore from '../store/tweaker';
  import musclesCoordinates from './muscles-coordinates';

  import Exercise from './exercise/Exercise.vue';
  import MuscleMiniInfo from './muscle/MuslceMiniInfo.vue';
  import SelectedVolumeBar from './muscle/SelectedVolumeBar.vue';
  import SelectedExerciseMini from './exercise/SelectedExerciseMini.vue';

  export default {
    name: 'App',
    components: {Exercise, MuscleMiniInfo, SelectedVolumeBar, SelectedExerciseMini},
    data() {
      return {
        mc: mc,
        ec: ec,
        tweakerState: tweakerStore.state,
        imageCheckboxes: musclesCoordinates
      }
    },
    mounted() {

    },

    computed: {
      checkedMuscles() {
        let arr = [];

        _.forEach(this.imageCheckboxes, (image) => {
          console.log(image);
          image.forEach((muscle) => {
            if (muscle.checked) {
              arr.push(muscle.name);
            }
          })
        });

        return arr;
      }
    },

    methods: {

      isCheckedFromPictureByName(name) {
        return this.checkedMuscles.indexOf(name) > -1
      },

      doesExerciseTrainCheckedMuscle(exercise) {
        let trains = false;
        exercise.musclesUsed.forEach((muscle) => {
          if (this.checkedMuscles.indexOf(muscle.name) > -1) {
            trains = true;
          }
        });
        return trains;
      },

    }
  }
</script>

