import mc from '../muscle/muscles-collection'
import Exercise from './exercise'

let types = Exercise.getPossibleTypes();

export default {

  // CHEST

  //bp - bench press

  dumbbellBenchPress: new Exercise(
    'dumbbell_bp,',
    types.compound, {
      primary: [mc.chest.sternocostalHead],
      secondary: [mc.shoulders.anteriorHead, mc.triceps.longHead]
    }
  ),

  dumbbellInclineBenchPress: new Exercise(
    'dumbbell_incline_bp',
    types.compound, {
      primary: [mc.chest.sternocostalHead],
      secondary: [mc.shoulders.anteriorHead, mc.triceps.longHead]
    }
  ),

  lowCableCrossover: new Exercise(
    'low_cable_crossover',
    types.isolation, {
      primary: [mc.chest.sternocostalHead],
      secondary: [mc.shoulders.anteriorHead]
    }
  ),

  cableCrossover: new Exercise(
    'cable_crossover',
    types.isolation, {
      primary: [mc.chest.sternocostalHead],
      secondary: [mc.shoulders.anteriorHead]
    }
  ),


  //SHOULDERS

  lateralRaise: new Exercise(
    'lateral_raise',
    types.isolation, {
      primary: [mc.shoulders.lateralHead],
      secondary: [mc.shoulders.anteriorHead, mc.shoulders.posteriorHead]
    } //not sure
  ),


  dumbbellShoulderPress: new Exercise(
    'dumbbell_shoulder_press',
    types.compound, {
      primary: [mc.shoulders.anteriorHead],
      secondary: [mc.triceps.longHead]
    }
  ),

  reversePecDeck: new Exercise(
    'reverse_pec_deck',
    types.isolation, {
      primary: [mc.shoulders.posteriorHead],
      secondary: [mc.back.trapeziusUpper]
    }
  ),


  //BACK

  latPulldownWideGrip: new Exercise(
    'lat_pulldown_wide_grip',
    types.compound, {
      primary: [mc.back.latissimusDorsi],
      secondary: [mc.biceps.longHead, mc.biceps.shortHead]
    }
  ),

  cableRow: new Exercise('cable_row', types.compound, {
      primary: [mc.back.trapeziusLower],
      secondary: [mc.back.latissimusDorsi, mc.back.teresMajor]
    }
  ),

  straightArmPulldown: new Exercise(
    'straight_arm_pulldown',
    types.isolation, {
      primary: [mc.back.latissimusDorsi],
      secondary: [mc.back.trapeziusLower]
    }
  ),

  dumbbellShrug: new Exercise(
    'dumbbell_shrug',
    types.isolation, {
      primary: [mc.back.trapeziusUpper],
      secondary: [mc.back.trapeziusLower]
    }
  ),


  //ROTATOR CUFF

  cableExternalRotation: new Exercise(
    'cable_external_rotation',
    types.isolation, {
      primary: [mc.back.rotatorCuff],
      secondary: [mc.shoulders.posteriorHead]
    }
  ),


  //BICEPS

  inclineDumbbellCurl: new Exercise(
    'incline_dumbbell_curl',
    types.isolation, {
      primary: [mc.biceps.longHead],
      secondary: [mc.biceps.shortHead, mc.forearms.flexors]
    }
  ),

  // barbellCurl: new Exercise('barbell_curl', types.isolation, difficulties.easy, [
  //   mc.biceps.shortHead(45),
  //   mc.biceps.longHead(45),                     // not sure what to do
  //   mc.forearm.flexors(10)
  // ]),

  overheadCableCurl: new Exercise(
    'overhead_cable_curl',
    types.isolation, {
      primary: [mc.biceps.shortHead],
      secondary: [mc.biceps.longHead, mc.forearms.flexors]
    }
  ),


  //TRICEPS

  seatedTricepsPress: new Exercise(
    'seated_triceps_press',
    types.isolation, {
      primary: [mc.triceps.longHead],
      secondary: [mc.triceps.lateralHead]
    }
  ),

  ropePushdown: new Exercise(
    'rope_pushdown',
    types.isolation, {
      primary: [mc.triceps.lateralHead],
      secondary: [mc.triceps.longHead]
    }
  ),

  skullcrusher: new Exercise(
    'skull_crushers',
    types.isolation, {
      primary: [mc.triceps.longHead],
      secondary: [mc.triceps.lateralHead]
    }
  ),


  //ABS

  crunches: new Exercise(
    'crunches',
    types.isolation, {
      primary: [mc.abs.rectusAbdominis],
      secondary: []
    }
  ),

  twistedCrunches: new Exercise(
    'twisted_crunches',
    types.isolation, {
      primary: [mc.abs.obliques],
      secondary: [mc.abs.rectusAbdominis]
    }
  ),


  //LEGS

  barbellSquat: new Exercise(
    'barbell_squat',
    types.compound, {
      primary: [mc.legs.quardriceps],
      secondary: [mc.legs.glutes, mc.legs.hamstrings, mc.calves.calves]
    }
  ),

  legExtension: new Exercise(
    'leg_extension',
    types.isolation, {
      primary: [mc.legs.quardriceps],
      secondary: []
    }
  ),

  legCurl: new Exercise(
    'leg_curl',
    types.isolation, {
      primary: [mc.legs.glutes],
      secondary: [mc.legs.hamstrings]
    }
  ),

  smithMachineCalfRaise: new Exercise(
    'smith_machine_calf_raise',
    types.isolation, {
      primary: [mc.calves.calves],
      secondary: []
    }
  )
};