<template>

  <div class="column">
    <div class="ui progress small" :class="barColor" :data-percent="mrvPercentage" style="margin-bottom: 0">
      <div class="bar"></div>
    </div>
    <h5 class="ui header" style="margin-top: 2px">
      <!--<img :src="muscle.image" />-->
      <div class="content">
        {{muscle.info.broName}}
        <div class="sub header"><i>{{muscle.info.name}}</i></div>
      </div>
    </h5>

  </div>

</template>

<script>
  import tweakerStore from '../../store/tweaker';
  export default {
    name: 'SelectedVolumeBar',
    props: ['muscle'],
    data() {
      return {
        barColor: ''
      }
    },
    mounted() {
      $(this.$el).find('.progress').progress({
        showActivity: false,
        limitValues: false
      });
      tweakerStore.calculateMRVPercentage(this.muscle);
    },
    computed: {
      mrvPercentage() {
        let percentage = tweakerStore.calculateMRVPercentage(this.muscle);
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
    methods: {}
  }
</script>