<template>
  <div>

    <div class="ui basic modal center middle centered aligned new-workout-confirm-modal">
      <div class="ui icon header">
        <i class="delete calendar icon"></i>
        Delete Current Workout
      </div>
      <div class="content">
        <p>You are about to delete the workout you started today. Are you sure?</p>
      </div>
      <div class="actions">
        <div class="ui red basic cancel inverted button">
          <i class="remove icon"></i>
          No
        </div>
        <div class="ui green ok inverted button">
          <i class="checkmark icon"></i>
          Yes
        </div>
      </div>
    </div>

    <div v-if="!currentWorkoutState.currentlyTraining">
      <div class="ui sub header">WORKOUT FOR TODAY:</div>
      <div class="ui buttons">
        <button class="ui button blue"
          v-for="(workout, key) in splitState.split"
          @click="splitWorkoutClicked(key)"
        >{{key}}</button>
        <div class="or inverted basic"></div>
        <button class="ui button green">CUSTOM</button>
      </div>
    </div>

    <div v-else>
      <div class="ui sub header">CURRENT WORKOUT:</div>
      <div class="ui buttons">
        <button class="ui button green" @click="openClicked()">OPEN</button>
        <div class="or inverted basic"></div>
        <button class="ui button blue" @click=createNewWorkoutClicked()>CREATE NEW</button>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import moment from 'moment';
  import workoutStore from '../../store/workout';
  import currentWorkoutStore from '../../store/current-workout';
  import splitStore from '../../store/split';

  export default {
    name: 'NewWorkoutButtons',
    data() {
      return {
        currentWorkoutState: currentWorkoutStore.state,
        splitState: splitStore.state,
        workoutState: workoutStore.state
      }
    },
    mounted() {
      currentWorkoutStore.init(moment().format('YYYY-MM-DD'));
    },
    methods: {
      splitWorkoutClicked(type) {
        console.log(type);
        let exercises = _.clone(splitStore.state.split[type]);
        currentWorkoutStore.createWorkoutForToday(exercises);
        this.$router.push('/train');
      },
      openClicked() {
        this.$router.push('/train');
      },
      createNewWorkoutClicked() {
        if (!this.currentWorkoutState.isFinished) {
          $('.new-workout-confirm-modal')
            .modal({
              closable: false,
              onApprove: () => {
                currentWorkoutStore.deleteWorkoutForToday();
                this.$router.push('/');
              }
            })
            .modal('show');


        }
      }
    },
  }
</script>