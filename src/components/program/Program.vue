<template>
  <div>

    <h1 class="ui header">
      TODAY'S WORKOUT
      <div class="sub header">{{new Date().toDateString()}}</div>
    </h1>
    <div class="ui three column stackable center aligned grid segment">

      <router-link :to="'/workout/A'" class="column">
        <div class="teal ui button">A</div>
      </router-link>


      <router-link :to="'/workout/B'" class="column">
        <div class="ui button">B</div>
      </router-link>


      <router-link :to="'/workout/C'" class="column">
        <div class="ui button">C</div>
      </router-link>

    </div>

  </div>
</template>

<script>
  import splitStore from '../../store/split';

  export default {
    name: 'Program',
    data() {
      return {
        splitState: splitStore.state
      }
    }
  }
</script>