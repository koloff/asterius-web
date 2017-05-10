<template>
  <div>

    <div class="ui segment basic center aligned" style="margin-top: 60px;">
      <h2 class="ui header inverted">

        {{Date.now() | date | uppercase}}
        <div class="ui inverted sub header">
          {{currentWorkoutState.currentlyTraining ? 'CURRENT WORKOUT:' : 'TRAIN TODAY:'}}
        </div>
      </h2>

    <new-workout-buttons></new-workout-buttons>
      
    </div>


  </div>
</template>

<script>
  import NewWorkoutButtons from '../workout/NewWorkoutButtons.vue';
  import currentWorkoutStore from '../../store/current-workout';

  export default {
    name: 'Program',
    components: {NewWorkoutButtons},
    data() {
      return {
        currentWorkoutState: currentWorkoutStore.state
      }
    }
  }
</script>