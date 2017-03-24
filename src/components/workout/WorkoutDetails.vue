<template>
  <div>
    <div class="ui divider hidden"></div>

    <h1 class="ui icon header inverted center aligned">
      <i class="calendar icon"></i>
      <div class="content">
        WEEK {{ $route.params.week[$route.params.week.length - 1]}}
      </div>
    </h1>


    <h2 class="ui header inverted  dividing">
      {{day.day}}
      <div class="sub header">
        {{type}}
      </div>
    </h2>


    <div class="ui cards five">

      <div v-for="exercise in workout" class="ui card">
        <div class="ui slide masked  image">
          <img :src="getImage(exercise.name)" class="visible content">
          <!--<img :src="/images/avatar/large/elliot.jpg" class="hidden content">-->
        </div>
        <div class="content">
          <a class="header">{{exercise.name}}</a>

        </div>
        <div class="extra content center aligned" style="padding: 4px">
          <div class="ui green label"
               v-for="set in exercise.sets"
          >{{set.reps}} REPS
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

  import split from '../split';
  import {getExercise} from '../../algorithm/exercises/exercises-collection';

  export default {
    name: 'WorkoutDetails',
    data() {
      return {
        split: split,
        day: [],
        workout: null,
        type: null,
        getExercise: getExercise
      }
    },
    mounted() {

      $(this.$el).transition('pulse');
      let day = this.split[this.$route.params.week].days[this.$route.params.day.toLowerCase()];

      this.day = day;
      this.type = day.type;
      this.workout = day.workout;
      console.log(this.split);
    },
    methods: {
      getImage(exerciseName) {
        let exercise = getExercise(exerciseName);
        console.log(exercise);
        console.log(exerciseName);
        return exercise.image;
      }
    }

  }

</script>