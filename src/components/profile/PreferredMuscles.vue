<template>
  <div>

    <muscles-selector :selected-muscles="preferredMuscles"></muscles-selector>

  </div>
</template>

<script>
  
  import MusclesSelector from '../muscle/MusclesSelector.vue';

  export default {
    name: 'PreferredMuscles',
    components: {MusclesSelector},
    mounted() {
    },
    data() {
      return {
        preferredMuscles: []
      }
    }
  }

</script>
