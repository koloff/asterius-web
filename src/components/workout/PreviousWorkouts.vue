<template>
  <div>

    <h1 class="ui header inverted centered" style="margin-top: 10px;">WORKOUTS</h1>

    <div class="ui relaxed divided list inverted">
      <div class="item"
           v-for="(workout, key) in workouts">
        <i class="large box checkmark middle aligned icon inverted"></i>
        <div class="content">
          <a class="header">{{getFormattedDate(key)}}</a>
          <div class="description">Workout A</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import workoutStore from '../../store/workout';

  export default {
    name: 'PreviousWorkouts',
    data() {
      return {
        workouts: []
      }
    },
    async mounted() {
      // TODO
      this.$set(this, 'workouts', await workoutStore.getPreviousWorkouts());
    },
    methods: {
      getFormattedDate(dateStr) {
        return moment(dateStr).format('DD MMMM YYYY');
      }
    }
  }
</script>