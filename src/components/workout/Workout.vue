<template>
  <div>


    <exercise-circular
      :exercise-key="'dumbbellBenchPress'"
      :maxWidth="190"
      :maxHeight="190"
    ></exercise-circular>

    <exercise-circular
      :exercise-key="'lateralRaise'"
      :maxWidth="190"
      :maxHeight="190"
    ></exercise-circular>

    <exercise-circular
      :exercise-key="'dumbbellShoulderPress'"
      :maxWidth="190"
      :maxHeight="190"
    ></exercise-circular>


    <sets-selector></sets-selector>
  </div>
</template>

<script>

  import ExerciseCircular from '../exercise/ExerciseCircular.vue';
  import SetsSelector from '../grids/SetsSelector.vue';

  export default {
    name: 'Workout',
    components: {SetsSelector, ExerciseCircular}
  }
</script>