<template>
  <div>
    <h1 class="ui header inverted centered">EDIT CUSTOM WORKOUT </h1>
    <tweaker></tweaker>


    <div class="ui segment basic center aligned">
      <button class="ui button inverted big center aligned" @click="trainClicked()">
        <i class="ui icon checkmark"></i>TRAIN
      </button>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import Tweaker from '../tweaker/Tweaker.vue';
  import tweakerStore from '../../store/tweaker';
  import currentWorkoutStore from '../../store/current-workout';

  export default {
    name: 'Split',
    components: {Tweaker},
    data() {
      return {}
    },
    methods: {
      async trainClicked() {
        await currentWorkoutStore.createWorkoutForToday(_.cloneDeep(tweakerStore.state.workout));
        this.$router.push('/train');
      }
    }
  }


</script>