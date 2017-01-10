<template>
  <div>
    <div class="ui segment">
      <div v-for="(checkbox, key) in imageCheckboxes.upperBodyFront" class="ui checkbox">
        <input v-model="checkbox.checked" type="checkbox" name="example"/>
        <label>{{checkbox.name}}</label>
      </div>

      <div>
        <div class="ui cards five doubling">
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

    <div class="ui four cards doubling">
      <exercise
        v-for="exercise in ec"
        v-if="doesExerciseTrainCheckedMuscle(exercise)"
        :name="exercise.name"
        :type="exercise.type"
        :musclesUsed="exercise.musclesUsed"
      ></exercise>
    </div>

    {{tweakerState}}

  </div>
</template>

<script>

  import _ from 'lodash';
  import mc from '../algorithm/muscle/muscles-collection';
  import ec from '../algorithm/exercise/exercises-collection';
  import tweakerStore from '../store/tweaker';
  import musclesCoordinates from './muscles-coordinates';

  import Exercise from './exercise/Exercise.vue';
  import MuscleMiniInfo from './muscle/MuslceMiniInfo.vue';

  export default {
    name: 'App',
    components: {Exercise, MuscleMiniInfo},
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

