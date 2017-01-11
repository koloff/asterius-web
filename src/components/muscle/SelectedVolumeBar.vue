<template>

  <div class="column">
    <div class="ui progress small" style="margin-bottom: 0">
      <div class="bar"></div>
    </div>
    <h5 class="ui header" style="margin-top: 2px">
      <img src="../../assets/LowerBody.jpg">
      <div class="content">
        {{muscle.broName}}
        <div class="sub header"><i>{{muscle.name}}</i></div>
      </div>
    </h5>

{{mrvPercentage}}


  </div>

</template>

<script>
  import tweakerStore from '../../store/tweaker';

  export default {
    name: 'SelectedVolumeBar',
    props: ['muscle'],
    mounted() {
      tweakerStore.calculateMRVPercentage(this.muscle);
    },
    computed: {
      mrvPercentage() {
        return tweakerStore.calculateMRVPercentage(this.muscle);
      }
    }
  }
</script>