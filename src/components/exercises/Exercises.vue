<template>
  <div>
    <h1 class="ui header inverted centered" style="margin-top: 15px;">
      <i class="ui icon line chart"></i>EXERCISES</h1>

    <div class="ui grid stackable center aligned">
      <div class="column twelve wide center aligned">


        <div class="ui form">
          <div class="ui two fields">

            <div class="field">
              <div class="ui search selection dropdown fluid select-exercise-dropdown">
                <input type="hidden" name="exercise">
                <i class="dropdown icon"></i>
                <div class="default text">Select Exercise</div>
                <div class="menu">
                  <div v-for="exercise in exercisesState.ec.exercises" :data-value="exercise.key" class="item">
                    {{exercise.info.name}}
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="ui search selection dropdown fluid select-month-dropdown">
                <input type="hidden" name="month">
                <i class="dropdown icon"></i>
                <div class="default text">Select Month</div>
                <div class="menu">
                  <div v-for="month in months" :data-value="month" class="item">
                    {{month}}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <h4 v-show="hasWorkouts" class="ui header inverted centered">
          OVERALL VOLUME
          <div class="sub header">SETS x REPS x WEIGHT</div>
        </h4>
        <canvas v-show="hasWorkouts" id="exercise-chart" width="400" height="400" style="margin-top: 15px;"></canvas>


        <div v-show="!hasWorkouts">
          <h4 class="ui header inverted centered">
            NOT PERFORMED THAT MONTH
            <div class="sub header">
              Please select another exercise.
            </div>
          </h4>
        </div>


      </div>
    </div>

  </div>
</template>

<script>
  import _ from 'lodash';
  import moment from 'moment';
  import exercisesStore from '../../store/exercises';
  import authStore from '../../store/auth';


  import database from '../../database';


  export default {
    name: 'Exercises',
    data() {
      return {
        exercisesState: exercisesStore.state,
        exerciseKey: '',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        selectedMonth: '',
        hasWorkouts: false
      }
    },
    mounted() {
      this.selectedMonth = this.months[moment().month()];
      this.exerciseKey = 'dumbbellBenchPress';

      $('.select-month-dropdown')
        .dropdown({
          onChange: (value, text, $choice) => {
            this.selectedMonth = value;
            this.initChart();
          }
        })
        .dropdown('set selected', this.selectedMonth);

      $('.select-exercise-dropdown').dropdown({
        onChange: (value, text, $choice) => {
          this.exerciseKey = value;
          this.initChart();
        }
      })
        .dropdown('set selected', this.exerciseKey);
    },
    methods: {
      async initChart() {
        let workouts;
        // todo
        if (!this.exerciseKey || this.selectedMonth !== 'May') {
          this.hasWorkouts = false;
          return;
        } else {
          // get all performed values of the exercise
          workouts = await database.get(`/exercises/${authStore.state.uid}/${this.exerciseKey}`);
          if (!workouts) {
            this.hasWorkouts = false;
            return;
          }
        }
        this.hasWorkouts = true;

        // generate chart data
        let currentMinVolume = 99999;
        let currentMaxVolume = 0;

        let downloadedData = [];
        let dataset = [];

        let workoutsArr = [];
        console.log(workouts);
        _.forOwn(workouts, (index, date) => {
          workoutsArr.push({date: date, exerciseIndex: index})
        });
        for (let workout of workoutsArr) {
          let sets = await database.get(`/workouts/${authStore.state.uid}/${workout.date}/exercises/${workout.exerciseIndex}/sets`);
          if (sets) {
            let text = '';
            let volume = 0;
            sets.forEach((set) => {
              if (set.performedValue) {
                text += ` ${set.performedValue.reps}x${set.performedValue.weight} +`;
                volume += set.performedValue.reps * set.performedValue.weight;
              }
            });
            text = text.slice(0, text.length - 1);
            if (volume < currentMinVolume) {
              currentMinVolume = volume;
            }
            if (volume > currentMaxVolume) {
              currentMaxVolume = volume;
            }
            downloadedData.push({
              date: workout.date,
              text: text,
              volume: volume
            });
            dataset.push({
              x: moment(workout.date, 'YYYY-MM-DD'),
              y: volume
            })
          }
        }
        console.log(currentMinVolume, currentMaxVolume);


        let ctx = document.getElementById(`exercise-chart`);
        let scatterChart = new Chart(ctx, {
          type: 'line',
          data: {
            datasets: [{
              showLine: true,
              showLabel: false,
              pointRadius: 5,
              pointHoverRadius: 7,
              pointBackgroundColor: `rgba(75,192,192,1)`,
              borderColor: `rgba(75,192,192,1)`,
              data: dataset,
            }]
          },
          options: {
            responsive: true,
            tooltips: {
              displayColors: false,
              callbacks: {
                label(item, data) {
                  return downloadedData[item.index].text + `= ${downloadedData[item.index].volume}`;
                }
              }
            },
            legend: {
              display: false
            },
            layout: {
              padding: 15
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  unit: 'month',
                  displayFormat: 'D MMMM',
                  tooltipFormat: 'D MMMM',
                }
              }],
              yAxes: [{
                type: 'linear',
                ticks: {
                  min: currentMinVolume * 0.7,
                  max: currentMaxVolume * 1.3,
                  display: false
                }
              }]
            }
          }
        });
      }
    }
  }
</script>a