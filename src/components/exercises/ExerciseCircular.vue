<template>
  <div
    class="ui segment circular exercise-circular"
    :class="{secondary: !isCurrent}"
  >
    <div class="exercise-circular-container">


      <!--<button class="ui icon button basic black exercises-details-button">-->
      <!--<i class="icon settings"></i>-->
      <!--</button>-->


      <!--this will show a select button or a +- buttons depending on the parent (workout/tweaker) -->
      <slot></slot>


      <div class="exercise-data-container">
        <div class="exercise-data-wrapper">
          <div class="exercise-data">


            <div class="exercise-header">
              <h5 class="ui header">{{exercise.info.name | uppercase}}</h5>
            </div>

            <div class="exercise-statistics">
              <div class="ui statistic small">
                <div class="value">
                  {{setsCount}}
                </div>
                <div class="label">
                  SET{{`${setsCount > 1 ? 'S' : ''}`}}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      <canvas class="exercise-canvas" :id="elementId"></canvas>

    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import exercisesStore from '../../store/exercises';
  import musclesStore from '../../store/muscles';

  export default {
    name: 'ExerciseCircular',
    props: ['exerciseKey', 'setsCount', 'isCurrent'],
    data() {
      return {
        elementId: Math.random(),
        musclesState: musclesStore.state,
        exercise: exercisesStore.getExercise(this.exerciseKey)
      }
    },
    mounted() {
      // resize


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


      Chart.Tooltip.positioners.cursor = function(chartElements, coordinates) {
        return coordinates;
      };
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
            position: 'cursor',
            callbacks: {
              label: function(tooltipItems, data) {
                return data.labels[tooltipItems.index];
              }
            }
          },
          legend: {
            display: false
          }
        }
      });

    },
    methods: {}
  }
</script>

<style>
  .exercise-circular {
    display: inline-block;
    padding: 4px !important;
    margin: 0 !important;
  }

  .exercise-canvas {
    /*z-index: 99;*/
  }

  .exercise-circular-container {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .exercise-data-container {
    /* There is a bug in firefox for flex inside flex.
     * https://github.com/philipwalton/flexbugs#10-align-items-baseline-doesnt-work-with-nested-flex-containers
     * TODO fix nested flexbox bug in firefox
    */
    position: absolute;
    width: 60%;
  }

  .exercise-data-wrapper {
    display: inline-block;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  .exercise-data {
    display: flex;
    position: relative;
  }

  .exercise-header {
    white-space: normal;
    padding-right: 5px;
    text-align: right;
    margin: auto;
    flex: 1;
  }

  .exercise-statistics {
    border-left: 1px solid rgba(0, 0, 0, 0.4);
    padding-left: 5px;
    margin: auto;
  }

  .exercise-details-button {
    position: absolute;
    z-index: 999;
    top: 17%;
  }

  .exercise-details-button .ui.basic.black.buttons .button, .ui.basic.black.button {
    box-shadow: none !important;
  }


</style>