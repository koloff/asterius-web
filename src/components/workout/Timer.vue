<template>
  <div class="ui segment secondary center aligned">

    <h2 class="ui header centered" style="margin-bottom: 0">
      REST
      <div class="sub header">
        STOP THE TIMER AND RECORD YOUR REST:
      </div>
    </h2>

    <div class="ui statistic large">
      <div class="value"
           v-if="workoutState.timer.state === 'running' || !inputSeconds"
      >
        {{workoutState.timer.seconds}}
      </div>
      <div v-if="currentStep.performedValue" class="ui input massive fluid" style="min-width: 100px">
        <input v-model="inputSeconds.seconds" @input="inputChanged" type="text"
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

    <button
      class="ui button primary icon"
      v-if="workoutState.timer.state === 'stopped' && !inputSeconds"
      @click="startTimer()">
      <i class="ui icon play"></i>
      START
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