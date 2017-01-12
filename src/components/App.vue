<template>
  <div>


  </div>
</template>

<script>


  export default {
    name: 'App',
    components: {},
    data() {
      return {}
    },
    computed: {
      maximumWeeklySets() {
        let daysCount = 0;
        _.forOwn(this.chosenDays, (day) => {
          if (day) daysCount++;
        });

        return volume.calculateMaximumWeeklySets(daysCount, this.sessionMinutes);
      }
    },

    methods: {

      getMuscleByKey() {

      },

      isCheckedFromPictureByKey(key) {
        return this.imageCheckboxes.lowerBody[key] && this.imageCheckboxes.lowerBody[key].checked ||
          this.imageCheckboxes.upperBodyFront[key] && this.imageCheckboxes.upperBodyFront[key].checked ||
          this.imageCheckboxes.upperBodyBack[key] && this.imageCheckboxes.upperBodyBack[key].checked
      },

      doesExerciseTrainCheckedMuscle(exercise) {
        exercise.musclesUsed.forEach((muscle) => {
          console.log(muscle);
        });
        return true;
      },

    }
  }
</script>

