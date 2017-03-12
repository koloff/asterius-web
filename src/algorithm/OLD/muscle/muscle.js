module.exports = class {
  constructor(name, broName, key, muscleGroup, mrv) {
    this.name = name;
    this.broName = broName;
    this.key = key;
    this.muscleGroup = muscleGroup;
    this.mrv = mrv;
  }

  use(percentage) {
    return {
      name: this.name,
      broName: this.broName,
      key: this.key,
      percentage: percentage
    }
  }

};