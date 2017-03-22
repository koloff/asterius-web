<template>
  <div>


    <exercise-circular
      :exercise-key="'dumbbellBenchPress'"
      :setsCount="15"
      :type="'tweaker'"
    ></exercise-circular>

    <exercise-circular
      :exercise-key="'lateralRaise'"
      :setsCount="3"
      :type="'workout'"
    ></exercise-circular>

    <exercise-circular
      :exercise-key="'lateralRaise'"
      :setsCount="1"
      :type="'workout'"
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