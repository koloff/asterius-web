/*
 * DISCLAIMER
 * some muscles are grouped based on function or type of exercises that train them
 * some muscles are not included because they are trained together with some of the muscles below
 * muscle sizes are not accurate but this classification is enough for designing the training
 */

import _ from 'lodash';
import Muscle from './muscle';


export function getMuscle(muscleName) {
  let muscleToReturn;
  _.forOwn(mc, (item) => {
    if (item.parts) {
      let muscle = _.chain(item.parts).values().find({name: muscleName}).value();
      if (muscle) {
        console.log(muscle);
        muscleToReturn = muscle;
      }
    }
  });

  return muscleToReturn;
}

export let mc = {

  shoulders: {
    name: 'Shoulders',
    parts: {
      anteriorHead: new Muscle('Deltoid anterior head', 'Front delts', 4, require('../../assets/muscles/Shoulders/anteriorHead.jpg')),
      lateralHead: new Muscle('Deltoid lateral head', 'Side delts', 6),
      posteriorHead: new Muscle('Deltoid posterior head', 'Rear delts', 4)
    }
  },

  chest: {
    name: 'Chest',
    parts: {
      clavicularHead: new Muscle('Pectoralis major clavicular head', 'Upper chest', 7, require('../../assets/muscles/Chest/clavicularHead.jpg')),
      sternalHead: new Muscle('Pectoralis major sternal head', 'Lower chest', 9, require('../../assets/muscles/Chest/sternalHead.jpg'))
    }
  },

  back: {
    name: 'Back',
    parts: {
      upperTrapezius: new Muscle('Trapezius superior fibers', 'Upper traps', 5),
      middleBack: new Muscle('Trapezius inferior fibers and rhomboid', 'Middle back', 7),
      lats: new Muscle('Latissimus dorsi', 'Lats', 8),
      rotatorCuff: new Muscle('Teres minor, Infraspinatus, Supraspinatus, Subscapularis', 'Rotator cuff', 3)
    }
  },

  abs: {
    name: 'Abs',
    parts: {
      abs: new Muscle('Rectus abdominis', 'Abs', 6),
      obliques: new Muscle('Abdominal obliques', 'Obliques', 4)
    }
  },

  biceps: {
    name: 'Biceps',
    parts: {
      bicepsLongHead: new Muscle('Biceps brachii long head', 'Biceps outer head', 7),
      bicepsShortHead: new Muscle('Biceps brachii short head', 'Biceps inner head', 7)
    }
  },

  triceps: {
    name: 'Triceps',
    parts: {
      tricepsLongHead: new Muscle('Triceps brachii long head', 'Triceps inner head', 7),
      tricepsShortHead: new Muscle('Triceps brachii lateral head', 'Triceps outer head', 7)
    }
  },

  forearms: {
    name: 'Forearms',
    parts: {
      brachioradialis: new Muscle('Brachioradialis', 'Brachioradialis', 4),
      flexors: new Muscle('Flexors muscle group', 'Flexors', 4),
      extensors: new Muscle('Extensors muscle group', 'Extensors', 4)
    },
  },

  legs: {
    name: 'Legs',
    parts: {
      quardriceps: new Muscle('Quadriceps muscle group', 'Quads', 10),
      hamstrings: new Muscle('Hamstrings muscle group', 'Hamstrings', 8),
      glutes: new Muscle('Gluteus muscles group', 'Glutes', 8),
      calves: new Muscle('Soleus, Gastrocnemius', 'Calves', 5)
    }
  }

};