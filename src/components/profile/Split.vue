<template>
  <div>
    <div
      class="ui item menu"
      :class="{one: Object.keys(splitState.split).length === 1, two: Object.keys(splitState.split).length === 2, three: Object.keys(splitState.split).length === 3}">
      <a class="item"
         v-for="(workout, type) in splitState.split"
         :class="{active: splitState.currentWorkout === type}"
         @click="viewWorkout(type)"
      > Workout &nbsp;&nbsp; <strong> {{type}}</strong></a>
    </div>

    <tweaker></tweaker>

  </div>
</template>

<script>
  import splitStore from '../../store/split';
  import tweakerStore from '../../store/tweaker';
  import Tweaker from '../tweaker/Tweaker.vue';

  export default {
    name: 'Split',
    components: {Tweaker},
    data() {
      return {
        splitState: splitStore.state
      }
    },
    beforeCreate(){
      tweakerStore.init();
    },
    methods: {
      viewWorkout(type) {
        splitStore.setCurrentWorkout(type);
        tweakerStore.loadSelectedExercises(this.splitState.split[this.splitState.currentWorkout]);
      }
    }
  }
</script>