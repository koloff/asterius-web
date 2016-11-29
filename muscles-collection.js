const Muscle = require('./muscle');

let sizes = Muscle.getPossibleSizes();

/*
 * DISCLAIMER
 * some muscles are grouped based on function or type of exercises that train them
 * some muscles are not included because they are trained together with some of the muscles below
 * muscle sizes are not accurate but this classification is enough for designing the training
 */
module.exports = {

  shoulderAnteriorHead: new Muscle('shoulder_anterior_head', sizes.medium),
  shoulderLateralHead: new Muscle('shoulder_lateral_head', sizes.medium),
  shoulderPosteriorHead: new Muscle('shoulder_posterior_head', sizes.medium),

  chestClavicularHead: new Muscle('chest_clavicular_head', sizes.medium),
  chestSternocostalHead: new Muscle('chest_sternocostal_head', sizes.medium),

  trapeziusUpper: new Muscle('trapezius_upper', sizes.medium),
  trapeziusLower: new Muscle('trapezius_lower', sizes.big),
  latissimusDorsi: new Muscle('latissimus_dorsi', sizes.big),
  teresMajor: new Muscle('teres_major', sizes.medium),
  rotatorCuff: new Muscle('rotator_cuff', sizes.medium),

  rectusAbdominis: new Muscle('rectus_abdominis', sizes.big),
  obliques: new Muscle('obliques', sizes.medium),

  bicepsLongHead: new Muscle('biceps_long_head', sizes.medium),
  bicepsShortHead: new Muscle('biceps_short_head', sizes.medium),

  tricepsLongHead: new Muscle('triceps_long_head', sizes.medium),
  tricepsLateralHead: new Muscle('triceps_lateral_head', sizes.medium),

  brachioradialis: new Muscle('brachioradialis', sizes.small),
  flexors: new Muscle('flexors', sizes.small),
  extensors: new Muscle('extensors', sizes.small),

  glutes: new Muscle('glutes', sizes.big),

  quardriceps: new Muscle('quadriceps', sizes.big),
  hamstrings: new Muscle('hamstrings', sizes.big),

  calves: new Muscle('calves', sizes.medium)

};