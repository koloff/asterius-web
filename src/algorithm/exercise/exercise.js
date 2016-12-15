export default class Exercise {
  constructor(name, type, musclesUsed) {
    this.name = name;
    this.type = type;
    this.musclesUsed = musclesUsed;
  }

  static getPossibleDifficulties() {
    return {
      easy: 'easy',
      medium: 'medium',
      hard: 'hard'
    }
  }

  static getPossibleTypes() {
    return {
      isolation: 'isolation',
      compound: 'compound'
    }
  }

  calculateVolume(sets, reps) {
    console.log('primaries: ');

    this.muscleUsed.primary.forEach((muscle) => {
      console.log(muscle);
    });

    console.log('secondaries: ');

    this.muscleUsed.secondary.forEach((muscle) => {
      console.log(muscle);
    });

  }

};
