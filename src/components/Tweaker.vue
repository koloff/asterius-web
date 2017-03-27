<template>
  <div>

    <button @click="reload">reload</button>
    <h1>YOUR WEEKLY VOLUME</h1>
    <exercises-slider-in-tweaker></exercises-slider-in-tweaker>

    <div
      v-for="muscle in tweakerState.muscles"
    >
      <div class="ui checkbox">
        <input v-model="muscle.selected" type="checkbox" name="example">
        <label>Make my profile visible</label>
      </div>

      {{muscle.selected}}
      {{muscle.info.broName}}
    </div>


  </div>
</template>

<script>
  import _ from 'lodash';
  import tweakerStore from '../store/tweaker';
  import rootStore from '../store/root';
  
  import ExercisesSliderInTweaker from './sliders/ExercisesSliderInTweaker.vue';

  export default {
    name: 'App',
    components: {ExercisesSliderInTweaker},
    data() {
      return {
        tweakerState: tweakerStore.state,
      }
    },
    beforeCreate() {
      // loads exercises and muscles in state
      tweakerStore.init();
    },
    mounted() {
    },
    computed: {
      checkedMuscles() {
        let arr = [];
        // todo
        return arr;
      }
    },
    methods: {
      reload() {
        tweakerStore.state.exercises = [];
        tweakerStore.init();
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
