export default class Muscle {
  constructor(name, broName, mrv) {
    this.name = name;
    this.broName = broName;
    this.mrv = mrv;
  }


  use(percentage) {
    return {
      name: this.name,
      broName: this.broName,
      percentage: percentage
    }
  }

};