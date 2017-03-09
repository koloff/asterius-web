<template>
  <div>

    <div class="ui divider" style="margin-top: 0 !important;"></div>
    <muscles-selector :selected-muscles="preferredMuscles"></muscles-selector>

  </div>
</template>

<script>
  
  import MusclesSelector from '../muscle/MusclesSelector.vue';

  export default {
    name: 'PreferredMuscles',
    components: {MusclesSelector},
    mounted() {
      console.log(a);
    },
    data() {
      return {
        preferredMuscles: ['obliques']
      }
    }
  }

</script>
