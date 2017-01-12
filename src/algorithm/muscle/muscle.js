export default class Muscle {
  constructor(name, broName, mrv, image) {
    this.name = name;
    this.broName = broName;
    this.mrv = mrv;
    this.image = image;
  }


  use(percentage) {
    return {
      name: this.name,
      broName: this.broName,
      percentage: percentage
    }
  }

};