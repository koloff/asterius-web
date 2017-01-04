export default class Exercise {
  constructor(name, type, musclesUsed) {
    this.name = name;
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
