<template>
  <div class="ui segment exercise-segment">


    <div class="exercise-data" style="display: table-row">
      <div class="exercise-header" style="display: table-cell; border: 1px solid red;">
        <h4 class="ui header">{{exercise.info.name | uppercase}}</h4>
      </div>

      <div class="ui statistic" style="display: table-cell;  border: 1px solid red">
        <div class="value">
          4
        </div>
        <div class="label">
          SETS
        </div>
      </div>
    </div>

    <canvas :id="elementId"></canvas>

  </div>
</template>

<script>
  import Chart from 'chart.js';
  import exercisesStore from '../../store/exercises';
  import musclesStore from '../../store/muscles';

  export default {
    name: 'ExerciseCircular',
    props: ['exerciseKey', 'maxWidth', 'maxHeight'],
    data() {
      return {
        elementId: Math.random(),
        musclesState: musclesStore.state,
        exercise: exercisesStore.getExercise(this.exerciseKey)
      }
    },
    mounted() {
      // resize
      $(this.$el).css({
        maxWidth: this.maxWidth,
        maxHeight: this.maxHeight
      });

      // prepare the data for chart.js
      let labels = [];
      let data = [];
      let colors = [];
      _.forOwn(this.exercise.musclesUsed, (value, key) => {
        data.push(value);
        let muscleInfo = musclesStore.getMuscle(key).info;
        labels.push(muscleInfo.broName);
        colors.push(muscleInfo.color);
      });

      console.log(labels);
      console.log(data);


      let ctx = document.getElementById(this.elementId);
      let chart = new Chart(ctx, {
        type: 'doughnut',
        responsive: true,
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: colors
            }]
        },
        options: {
          cutoutPercentage: 80,
          responsive: true,
          tooltips: {
            enabled: true,
            caretSize: 0,
            callbacks: {
              label: function(tooltipItems, data) {
                console.log(arguments);
                return data.labels[tooltipItems.index];
              }
            }
          },
          legend: {
            display: false
          }
        }
      });

    }
  }
</script>

<style>
  .exercise-segment {
    display: inline-block;
    padding: 4px !important;
  }

  .exercise-data {
    border: 1px solid red;
    position: absolute;
    display: inline-block;
    max-width: 70%;
    max-height: 50px;
    margin: 0 auto;
    text-align: center;
  }
</style>