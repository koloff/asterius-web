import mc from '../muscle/muscles-collection'
import Exercise from './exercise'

let types = Exercise.getPossibleTypes();

// export default {
//
//   // CHEST
//
//   //bp - bench press
//
//   dumbbellBenchPress: new Exercise(
//     'dumbbell_bp',
//     types.compound, [
//       mc.chest.sternalHead.use(70),
//       mc.shoulders.posteriorHead.use(15),
//       mc.triceps.longHead.use(15)
//     ]
//   ),
//
//   dumbbellInclineBenchPress: new Exercise(
//     'dumbbell_incline_bp',
//     types.compound, [
//       mc.chest.clavicularHead.use(70),
//       mc.shoulders.anteriorHead.use(20),
//       mc.triceps.longHead.use(10)
//     ]
//   ),
//
//   lowCableCrossover: new Exercise(
//     'low_cable_crossover',
//     types.isolation, [
//       mc.chest.sternalHead.use(80),
//       mc.shoulders.anteriorHead.use(20)
//     ]
//   ),
//
//   cableCrossover: new Exercise(
//     'cable_crossover',
//     types.isolation, [
//       mc.chest.clavicularHead.use(70),
//       mc.shoulders.anteriorHead.use(30)
//     ]
//   ),
//
//
//   //SHOULDERS
//
//   lateralRaise: new Exercise(
//     'lateral_raise',
//     types.isolation, [
//       mc.shoulders.lateralHead.use(80),
//       mc.shoulders.anteriorHead.use(10),
//       mc.shoulders.posteriorHead.use(10)
//     ]
//   ),
//
//
//   dumbbellShoulderPress: new Exercise(
//     'dumbbell_shoulder_press',
//     types.compound, [
//       mc.shoulders.anteriorHead.use(80),
//       mc.triceps.longHead.use(20)
//     ]
//   ),
//
//   reversePecDeck: new Exercise(
//     'reverse_pec_deck',
//     types.isolation, [
//       mc.shoulders.posteriorHead.use(80),
//       mc.back.trapeziusUpper.use(20)
//     ]
//   ),
//
//
//   //BACK
//
//   latPulldownWideGrip: new Exercise(
//     'lat_pulldown_wide_grip',
//     types.compound, [
//       mc.back.latissimusDorsi.use(70),
//       mc.biceps.longHead.use(15),
//       mc.biceps.shortHead.use(15)
//     ]
//   ),
//
//   cableRow: new Exercise(
//     'cable_row',
//     types.compound, [
//       mc.back.trapeziusLower.use(50),
//       mc.back.latissimusDorsi.use(25),
//       mc.back.teresMajor.use(25)
//     ]
//   ),
//
//   straightArmPulldown: new Exercise(
//     'straight_arm_pulldown',
//     types.isolation, [
//       mc.back.latissimusDorsi.use(70),
//       mc.back.trapeziusLower.use(30)
//     ]
//   ),
//
//   dumbbellShrug: new Exercise(
//     'dumbbell_shrug',
//     types.isolation, [
//       mc.back.trapeziusUpper.use(70),
//       mc.back.trapeziusLower.use(30)
//     ]
//   ),
//
//
//   //ROTATOR CUFF
//
//   cableExternalRotation: new Exercise(
//     'cable_external_rotation',
//     types.isolation, [
//       mc.back.rotatorCuff.use(80),
//       mc.shoulders.posteriorHead.use(20)
//     ]
//   ),
//
//
//   //BICEPS
//
//   inclineDumbbellCurl: new Exercise(
//     'incline_dumbbell_curl',
//     types.isolation, [
//       mc.biceps.longHead.use(70),
//       mc.biceps.shortHead.use(15),
//       mc.forearms.flexors.use(15)
//     ]),
//
//   barbellCurl: new Exercise(
//     'barbell_curl',
//     types.isolation, [
//       mc.biceps.shortHead.use(45),
//       mc.biceps.longHead.use(45),
//       mc.forearms.flexors.use(10)
//     ]),
//
//   overheadCableCurl: new Exercise(
//     'overhead_cable_curl',
//     types.isolation, [
//       mc.biceps.shortHead.use(70),
//       mc.biceps.longHead.use(15),
//       mc.forearms.flexors.use(15)
//     ]),
//
//
//   //TRICEPS
//
//   seatedTricepsPress: new Exercise(
//     'seated_triceps_press',
//     types.isolation, [
//       mc.triceps.longHead.use(80),
//       mc.triceps.lateralHead.use(20)
//     ]),
//
//   ropePushdown: new Exercise(
//     'rope_pushdown',
//     types.isolation, [
//       mc.triceps.lateralHead.use(80),
//       mc.triceps.longHead.use(20)
//     ]),
//
//   skullCrushers: new Exercise(
//     'skull_crushers',
//     types.isolation, [
//       mc.triceps.longHead.use(70),
//       mc.triceps.lateralHead.use(30)
//     ]),
//
//
//   //ABS
//
//   crunches: new Exercise(
//     'crunches',
//     types.isolation, [
//       mc.abs.rectusAbdominis.use(100)
//     ]),
//
//   twistedCrunches: new Exercise(
//     'twisted_crunches',
//     types.isolation, [
//       mc.abs.obliques.use(80),
//       mc.abs.rectusAbdominis.use(20)
//     ]),
//
//
//   //LEGS
//
//   barbellSquat: new Exercise(
//     'barbell_squat',
//     types.compound, [
//       mc.legs.quardriceps.use(60),
//       mc.legs.glutes.use(20),
//       mc.legs.hamstrings.use(10),
//       mc.calves.calves.use(10)
//     ]),
//
//   legExtension: new Exercise(
//     'leg_extension',
//     types.isolation, [
//       mc.legs.quardriceps.use(100)
//     ]),
//
//   legCurl: new Exercise(
//     'leg_curl',
//     types.isolation, [
//       mc.legs.hamstrings.use(80),
//       mc.legs.glutes.use(20)
//     ]),
//
//   smithMachineCalfRaise: new Exercise(
//     'smith_machine_calf_raise',
//     types.isolation, [
//       mc.calves.calves.use(100)
//     ])
// };