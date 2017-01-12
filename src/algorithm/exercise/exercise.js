import _ from 'lodash';

export default class Exercise {
  constructor(name, mainMuscleGroup, image, type, musclesUsed) {
    this.name = name;
    this.mainMuscleGroup = mainMuscleGroup;
    this.image = image;
    this.type = type;
    this.musclesUsed = musclesUsed;
  }

  get musclesUsed() {
    return this._musclesUsed;
  }

  set musclesUsed(value) {
    let sum = 0;
    _.forOwn(value, (muscle) => {
      sum += muscle.percentage;
    });

    if (sum > 100) {
      throw new Error('Invalid muscles percentage sum!');
    }

    this._musclesUsed = value;
  }

  static getPossibleTypes() {
    return {
      isolation: 'isolation',
      compound: 'compound'
    }
  }
};