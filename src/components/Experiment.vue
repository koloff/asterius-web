<template>
  <div>
    {{muscleToSet}}
    <div class="father">
      <img @click="addCheckBox($event)" class="img" src="../assets/img.jpg" alt="kraka" style="border: 1px solid #ff2db5">
    </div>

    <div v-for="group in muscles">
      <h3>{{group.name}}</h3>
      <button @click="setMuscle(key)" v-for="(muscle, key) in group.parts">{{key}}</button>
    </div>

    <div class="code">
    </div>


  </div>
</template>


<script>
  import mc from '../algorithm/muscle/muscles-collection';
  import _ from 'lodash';

  export default {
    name: 'Experiment',
    data() {
      return {
        inpName: '',
        muscles: null,
        coordinates: {
          anteriorHead: {left: 350, top: 262},
          brachioradialis: {left: 131, top: 416},
        },
        muscleToSet: null
      }
    },
    mounted() {
      let muscles = _.clone(mc);
      this.muscles = muscles;
    },
    methods: {
      setMuscle(key) {
        this.muscleToSet = key;
      },
      addCheckBox($event) {
        console.log($event);
        $('.code')[0].innerHTML+=`${this.muscleToSet}: {left: ${$event.offsetX}, top: ${$event.offsetY}},<br>`;
      }
    }
  }
</script>


<style>
  .father {
    position: relative;
  }

  .muscle-checkbox {
    position: absolute;
  }
</style>