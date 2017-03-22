<template>
  <div class="ui segment secondary exercise-circlular">
    <div class="exercise-circular-container">


      <button class="ui icon button basic black exercise-details-button">
        <i class="icon settings"></i>
      </button>

      <div v-if="type === 'tweaker'" class="ui mini basic icon buttons exercise-sets-buttons">
        <button class="ui button"><i class="plus icon"></i></button>
        <button class="ui button"><i class="minus icon"></i></button>
      </div>

      <button v-if="type === 'workout'" class="mini ui button basic exercise-go-button">
        START
      </button>

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
    props: ['exerciseKey', 'setsCount', 'type'],
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

    }
  }
</script>

<style>
  .exercise-circlular {
    display: inline-block;
    width: 200px;
    height: 200px;
    padding: 3px !important;
  }

  .exercise-canvas {
    z-index: 99;
  }

  .exercise-circular-container {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .exercise-data-container {
    margin: auto;
    width: 60%;
    position: absolute;
    text-align: center;
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

  .exercise-sets-buttons {
    position: absolute;
    z-index: 999;
    bottom: 17%;
  }
  .exercise-sets-buttons .button {
    text-align: center;
    padding: 6px 4px 6px 10px !important;
  }

  .exercise-go-button {
    position: absolute;
    z-index: 999;
    bottom: 18%;
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