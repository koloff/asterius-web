<template>
  <div>

    <div class="code">
    </div>


    <div class="ui equal height grid stackable middle aligned segment">
      <div class="row">
        <div class="five wide column" style="padding: 1px">
          <div class="father">
            <img class="ui fluid image" @click="addCheckBox($event)" src="../assets/body-images/UpperBodyFront.jpg"
                 height="250" alt="Upper Body Front">
            <input v-model="checkbox.checked" v-for="checkbox in imageCheckboxes.upperBodyFront"
                   :style="{top: `${checkbox.top}%`, left: `${checkbox.left}%`}" type="checkbox"
                   class="muscle-checkbox"/>
          </div>
        </div>
        <div class="six wide  column" style="padding: 1px">
          <div class="father">
            <img class="ui fluid image" @click="addCheckBox($event)" src="../assets/body-images/UpperBodyBack.jpg"
                 alt="Upper Body Back">
            <input v-model="checkbox.checked" v-for="checkbox in imageCheckboxes.upperBodyBack"
                   :style="{top: `${checkbox.top}%`, left: `${checkbox.left}%`}" type="checkbox"
                   class="muscle-checkbox"/>
          </div>
        </div>
        <div class="five wide  column" style="padding: 1px">
          <div class="father">
            <img class="ui fluid image" @click="addCheckBox($event)" src="../assets/body-images/LowerBody.jpg"
                 alt="Lower Body Image">
            <input v-model="checkbox.checked" v-for="checkbox in imageCheckboxes.lowerBody"
                   :style="{top: `${checkbox.top}%`, left: `${checkbox.left}%`}" type="checkbox"
                   class="muscle-checkbox"/>
          </div>
        </div>
      </div>
    </div>


    <div v-for="group in muscles">
      <h3>{{group.name}}</h3>
      <button @click="setMuscle(muscle)" v-for="(muscle, key) in group.parts">{{key}}</button>
    </div>



  </div>
</template>


<script>
  import {mc} from '../algorithm/muscles/muscles-collection-OLD';
  import _ from 'lodash';

  import musclesCoordinates from './muscles-coordinates';

  export default {
    name: 'Experiment',
    data() {
      return {
        inpName: '',
        muscles: null,
        imageCheckboxes: musclesCoordinates
      }
    },
    mounted() {
      let muscles = _.clone(mc);
      this.muscles = muscles;
    },
    methods: {
      setMuscle(muscleName) {
        this.muscleToSet = muscleName;
      },
      addCheckBox($event) {
        console.log($event);
        let width = $event.target.clientWidth;
        let height = $event.target.clientHeight;
        $('.code')[0].innerHTML += `{name: '${this.muscleToSet.name}', left: ${$event.offsetX / width * 100}, top: ${$event.offsetY / height * 100}, checked: false},<br>`;
      }
    }
  }
</script>
