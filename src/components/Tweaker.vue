<template>
  <div>


    <div class="ui divider hidden"></div>
    <h2 class="ui icon header inverted center aligned margin-bottom">
      <i class="options icon"></i>
      <div class="content">
        Workout tweaker
        <div class="sub header">Target your favourite muscles. Choose your favourite exercises.</div>
      </div>
    </h2>

    <div class="ui equal height grid stackable middle aligned segment">
      <div class="row">
        <div class="five wide column" style="padding: 1px">
          <div class="father">
            <img class="ui fluid image" src="../assets/body-images/UpperBodyFront.jpg"
                 height="250" alt="Upper Body Front">

            <div class="ui checkbox muscle-checkbox" v-for="checkbox in imageCheckboxes.upperBodyFront"
                 :style="{top: `${checkbox.top}%`, left: `${checkbox.left}%`}">
              <input v-model="checkbox.checked" type="checkbox"/><label></label>
            </div>

          </div>
        </div>
        <div class="six wide column" style="padding: 1px">
          <div class="father">
            <img class="ui fluid image" src="../assets/body-images/UpperBodyBack.jpg"
                 alt="Upper Body Back">
            <div class="ui checkbox muscle-checkbox" v-for="checkbox in imageCheckboxes.upperBodyBack"
                 :style="{top: `${checkbox.top}%`, left: `${checkbox.left}%`}">
              <input v-model="checkbox.checked" type="checkbox"/><label></label>
            </div>
          </div>
        </div>
        <div class="five wide  column" style="padding: 1px">
          <div class="father">
            <img class="ui fluid image" src="../assets/body-images/LowerBody.jpg"
                 alt="Lower Body Image">
            <div class="ui checkbox muscle-checkbox" v-for="checkbox in imageCheckboxes.lowerBody"
                 :style="{top: `${checkbox.top}%`, left: `${checkbox.left}%`}">
              <input v-model="checkbox.checked" type="checkbox"/><label></label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui grid two columns stackable">
      <div class="column">
        <h2 class="ui header inverted">
          Find exercises
          <div class="sub header">Choose exercises based on the muscles you want to train</div>
        </h2>

        <h4 class="ui dividing header inverted">
          Selected muscles
        </h4>

        <div class="ui info message" v-if="checkedMuscles.length < 1" style="margin-bottom: 24px">
          <div class="header">No selected muscles</div>
          <p>Mark muscle from the images above to see which exercises train it</p>
        </div>

        <div>
          <div class="ui cards three doubling">
            <template v-for="muscleGroup in mc">
              <muscle-mini-info
                v-for="muscle in muscleGroup.parts"
                v-if="isCheckedFromPictureByName(muscle.name)"
                :name="muscle.name"
                :bro-name="muscle.broName"
                :image="muscle.image"
              />
            </template>
          </div>
        </div>

        <h4 class="ui dividing header inverted">
          Exercises
        </h4>

        <div class="ui two cards stackable">
          <exercise
            v-for="exercise in ec"
            v-if="doesExerciseTrainCheckedMuscle(exercise)"
            :name="exercise.name"
            :type="exercise.type"
            :musclesUsed="exercise.musclesUsed"
            :image="exercise.image"
          ></exercise>
        </div>
      </div>

      <div class="column">
        <h2 class="ui header inverted">
          Edit volume
          <div class="sub header">Edit your weekly volume for each muscle based on the chosen exercises</div>
        </h2>

        <div class="ui segment">
          <h3 class="ui header">
            Your exercises
            <div class="sub header">These are going to be split over the week by the generator</div>
          </h3>
          <div class="ui horizontal list">
            <selected-exercise-mini
              v-for="exercise in tweakerState.exercises"
              :exercise="exercise"
            ></selected-exercise-mini>
          </div>
        </div>

        <h4 class="ui header inverted dividing">
          Muscles weekly volume
          <div class="sub header">Edit your exercises to tweak the volume. Do not exceed the MRV.</div>
        </h4>


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


    <div class="ui divider hidden"></div>

    <button @click="generate()" class="ui green button large fluid">
      <i class="ui icon flag checkered"></i>
      Go
    </button>

    <div class="ui divider hidden"></div>

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

  import rootStore from '../store/root';

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
      generate() {
        rootStore.setLoadingTweaker(true);
        setTimeout(() => {
          rootStore.setLoadingTweaker(false);
          this.$router.push('/program');
        }, 2500);
      }
    }
  }
</script>
