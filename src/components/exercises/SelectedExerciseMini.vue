<template>

  <div class="item">
    <img class="ui avatar mini image" :src="fullExercise.image">
    <div class="content">
      <div class="header">{{exercise.name}}
      </div>
      {{exercise.sets}} sets
      <a @click="reduceSets()"><i class="ui icon minus grey"></i></a>
      <a @click="increaseSets()"><i class="ui icon plus green"></i></a>
    </div>
  </div>

</template>

<script>
  import tweakerStore from '../../store/tweaker';
  import {getExercise} from '../../algorithm/exercises/exercises-collection';
  export default {
    name: 'SelectedExerciseMini',
    props: ['exercise'],
    data() {
      return {
        fullExercise: getExercise(this.exercise.name)
      }
    },
    mounted() {
    },
    methods: {
      reduceSets() {
        tweakerStore.reduceExerciseSets(this.exercise.name);
      },

      increaseSets() {
        tweakerStore.increaseExerciseSets(this.exercise.name);
      }
    }
  }
</script>