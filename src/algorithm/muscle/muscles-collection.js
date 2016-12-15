import Muscle from './muscle';

let sizes = Muscle.getPossibleSizes();

/*
 * DISCLAIMER
 * some muscles are grouped based on function or type of exercises that train them
 * some muscles are not included because they are trained together with some of the muscles below
 * muscle sizes are not accurate but this classification is enough for designing the training
 */
export default {
  shoulders: {
    name: 'shoulders',
    mrv: 18,
    anteriorHead: new Muscle('shoulder_anterior_head', sizes.medium),
    lateralHead: new Muscle('shoulder_lateral_head', sizes.medium),
    posteriorHead: new Muscle('shoulder_posterior_head', sizes.medium)
  },

  chest: {
    name: 'chest',
    mrv: 18,
    clavicularHead: new Muscle('chest_clavicular_head', sizes.medium),
    sternocostalHead: new Muscle('chest_sternocostal_head', sizes.medium)
  },

  back: {
    name: 'back',
    mrv: 21,
    trapeziusUpper: new Muscle('trapezius_upper', sizes.medium),
    trapeziusLower: new Muscle('trapezius_lower', sizes.big),
    latissimusDorsi: new Muscle('latissimus_dorsi', sizes.big),
    teresMajor: new Muscle('teres_major', sizes.medium),
    rotatorCuff: new Muscle('rotator_cuff', sizes.medium)
  },

  abs: {
    name: 'abs',
    mrv: 10,
    rectusAbdominis: new Muscle('rectus_abdominis', sizes.medium),
    obliques: new Muscle('obliques', sizes.medium)
  },

  biceps: {
    name: 'biceps',
    mrv: 15,
    longHead: new Muscle('biceps_long_head', sizes.medium),
    shortHead: new Muscle('biceps_short_head', sizes.medium)
  },

  triceps: {
    name: 'triceps',
    mrv: 18,
    longHead: new Muscle('triceps_long_head', sizes.medium),
    lateralHead: new Muscle('triceps_lateral_head', sizes.medium)
  },

  forearms: {
    name: 'forearms',
    mrv: 8,
    brachioradialis: new Muscle('brachioradialis', sizes.small),
    flexors: new Muscle('flexors', sizes.small),
    extensors: new Muscle('extensors', sizes.small)
  },

  legs: {
    name: 'legs',
    mrv: 18,
    quardriceps: new Muscle('quadriceps', sizes.big),
    hamstrings: new Muscle('hamstrings', sizes.big),
    glutes: new Muscle('glutes', sizes.big),
  },

  calves: {
    name: 'calves',
    mrv: 6,
    calves: new Muscle('calves', sizes.medium)
  }

};