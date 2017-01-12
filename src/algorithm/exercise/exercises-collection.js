import _ from 'lodash';
import {mc} from '../muscle/muscles-collection'
import Exercise from './exercise'

let types = Exercise.getPossibleTypes();


export function getExercise(exName) {
  return _.chain(ec)
    .values()
    .find({name: exName})
    .value();
}

export let ec = {
  // CHEST

  //bp - bench press

  dumbbellBenchPress: new Exercise(
    'Dumbbell Bench Press',
    'Chest',
    require('../../assets/exercises/Chest/Dumbbell Bench Press/2.jpg'),
    types.compound, [
      mc.chest.parts.sternalHead.use(50),
      mc.chest.parts.clavicularHead.use(20),
      mc.shoulders.parts.anteriorHead.use(15),
      mc.triceps.parts.tricepsLongHead.use(10),
      mc.triceps.parts.tricepsShortHead.use(5),
    ]
  ),

  dumbbellInclineBenchPress: new Exercise(
    'Dumbbell Incline Bench Press',
    'Chest',
    require('../../assets/exercises/Chest/Incline Dumbbell Bench Press/1.jpg'),
    types.compound, [
      mc.chest.parts.sternalHead.use(20),
      mc.chest.parts.clavicularHead.use(40),
      mc.shoulders.parts.anteriorHead.use(25),
      mc.triceps.parts.tricepsLongHead.use(8),
      mc.triceps.parts.tricepsShortHead.use(7),
    ]
  ),

  lowCableCrossover: new Exercise(
    'Low cable crossover',
    'Chest',
    require('../../assets/exercises/Chest/Low Cable Crossover/2.jpg'),
    types.isolation, [
      mc.chest.parts.sternalHead.use(70),
      mc.chest.parts.clavicularHead.use(10),
      mc.shoulders.parts.anteriorHead.use(20)
    ]
  ),

  cableCrossover: new Exercise(
    'Cable crossover',
    'Chest',
    require('../../assets/exercises/Chest/Cable Crossover/2.jpg'),
    types.isolation, [
      mc.chest.parts.clavicularHead.use(60),
      mc.chest.parts.sternalHead.use(20),
      mc.shoulders.parts.anteriorHead.use(20)
    ]
  ),


  //SHOULDERS

  lateralRaise: new Exercise(
    'Lateral raises',
    'Shoulders',
    require('../../assets/exercises/Shoulders/Lateral Raise/2.jpg'),
    types.isolation, [
      mc.shoulders.parts.lateralHead.use(80),
      mc.shoulders.parts.anteriorHead.use(10),
      mc.shoulders.parts.posteriorHead.use(10)
    ]
  ),


  dumbbellShoulderPress: new Exercise(
    'Dumbbell shoulder press',
    'Shoulders',
    require('../../assets/exercises/Shoulders/Dumbbell Shoulder Press/2.jpg'),
    types.compound, [
      mc.shoulders.parts.anteriorHead.use(80),
      mc.triceps.parts.tricepsLongHead.use(10),
      mc.triceps.parts.tricepsShortHead.use(10)
    ]
  ),

  reversePecDeck: new Exercise(
    'Reverse pec deck',
    'Shoulders',
    require('../../assets/exercises/Shoulders/Reverse Pec Deck/2.jpg'),
    types.isolation, [
      mc.shoulders.parts.posteriorHead.use(80),
      mc.back.parts.upperTrapezius.use(20)
    ]
  ),


  //BACK

  latPulldownWideGrip: new Exercise(
    'Lat pulldown wide grip',
    'Back',
    require('../../assets/exercises/Back/Lat Pulldown Wide Grip/2.jpg'),
    types.compound, [
      mc.back.parts.lats.use(60),
      mc.biceps.parts.bicepsLongHead.use(15),
      mc.biceps.parts.bicepsLongHead.use(15),
      mc.shoulders.parts.posteriorHead.use(10)
    ]
  ),
  //
  // cableRow: new Exercise(
  //   'Cable row',
  //   'Back',
  //   require('../../assets/exercises/Back/Cable Row/2.jpg'),
  //   types.compound, [
  //     mc.back.parts.middleBack.use(55),
  //     mc.back.parts.lats.use(20),
  //     mc.biceps.parts.bicepsLongHead.use(15),
  //     mc.biceps.parts.bicepsShortHead.use(10)
  //   ]
  // ),
  //
  // straightArmPulldown: new Exercise(
  //   'Straight arm pulldown',
  //   'Back',
  //   types.isolation, [
  //     mc.back.parts.lats.use(70),
  //     mc.back.parts.middleBack.use(20),
  //     mc.shoulders.parts.posteriorHead.use(10)
  //   ]
  // ),
  //
  // dumbbellShrug: new Exercise(
  //   'Dumbbell shrug',
  //   'Back',
  //   types.isolation, [
  //     mc.back.parts.upperTrapezius.use(80),
  //     mc.back.parts.middleBack.use(20)
  //   ]
  // ),
  //
  //
  // //ROTATOR CUFF
  //
  // cableExternalRotation: new Exercise(
  //   'Cable external rotation',
  //   'Back',
  //   types.isolation, [
  //     mc.back.parts.rotatorCuff.use(80),
  //     mc.shoulders.parts.posteriorHead.use(20)
  //   ]
  // ),
  //
  //
  // //BICEPS
  //
  // inclineDumbbellCurl: new Exercise(
  //   'Incline dumbbell curl',
  //   'Biceps',
  //   types.isolation, [
  //     mc.biceps.parts.bicepsLongHead.use(65),
  //     mc.biceps.parts.bicepsShortHead.use(20),
  //     mc.forearms.parts.flexors.use(15)
  //   ]),
  //
  // barbellCurl: new Exercise(
  //   'Barbell curl',
  //   'Biceps',
  //   types.isolation, [
  //     mc.biceps.parts.bicepsShortHead.use(45),
  //     mc.biceps.parts.bicepsShortHead.use(45),
  //     mc.forearms.parts.flexors.use(10)
  //   ]),
  //
  // overheadCableCurl: new Exercise(
  //   'Overhead cable curl',
  //   'Biceps',
  //   types.isolation, [
  //     mc.biceps.parts.bicepsShortHead.use(65),
  //     mc.biceps.parts.bicepsLongHead.use(20),
  //     mc.forearms.parts.flexors.use(15)
  //   ]),
  //
  //
  // //TRICEPS
  //
  // seatedTricepsPress: new Exercise(
  //   'Seated riceps press',
  //   'Triceps',
  //   types.isolation, [
  //     mc.triceps.parts.tricepsLongHead.use(80),
  //     mc.triceps.parts.tricepsShortHead.use(20)
  //   ]),
  //
  // ropePushdown: new Exercise(
  //   'Rope pushdown',
  //   'Triceps',
  //   types.isolation, [
  //     mc.triceps.parts.tricepsShortHead.use(80),
  //     mc.triceps.parts.tricepsLongHead.use(20)
  //   ]),
  //
  // skullCrushers: new Exercise(
  //   'Skull crushers',
  //   'Triceps',
  //   types.isolation, [
  //     mc.triceps.parts.tricepsLongHead.use(70),
  //     mc.triceps.parts.tricepsShortHead.use(30)
  //   ]),
  //
  //
  // //ABS
  //
  crunches: new Exercise(
    'Crunches',
    'Abs',
    require('../../assets/exercises/Abs/Crunches/2.jpg'),
    types.isolation, [
      mc.abs.parts.abs.use(70),
      mc.abs.parts.obliques.use(30),
    ]),

  twistedCrunches: new Exercise(
    'Twisted crunches',
    'Abs',
    require('../../assets/exercises/Abs/Twisted Crunches/2.jpg'),
    types.isolation, [
      mc.abs.parts.abs.use(55),
      mc.abs.parts.obliques.use(45),
    ]),
  //
  //
  // //LEGS
  //
  barbellSquat: new Exercise(
    'Barbell squat',
    'Legs',
    require('../../assets/exercises/Legs/Barbell Squat/2.jpg'),
    types.compound, [
      mc.legs.parts.quardriceps.use(60),
      mc.legs.parts.glutes.use(20),
      mc.legs.parts.hamstrings.use(10),
      mc.legs.parts.calves.use(10)
    ]),
  //
  // legExtension: new Exercise(
  //   'Leg extension',
  //   'Legs',
  //   types.isolation, [
  //     mc.legs.parts.quardriceps.use(100)
  //   ]),
  //
  // legCurl: new Exercise(
  //   'Leg curl',
  //   'Legs',
  //   types.isolation, [
  //     mc.legs.parts.hamstrings.use(80),
  //     mc.legs.parts.glutes.use(20)
  //   ]),
  //
  // smithMachineCalfRaise: new Exercise(
  //   'Smith machine calf raise',
  //   'Legs',
  //   types.isolation, [
  //     mc.legs.parts.calves.use(100)
  //   ])
};

