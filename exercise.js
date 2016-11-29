module.exports = class Exercise {
  constructor(name, type, difficulty, musclesUsage) {
    this.name = name;
    this.type = type;
    this.difficulty = difficulty;
    this.musclesUsage = musclesUsage;
  }

  static getPossibleDifficulties() {
    return {
      easy: 1,
      medium: 2,
      hard: 3
    }
  }

  static getPossibleTypes() {
    return {
      isolation: 1,
      compound: 2
    }
  }

  set musclesUsage(usages) {
    console.log(usages);
    let sum = 0;
    usages.forEach((obj) => {
      sum += obj[Object.keys(obj)[0]];
    });
    console.log(sum);

    if (sum > 100) {
      throw new Error('Muscles usage sum cannot exceed 100');
    }

    this._musclesUsage = usages;
  }

  get musclesUsage() {
    return this._musclesUsage;
  }

};
