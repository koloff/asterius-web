<template>

  <div class="ui card">

    <div class="content">
      <div class="header">{{day}}</div>
    </div>

    <div class="content center aligned">
      <img  :src="getImage()" class="ui image tiny circular" alt="">
      <h4 class="ui sub header">{{type}}</h4>
      <div class="extra content">
        <button :class="{disabled: type === 'Rest', gray: type === 'Rest', primary: type !== 'Rest'}" class="ui button">GO</button>
      </div>
    </div>

  </div>

</template>

<script>
  
  import {ec} from '../../algorithm/exercise/exercises-collection';
  export default {
    name: 'WorkoutMini',
    props: ['day', 'type'],
    methods: {
      getImage() {
        if (this.type === 'Push') {
          return ec.dumbbellBenchPress.image;
        } else if (this.type === 'Pull') {
          return ec.latPulldownWideGrip.image;
        } else if (this.type === 'Legs') {
          return ec.barbellSquat.image;
        } else if (this.type === 'Rest') {
          return require('../../assets/south-pacific-hammock.jpg');
        }
      }
    }
  }
</script>