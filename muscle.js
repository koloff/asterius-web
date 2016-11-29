module.exports = class Muscle {
  constructor(name, size) {
    this.name = name;
  }

  static getPossibleSizes() {
    return {
      small: 1,
      medium: 2,
      big: 3
    }
  };

  use(percentage) {
    console.log(this.name);
    return {
      [this.name]: percentage
    }
  }
};