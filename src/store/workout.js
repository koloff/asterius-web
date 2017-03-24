import _ from 'lodash';

export default {
  state: {

    exercises: [
      {
        current: true,
        type: 'exercise',
        key: 'dumbbellBenchPress',
        steps: [
          {
            type: 'rest'
          }, {
            type: 'set'
          }, {
            type: 'rest'
          }, {
            type: 'set'
          }, {
            type: 'rest'
          }, {
            type: 'set'
          }
        ]
      },
      {
        current: false,
        type: 'exercise',
        key: 'lateralRaise',
        steps: [
          {
            type: 'rest'
          }, {
            type: 'set'
          }, {
            type: 'rest'
          }, {
            type: 'set'
          }
        ]
      },
      {
        current: false,
        type: 'exercise',
        key: 'lateralRaise',
        steps: [
          {
            type: 'rest'
          }, {
            type: 'set'
          }
        ]
      }
    ]

  },

  getCurrentExercise() {
    return _.find(this.state.exercises, {current: true});
  },

  getSetsCount(exercise) {
    return _.filter(exercise.steps, (step) => {
      if (step.type === 'set') return step;
    }).length;
  },

  setAsCurrent(exercise) {
    let currentNow = this.getCurrentExercise();
    currentNow.current = false;
    exercise.current = true;
  },

}