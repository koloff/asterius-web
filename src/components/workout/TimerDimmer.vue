<template>
  <div class="ui dimmer active timer-dimmer">
    <div class="content">
      <div class="center">
        <div class="ui statistic inverted">
          <div class="value">
            {{timeText}}
          </div>
          <div class="label">
            OPTIMAL REST: ~01:30
          </div>
        </div>
        <br> <br>
        <button
          class="ui inverted button"
          v-if="currentWorkoutState.timer.state === 'inited'"
          @click="startRest()">
          <i class="ui icon time"></i>
          START REST
        </button>
        <button class="ui inverted button"
          v-else
          @click="stopRest()">
          <i class="ui icon time"></i>
          STOP REST
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import currentWorkoutStore from '../../store/current-workout';
  import workoutStore from '../../store/workout';

  export default {
    name: 'TimerDimmer',
    data() {
      return {
        timeText: '',
        currentWorkoutState: currentWorkoutStore.state,
        workoutState: workoutStore.state
      }
    },
    mounted() {
      this.timeText = this.getTimeText();
      setInterval(() => {
        this.timeText = this.getTimeText();
      }, 1000)
    },
    methods: {
      millisecondsToMinutesSeconds(ms) {
        let duration = moment.duration(ms, 'milliseconds');
        let fromMinutes = Math.floor(duration.asMinutes());
        let fromSeconds = Math.floor(duration.asSeconds() - fromMinutes * 60);

        return Math.floor(duration.asSeconds()) >= 60 ? (fromMinutes<= 9 ? '0'+fromMinutes : fromMinutes) +':'+ (fromSeconds<= 9 ? '0'+fromSeconds : fromSeconds)
          : '00:'+(fromSeconds<= 9 ? '0'+fromSeconds : fromSeconds);
      },
      getTimeText() {
        if (!this.currentWorkoutState.timer.startMoment || this.currentWorkoutState.timer.state === 'inited') {
          return '00:00';
        }
        let start = moment(this.currentWorkoutState.timer.startMoment);
        let now = moment();
        let diffed = now.diff(start);
        return this.millisecondsToMinutesSeconds(diffed);
      },

      startRest() {
        currentWorkoutStore.startTimer();
        this.timeText = this.getTimeText();
      },

      stopRest() {
        currentWorkoutStore.stopTimer();
        this.timeText = this.getTimeText();
      }
    }
  }
</script>