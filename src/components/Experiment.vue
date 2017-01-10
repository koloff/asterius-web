<template>
  <div>
    {{muscleToSet}}
    <div class="father">
      <img @click="addCheckBox($event)" class="img" src="../assets/LowerBody.jpg" alt="Lower Body Image"
           style="border: 1px solid #ff2db5">
      <input v-model="checkbox.checked" v-for="checkbox in imageCheckboxes.lowerBody"
             :style="{top: `${checkbox.top}%`, left: `${checkbox.left}%`}" type="checkbox" class="muscle-checkbox"/>
    </div>

    <div class="father">
      <img @click="addCheckBox($event)" class="img" src="../assets/UpperBodyFront.jpg" alt="Upper Body Front"
           style="border: 1px solid #ff2db5">
      <input v-model="checkbox.checked" v-for="checkbox in imageCheckboxes.upperBodyFront"
             :style="{top: `${checkbox.top}%`, left: `${checkbox.left}%`}" type="checkbox" class="muscle-checkbox"/>
    </div>

    <div class="father">
      <img @click="addCheckBox($event)" class="img" src="../assets/UpperBodyBack.jpg" alt="Upper Body Back"
           style="border: 1px solid #ff2db5">
      <input v-model="checkbox.checked" v-for="checkbox in imageCheckboxes.upperBodyBack"
             :style="{top: `${checkbox.top}%`, left: `${checkbox.left}%`}" type="checkbox" class="muscle-checkbox"/>
    </div>


    <div v-for="group in muscles">
      <h3>{{group.name}}</h3>
      <button @click="setMuscle(muscle)" v-for="(muscle, key) in group.parts">{{key}}</button>
    </div>

    <div class="code">
    </div>


  </div>
</template>


<script>
  import mc from '../algorithm/muscle/muscles-collection';
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


<style>
  .father {
    position: relative;
    display: inline-block
  }

  .muscle-checkbox {
    position: absolute;
  }
</style>