<template>
  <div>
    <h1 class="ui header inverted">GENERATE CUSTOM WORKOUT
      <div class="sub header">SELECT MUSCLES TO TRAIN:</div>
    </h1>
    <muscles-selector :selectedMuscles="selectedMuscles"></muscles-selector>



    <div class="ui segment basic center aligned">
      <button class="ui button inverted big center aligned" @click="generateWorkout()">
        <i class="ui icon settings"></i>GENERATE
      </button>
    </div>
  </div>
</template>

<script>
  import MusclesSelector from '../muscles/MusclesSelector.vue';
  import tweakerState from '../../store/tweaker';

  export default {
    name: 'CreateCustomWorkout',
    components: {MusclesSelector},
    data() {
      return {
        selectedMuscles: ['chestClavicularHead']
      }
    },
    methods: {
      generateWorkout() {
        let exercises = [{key: 'dumbbellBenchPress', sets: 3},{key: 'barbellSquat', sets: 3},{key: 'lateralRaise', sets: 3}];
        tweakerState.init(exercises);
        this.$router.push('/edit-custom-workout');
      }
    },
  }
</script>