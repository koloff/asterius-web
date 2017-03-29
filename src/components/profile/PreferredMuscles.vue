<template>
  <div>
    <h4 class="ui header centered">What muscles would you like to focus on?</h4>
    <muscles-selector :selected-muscles="preferredMusclesState.preferredMuscles"></muscles-selector>
  </div>
</template>

<script>
  import MusclesSelector from '../muscles/MusclesSelector.vue';
  import preferredMusclesStore from '../../store/preferred-muscles';

  export default {
    name: 'PreferredMuscles',
    components: {MusclesSelector},
    data() {
      return {
        preferredMusclesState: preferredMusclesStore.state
      }
    },
    methods: {}
  }

</script>
