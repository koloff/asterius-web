<template>
  <div class="ui segment secondary  center aligned">

    <h2 class="ui header dividing centered" style="margin-bottom: 0">REST</h2>

    <div class="ui statistic large">
      <div class="value">
        {{workoutState.timer.seconds}}
      </div>
      <div class="label">
        SECONDS
      </div>
    </div>
    <br>
    <button class="ui button primary icon">
      <i class="ui icon pause"></i>
      STOP</button>
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
    }
  }
</script>