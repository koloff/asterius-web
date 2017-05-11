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
      <div class="ui buttons" v-if="splitState.split.A">
        <button class="ui button blue"
                v-for="(workout, key) in splitState.split"
                @click="splitWorkoutClicked(key)"
        >{{key}}
        </button>
        <div class="or inverted basic"></div>
        <button class="ui button green" @click="customWorkoutClicked()">CUSTOM</button>
      </div>
    </div>

    <div v-else>
      <div class="ui sub header">CURRENT WORKOUT:</div>
      <div class="ui buttons">
        <button class="ui button green" @click="openClicked()">OPEN</button>
        <div class="or inverted basic"></div>
        <button class="ui button blue" @click=createNewWorkoutClicked()>START NEW</button>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import moment from 'moment';
  
  import CreateCustomWorkout from './CreateCustomWorkout.vue';
  
  import workoutStore from '../../store/workout';
  import currentWorkoutStore from '../../store/current-workout';
  import splitStore from '../../store/split';

  export default {
    name: 'NewWorkoutButtons',
    components: {CreateCustomWorkout},
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
      async splitWorkoutClicked(type) {
        console.log(splitStore.state.split[type]);
        let exercises = _.cloneDeep(splitStore.state.split[type]);
        currentWorkoutStore.createWorkoutForToday(exercises);
        this.$router.push('/train');
      },
      customWorkoutClicked() {
        this.$router.push('/custom-workout');
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