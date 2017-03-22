<template>
  <div class="ui segment secondary sets-selector">


    <span @click="focusOnTarget()" class="ui left corner label blue" style="cursor: pointer">
      <i class="crosshairs icon"></i>
    </span>

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

  export default {
    name: 'SetsSelector',
    data() {
      return {
        grid: [],
        appropriateSets: [
          {
            type: 'target',
            cells: [
              {
                reps: 8,
                weight: 70
              }
            ]
          },
          {
            type: 'good',
            cells: [
              {
                reps: 7,
                weight: 72.5
              },
              {
                reps: 7,
                weight: 70
              }, {
                reps: 10,
                weight: 67.5
              },
            ]
          },

        ]
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
    methods: {

      cellClicked(col) {
        console.log(col);
      },

      getCellType(col) {
        let cellType = '';

        this.appropriateSets.forEach((appropriateCells) => {
          appropriateCells.cells.forEach((appropriateCell) => {
            if (appropriateCell.reps === col.reps && appropriateCell.weight === col.weight) {
              cellType = appropriateCells.type;
            }
          })
        });

        return cellType;
      },

      focusOnTarget() {
        this.$nextTick(() => {

          let $container = $('.sets-selector-container');
          let $el = $('.target');


          $container.scrollTo($el, 800, {
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
    display: inline-block;
    border-radius: 4px;
    max-height: 200px;
    max-width: 100%;
    overflow-y: scroll;
    overflow-x: scroll;
  }

  .set-cell {
    box-sizing: border-box;
    border: 1px solid black;
    min-width: 45px;
    width: 45px;
    max-width: 45px;
    min-height: 45px;
    height: 45px;
    max-height: 45px;
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

  .set-cell.target {
    background: rgb(9, 167, 7);
  }

  .set-cell.good {
    background: rgba(47, 156, 0, 0.29);
  }
</style>