<template>
  <div class="ui segment secondary sets-selector">

    <h2 class="ui header  centered" style="margin-bottom: 5px">
      SET {{currentWorkoutState.currentSetIndex + 1}}
      <div class="sub header">
        RECORD YOUR REPS AND WEIGHT:
      </div>
    </h2>

    <!--<span @click="focusOnTarget()" class="ui left corner label blue" style="cursor: pointer">-->
    <!--<i class="crosshairs icon"></i>-->
    <!--</span>-->

    <div class="sets-selector-container">
      <div v-for="row in grid" class="selector-row">
        <div
          v-for="col in row"
          @click="cellClicked(col)"
          :class="getCellType(col)"
          class="set-cell selector-col">

          <div class="reps-label">{{col.reps}}x</div>
          <div class="weight-label">{{col.weight}}</div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import 'jquery.scrollto';
  import currentWorkoutStore from '../../store/current-workout';
  import workoutStore from '../../store/workout';

  export default {
    name: 'SetsSelector',
    data() {
      return {
        grid: [],
        currentWorkoutState: currentWorkoutStore.state,
        workoutState: workoutStore.state
      }
    },
    mounted() {
      let beginningReps = 1;
      let endReps = 20;

      let weightStep = 2.5;
      let beginningWeight = 2.5;
      let endWeight = 130;

      for (let row = endWeight; row >= beginningWeight; row -= weightStep) {
        let rowToAdd = [];
        for (let col = beginningReps; col <= endReps; col++) {
          rowToAdd.push({
            weight: row,
            reps: col
          })
        }

        this.grid.push(rowToAdd);
      }


      this.focusOnTarget();

    },
    computed: {
      estimatedValues() {
        this.focusOnTarget();
        return currentWorkoutStore.getCurrentSet().estimatedValues;
      },
      performedValue() {
        this.focusOnTarget();
        return currentWorkoutStore.getCurrentSet().performedValue;
      },
    },
    methods: {

      getCellType(col) {
        let cellType = '';

        if (this.estimatedValues) {
          this.estimatedValues.forEach((estimatedSet) => {
            if (estimatedSet.reps === col.reps && estimatedSet.weight === col.weight) {
              cellType = 'type-' + estimatedSet.type;
            }
          });
        }

        if (this.performedValue && this.performedValue.reps === col.reps && this.performedValue.weight === col.weight) {
          cellType += ' performed';
        }

        return cellType;
      },

      cellClicked(col) {
        currentWorkoutStore.recordCurrentSet(col.reps, col.weight)
      },

      focusOnTarget() {
        this.$nextTick(() => {

          let $container = $('.sets-selector-container');
          let $el = $('.type-1');


          $container.scrollTo($el, 300, {
            offset: function() {
              return {
                top: -($container.height() - $el.height()) / 2,
                left: -($container.width() - $el.width()) / 2
              };
            }
          });
        })
      }

    }
  }
</script>

<style>
  .sets-selector {
    text-align: center;
    padding: 14px 10px 10px 14px;
  }

  .selector-row {
    display: table-row;
  }

  .selector-col {
    display: table-cell;
  }

  .sets-selector-container {
    background: #fff;
    display: inline-block;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    max-height: 200px;
    max-width: 100%;
    overflow-y: scroll;
    overflow-x: scroll;
  }

  .set-cell {
    box-sizing: border-box;
    border: 1px solid black;
    vertical-align: middle;
    min-width: 47px;
    min-height: 47px;
    width: 47px;
    height: 47px;
    cursor: pointer;
    text-align: center;
  }

  .reps-label {
    position: relative;

  }

  .weight-label {
    position: relative;
    font-weight: bold;
  }

  .set-cell.performed {
    border: 4px solid orange;
  }

  .set-cell.type-1 {
    background: rgb(9, 167, 7);
  }

  .set-cell.type-2 {
    background: rgba(47, 156, 0, 0.29);
  }
</style>