<template>
  <div>

    <h4 class="ui header centered">{{'What muscles would you like to focus on?'}}</h4>
    <muscles-selector :selected-muscles="preferredMuscles"></muscles-selector>

  </div>
</template>

<script>
  
  import MusclesSelector from '../muscles/MusclesSelector.vue';

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
