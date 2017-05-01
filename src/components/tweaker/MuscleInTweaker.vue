<template>
  <div class="muscle-in-tweaker"
       @click="switchMuscle()"
       :class=""
       :style="{border: getBorderStyle()}"
  >

    <img class="ui image rounded left floated muscle-in-tweaker-image" :src="muscleImagesUrl + muscle.key +'.jpg'"/>

    <div class="ui progress small inverted" :class="barColor" :data-percent="mrvPercentage" style="margin: 0">
      <div class="bar"></div>
    </div>
    <h4 class="ui header inverted" style="margin-top: 2px">
      <div class="content">
        {{muscle.selected}}
        {{muscle.info.broName | uppercase}}
        <div class="sub header"><i>{{muscle.info.name}}</i></div>
      </div>
    </h4>


  </div>
</template>

<script>
  import tweakerStore from '../../store/tweaker';
  export default {
    name: 'MuscleInTweaker',
    props: ['muscle'],
    data() {
      return {
        barColor: '',
        muscleImagesUrl: window.apiUrl + '/static/muscles-images/',
        tweakerState: tweakerStore.state
      }
    },
    mounted() {
      console.log(this.muscle);
      $(this.$el).find('.progress').progress({
        showActivity: false,
        limitValues: false
      });
    },
    computed: {
      mrvPercentage() {
        let percentage = tweakerStore.calculateMrvPercentage(this.muscle);
        if (percentage >= 100) {
          $(this.$el).find('.progress').progress('set error');
          return percentage;
        }
        if (percentage < 25) {
          this.barColor = 'gray';
        } else if (percentage >= 25 && percentage < 50) {
          this.barColor = 'olive';
        } else if (percentage >= 50 && percentage < 90) {
          this.barColor = 'green';
        } else if (percentage >= 90 && percentage < 100) {
          this.barColor = 'orange';
        }
        $(this.$el).find('.progress').progress('set percent', percentage);
        return percentage;
      }
    },
    methods: {
      switchMuscle() {
        tweakerStore.switchMuscle(this.muscle.key);
      },
      getBorderStyle() {
        if (this.tweakerState.selectedMuscles.indexOf(this.muscle.key) >= 0) {
          return `2px solid ${this.muscle.info.color}`
        } else {
          return `2px solid #444`;
        }
      }
    }
  }
</script>

<style>

  .muscle-in-tweaker {
    position: relative;
    margin: 23px 5px;
    padding: 5px 5px 5px 80px !important;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
  }

  .muscle-in-tweaker:hover {
    cursor: pointer;
  }

  .muscle-in-tweaker-image {
    position: absolute !important;
    left: -5px;
    top: -7px;
    width: 75px;
    height: 75px;
  }
</style>
