<template>
  <div class="card">
    <div class="content">
      <div class="header">
        <img :src="image" class="ui image" :alt="name"/>
        {{name}}
      </div>
      <div class="description">
        <div class="ui inverted segment">
          <div
            v-for="muscle in musclesUsed"
            :data-percent="muscle.percentage"
            class="ui inverted progress green small" style="margin: 7px 0 7px 0">
            {{muscle.broName}}
            <div class="bar">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui three bottom attached buttons">
      <div @click="reduceSets()" class="ui button ">
        <i class="icon minus"></i>
      </div>
      <div class="ui button disabled secondary" style="padding: 10px 0">
        {{setsCount}} sets
      </div>
      <div @click="increaseSets()" class="ui button">
        <i class="icon plus"></i>
      </div>
    </div>
  </div>

</template>

<script>
  import tweakerStore from '../../store/tweaker';


  export default {
    name: 'Exercise',
    props: ['name', 'type', 'musclesUsed', 'image'],
    data() {
      return {
        tweakerState: tweakerStore.state
      }
    },
    mounted() {
      $('.progress').progress({
        showActivity: false
      });

      console.log(this.image);
    },
    computed: {
      setsCount() {
        if (tweakerStore.getExercise(this.name)) {
          return tweakerStore.getExercise(this.name).sets;
        } else {
          return 0;
        }
      }
    },
    methods: {

      reduceSets() {
        console.log('assa');
        tweakerStore.reduceExerciseSets(this.name);
      },

      increaseSets() {
        tweakerStore.increaseExerciseSets(this.name);
      }

    }
  }
</script>