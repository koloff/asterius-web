export default class Muscle {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

  static getPossibleSizes() {
    return {
      small: 'small',
      medium: 'medium',
      big: 'big'
    }
  };

  use(percentage) {
    return {
      [this.name]: percentage
    }
  }

};