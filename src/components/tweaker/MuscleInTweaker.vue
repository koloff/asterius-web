<template>
  <div class="ui segment muscle-in-tweaker"
       @click="switchMuscle()"
       :class="{secondary: !muscle.selected}"
       :style="{border: getBorderStyle()}"
       style="padding: 0 7px 0 0;"
  >

    <div class="ui grid equal width">

      <div class="ui column" style="max-width:100px; padding-right: 0">
        <img class="ui image rounded muscle-in-tweaker-image" :src="muscleImagesUrl + muscle.key +'.jpg'"/>
      </div>

      <div class="ui column middle aligned">

        <div class="ui progress small" :class="barColor" :data-percent="mrvPercentage" style="margin-bottom: 0">
          <div class="bar"></div>
        </div>
        <h4 class="ui header" style="margin-top: 2px">
          <div class="content">
            {{muscle.info.broName | uppercase}}
            <div class="sub header"><i>{{muscle.info.name}}</i></div>
          </div>
        </h4>

      </div>
    </div>


  </div>
</template>

<script>
  import tweakerStore from '../../store/tweaker';
  export default {
    name: 'SelectedVolumeBar',
    props: ['muscle'],
    data() {
      return {
        barColor: '',
        muscleImagesUrl: window.apiUrl + '/static/muscles-images/'
      }
    },
    mounted() {
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
        this.muscle.selected = !this.muscle.selected;
      },
      getBorderStyle() {
        if (this.muscle.selected) {
          return `3px solid ${this.muscle.info.color}`
        } else {
          return ``;
        }
      }
    }
  }
</script>

<style>

  .muscle-in-tweaker:hover {
    cursor: pointer;
  }

  .muscle-in-tweaker-image {
    max-width: 100px;
    max-height: 100px;
  }
</style>
