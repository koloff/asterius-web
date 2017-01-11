<template>

  <div class="item">
    <img class="ui avatar image" src="../../assets/UpperBodyBack.jpg">
    <div class="content">
      <div class="header">{{exercise.name}}</div>
      {{exercise.sets}} sets
      <a href="#" @click="reduceSets()"><i class="ui icon minus grey"></i></a>
      <a href="#" @click="increaseSets()"><i class="ui icon plus green"></i></a>
    </div>
  </div>

</template>

<script>
  import tweakerStore from '../../store/tweaker';
  export default {
    name: 'SelectedExerciseMini',
    props: ['exercise'],
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