let Exercise = require('./exercise');
let mcKeys = require('../muscle/muscle-keys');
let ecKeys = require('./exercise-keys');
let types = Exercise.getPossibleTypes();
let mc = require('../muscle/muscle-collection');
let getMuscle = require('../muscle/muscle-get');

//noinspection JSUnresolvedFunction
module.exports = [
  // CHEST

  new Exercise(
    ecKeys.chest.dumbbellBenchPress,
    'Dumbbell Bench Press',
    types.compound, [
      getMuscle(mcKeys.chest.sternalHead, mc).getUsage(50),
      getMuscle(mcKeys.chest.clavicularHead, mc).getUsage(20),
      getMuscle(mcKeys.shoulders.anteriorHead, mc).getUsage(15),
      getMuscle(mcKeys.triceps.longHead, mc).getUsage(10),
      getMuscle(mcKeys.triceps.shortHead, mc).getUsage(5),
    ]
  ),

  new Exercise(
    'Dumbbell Incline Bench Press',
    'chest',
    ecKeys.chest.dumbbellInclineBenchPress,
    types.compound, [
      getMuscle(mcKeys.chest.sternalHead, mc).use(20),
      getMuscle(mcKeys.chest.clavicularHead, mc).use(40),
      getMuscle(mcKeys.shoulders.anteriorHead, mc).use(25),
      getMuscle(mcKeys.triceps.longHead, mc).use(8),
      getMuscle(mcKeys.triceps.shortHead, mc).use(7),
    ]
  ),

  new Exercise(
    'Low Cable Crossover',
    'chest',
    ecKeys.chest.lowCableCrossover,
    types.isolation, [
      getMuscle(mcKeys.chest.sternalHead, mc).use(10),
      getMuscle(mcKeys.chest.clavicularHead, mc).use(70),
      getMuscle(mcKeys.shoulders.anteriorHead, mc).use(20)
    ]
  ),

  new Exercise(
    'Cable Crossover',
    'chest',
    ecKeys.chest.cableCrossover,
    types.isolation, [
      getMuscle(mcKeys.chest.clavicularHead, mc).use(20),
      getMuscle(mcKeys.chest.sternalHead, mc).use(60),
      getMuscle(mcKeys.shoulders.anteriorHead, mc).use(20)
    ]
  ),


  //shoulders

  new Exercise(
    'Lateral Raises',
    'shoulders',
    ecKeys.shoulders.lateralRaise,
    types.isolation, [
      getMuscle(mcKeys.shoulders.lateralHead, mc).use(80),
      getMuscle(mcKeys.shoulders.anteriorHead, mc).use(10),
      getMuscle(mcKeys.shoulders.posteriorHead, mc).use(10)
    ]
  ),


  new Exercise(
    'Dumbbell Shoulder Press',
    'shoulders',
    ecKeys.shoulders.dumbbellShoulderPress,
    types.compound, [
      getMuscle(mcKeys.shoulders.anteriorHead, mc).use(80),
      getMuscle(mcKeys.triceps.longHead, mc).use(10),
      getMuscle(mcKeys.triceps.shortHead, mc).use(10)
    ]
  ),

  new Exercise(
    'Reverse Pec Deck',
    'shoulders',
    ecKeys.shoulders.reversePecDeck,
    types.isolation, [
      getMuscle(mcKeys.shoulders.posteriorHead, mc).use(80),
      getMuscle(mcKeys.back.upperTrapezius, mc).use(20)
    ]
  ),


  //back

  new Exercise(
    'Lat Pulldown Wide Grip',
    'back',
    ecKeys.back.latPulldownWideGrip,
    types.compound, [
      getMuscle(mcKeys.back.lats, mc).use(60),
      getMuscle(mcKeys.biceps.longHead, mc).use(15),
      getMuscle(mcKeys.biceps.longHead, mc).use(15),
      getMuscle(mcKeys.shoulders.posteriorHead, mc).use(10)
    ]
  ),

  new Exercise(
    'Cable Row',
    'back',
    ecKeys.back.cableRow,
    types.compound, [
      getMuscle(mcKeys.back.middleBack, mc).use(55),
      getMuscle(mcKeys.back.lats, mc).use(20),
      getMuscle(mcKeys.biceps.longHead, mc).use(15),
      getMuscle(mcKeys.biceps.shortHead, mc).use(10)
    ]
  ),

  new Exercise(
    'Straight Arm Pulldown',
    'back',
    ecKeys.back.straightArmPulldown,
    types.isolation, [
      getMuscle(mcKeys.back.lats, mc).use(70),
      getMuscle(mcKeys.back.middleBack, mc).use(20),
      getMuscle(mcKeys.shoulders.posteriorHead, mc).use(10)
    ]
  ),

  new Exercise(
    'Dumbbell Shrugs',
    'back',
    ecKeys.back.dumbbellShrug,
    types.isolation, [
      getMuscle(mcKeys.back.upperTrapezius, mc).use(80),
      getMuscle(mcKeys.back.middleBack, mc).use(20)
    ]
  ),


  //ROTATOR CUFF

  new Exercise(
    'Cable External Rotation',
    'back',
    ecKeys.back.cableExternalRotation,
    types.isolation, [
      getMuscle(mcKeys.back.rotatorCuff, mc).use(80),
      getMuscle(mcKeys.shoulders.posteriorHead, mc).use(20)
    ]
  ),


  //biceps

  new Exercise(
    'Incline Dumbbell Curl',
    'biceps',
    ecKeys.biceps.inclineDumbbellCurl,
    types.isolation, [
      getMuscle(mcKeys.biceps.longHead, mc).use(65),
      getMuscle(mcKeys.biceps.shortHead, mc).use(20),
      getMuscle(mcKeys.forearms.flexors, mc).use(15)
    ]),

  new Exercise(
    'Barbell Curl',
    'biceps',
    ecKeys.biceps.barbellCurl,
    types.isolation, [
      getMuscle(mcKeys.biceps.shortHead, mc).use(40),
      getMuscle(mcKeys.biceps.longHead, mc).use(50),
      getMuscle(mcKeys.forearms.flexors, mc).use(10)
    ]),

  new Exercise(
    'Overhead Cable Curl',
    'biceps',
    ecKeys.biceps.overheadCableCurl,
    types.isolation, [
      getMuscle(mcKeys.biceps.shortHead, mc).use(65),
      getMuscle(mcKeys.biceps.longHead, mc).use(20),
      getMuscle(mcKeys.forearms.flexors, mc).use(15)
    ]),


  //triceps

  new Exercise(
    'Seated triceps Press',
    'triceps',
    ecKeys.triceps.seatedTricepsPress,
    types.isolation, [
      getMuscle(mcKeys.triceps.longHead, mc).use(80),
      getMuscle(mcKeys.triceps.shortHead, mc).use(20)
    ]),

  new Exercise(
    'Rope Pushdown',
    'triceps',
    ecKeys.triceps.ropePushdown,
    types.isolation, [
      getMuscle(mcKeys.triceps.shortHead, mc).use(80),
      getMuscle(mcKeys.triceps.longHead, mc).use(20)
    ]),

  new Exercise(
    'Skullcrushers',
    'triceps',
    ecKeys.triceps.skullCrushers,
    types.isolation, [
      getMuscle(mcKeys.triceps.longHead, mc).use(70),
      getMuscle(mcKeys.triceps.shortHead, mc).use(30)
    ]),


  //abs

  new Exercise(
    'Crunches',
    'abs',
    ecKeys.core.crunches,
    types.isolation, [
      getMuscle(mcKeys.core.abs, mc).use(70),
      getMuscle(mcKeys.core.obliques, mc).use(30),
    ]),

  new Exercise(
    'Twisted Crunches',
    'abs',
    ecKeys.core.twistedCrunches,
    types.isolation, [
      getMuscle(mcKeys.core.abs, mc).use(55),
      getMuscle(mcKeys.core.obliques, mc).use(45),
    ]),


  //legs

  new Exercise(
    'Barbell Squat',
    'legs',
    ecKeys.legs.barbellSquat,
    types.compound, [
      getMuscle(mcKeys.legs.quadriceps, mc).use(60),
      getMuscle(mcKeys.legs.glutes, mc).use(20),
      getMuscle(mcKeys.legs.hamstrings, mc).use(10),
      getMuscle(mcKeys.legs.calves, mc).use(10)
    ]),

  new Exercise(
    'Leg Extensions',
    'legs',
    ecKeys.legs.legExtension,
    types.isolation, [
      getMuscle(mcKeys.legs.quadriceps, mc).use(100)
    ]),

  new Exercise(
    'Leg Curls',
    'legs',
    ecKeys.legs.legCurl,
    types.isolation, [
      getMuscle(mcKeys.legs.hamstrings, mc).use(80),
      getMuscle(mcKeys.legs.glutes, mc).use(20)
    ]),

  new Exercise(
    'Smith Machine Calf Raise',
    'legs',
    ecKeys.legs.smithMachineCalfRaise,
    types.isolation, [
      getMuscle(mcKeys.legs.calves, mc).use(100)
    ])
];