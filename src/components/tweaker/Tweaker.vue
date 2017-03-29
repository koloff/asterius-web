<template>
  <div>
    <h4 class="ui header">Exercises that you are going to perform in one week:</h4>
    <exercises-slider-in-tweaker>
    </exercises-slider-in-tweaker>


    <h4 class="ui header">Choose target muscles:</h4>
    <div class="ui segment secondary tweaker-muscles-container">
      <muscle-in-tweaker
        v-for="muscle in tweakerState.muscles"
        :muscle="muscle"
      >
      </muscle-in-tweaker>
    </div>

  </div>
</template>

<script>
  import _ from 'lodash';
  import tweakerStore from '../../store/tweaker';
  import rootStore from '../../store/root';

  import ExercisesSliderInTweaker from '../sliders/ExercisesSliderInTweaker.vue';
  import MuscleInTweaker from './MuscleInTweaker.vue';

  export default {
    name: 'App',
    components: {ExercisesSliderInTweaker, MuscleInTweaker},
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
    computed: {},
    methods: {
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

<style>
  .tweaker-muscles-container {
    max-height: 400px;
    overflow-y: auto;
  }
</style>