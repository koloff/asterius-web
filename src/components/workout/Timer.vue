<template>
  <div class="ui segment secondary  center aligned">

    <h2 class="ui header dividing centered" style="margin-bottom: 0">REST</h2>

    <div class="ui statistic large">
      <div v-if="workoutState.timer.state === 'running'" class="value">
        {{workoutState.timer.seconds}}
      </div>
      <div v-if="currentStep.performedValue" class="ui input massive">
        <input v-model="inputSeconds.seconds" @input="inputChanged" type="text" placeholder="Search..."
               style="text-align: center">
      </div>
      <div class="label">
        SECONDS
      </div>
    </div>
    <br>

    <button
      class="ui button primary icon"
      v-if="workoutState.timer.state === 'running'"
      @click="stopTimer()">
      <i class="ui icon stop"></i>
      STOP
    </button>


  </div>
</template>

<script>
  import workoutStore from '../../store/workout';

  export default {
    name: 'Timer',
    data() {
      return {
        workoutState: workoutStore.state
      }
    },
    computed: {
      currentStep() {
        return workoutStore.getCurrentStep();
      },
      inputSeconds() {
        return workoutStore.getCurrentStep().performedValue;
      }
    },
    methods: {

      inputChanged(ev) {
        workoutStore.recordRest(this.inputSeconds.seconds);
      },
      startTimer() {
        workoutStore.startTimer();
      },

      stopTimer() {
        workoutStore.stopTimer();
      }
    }
  }
</script>