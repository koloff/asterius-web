module.exports = class {
  constructor(name, mainMuscleGroup, key, type, musclesUsed) {
    this.name = name;
    this.mainMuscleGroup = mainMuscleGroup;
    this.key = key;
    this.type = type;
    this.musclesUsed = musclesUsed;
  }

  static getPossibleTypes() {
    return {
      isolation: 'isolation',
      compound: 'compound'
    }
  }
};