<template>
  <div>

    <div class="ui divider hidden"></div>
    <h2 class="ui icon header inverted center aligned margin-bottom">
      <i class="calendar icon"></i>
      <div class="content">
        Your program
        <div class="sub header">Try to follow it for the next 4 weeks. Results are guaranteed!</div>
      </div>
    </h2>

    <template
      v-for="(week, weekKey) in split">
      <h1 class="ui header dividing inverted">
        WEEK {{weekKey[weekKey.length - 1]}}
        <div class="sub header">
          {{week.caption}}
        </div>
      </h1>
      <div class="ui cards seven stackable">
        <workout-mini
          v-for="(weekDay, dayKey) in week.days"
          :week="weekKey"
          :day="weekDay.day"
          :type="weekDay.type">
        </workout-mini>
      </div>
    </template>

  </div>
</template>

<script>
  import WorkoutMini from './workout/WorkoutMini.vue';
  import split from './split';

  export default {
    name: 'Program',
    components: {WorkoutMini},
    data() {
      return {
        split: split
      }
    }
  }
</script>