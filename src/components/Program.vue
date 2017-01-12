<template>
  <div>
    <template
      v-for="(week, key) in split"
    >
      <h1 class="ui header dividing inverted">
        WEEK {{key[key.length - 1]}}
        <div class="sub header">
          {{week.caption}}
        </div>
      </h1>
      <div class="ui cards seven stackable">
        <workout-mini
          v-for="(weekDay, key) in week.days"
          :day="weekDay.day"
          :type="weekDay.type"
        >

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