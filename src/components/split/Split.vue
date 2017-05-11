<template>
  <div>
    <div
      class="ui inverted secondary pointing menu centered center aligned"
      :class="{one: Object.keys(splitState.split).length === 1, two: Object.keys(splitState.split).length === 2, three: Object.keys(splitState.split).length === 3}"
    >

      <a class="item"
         v-for="(workout, type) in splitState.split"
         :class="{active: splitState.currentWorkout === type}"
         @click="viewWorkout(type)"
      > Workout &nbsp; &nbsp; <strong> {{type}}</strong></a>
    </div>

    <div class="ui divider inverted"></div>
    <tweaker></tweaker>

    <div class="ui segment basic center aligned">
      <div class="ui divider inverted"></div>
      <button class="ui button inverted big center aligned" @click="saveSplit()">
        <i class="ui icon checkmark"></i>SAVE THE SPLIT
      </button>
    </div>
  </div>
</template>

<script>
  import Tweaker from '../tweaker/Tweaker.vue';

  import splitStore from '../../store/split';
  import tweakerStore from '../../store/tweaker';

  export default {
    name: 'Split',
    components: {Tweaker},
    data() {
      return {
        splitState: splitStore.state
      }
    },
    async beforeRouteEnter(to, from, next) {
      let res = await splitStore.init();
      next();
    },
    methods: {
      viewWorkout(type) {
        splitStore.setCurrentWorkout(type);

        // todo abstract
        if (type === 'C' || (type === 'B' && !this.splitState.split.C)) {
          let $el = $(`.muscle-in-tweaker[data-key='legsQuadriceps']`);
          $('.muscles-in-tweaker').scrollTo($el, 300);
        } else if (type === 'B' && this.splitState.split.C) {
          let $el = $(`.muscle-in-tweaker[data-key='backUpperTrapezius']`);
          $('.muscles-in-tweaker').scrollTo($el, 300);
        } else {
          let $el = $(`.muscle-in-tweaker[data-key='shouldersAnteriorHead']`);
          $('.muscles-in-tweaker').scrollTo($el, 300);
        }
      },
      async saveSplit() {
        await splitStore.updateSplit();
        this.$router.push('/');
      }
    }
  }
</script>

