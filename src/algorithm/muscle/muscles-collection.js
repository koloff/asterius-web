/*
 * DISCLAIMER
 * some muscles are grouped based on function or type of exercises that train them
 * some muscles are not included because they are trained together with some of the muscles below
 * muscle sizes are not accurate but this classification is enough for designing the training
 */

import _ from 'lodash';
import Muscle from './muscle';

exports.a = 5;

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
      anteriorHead: new Muscle('Deltoid anterior head', 'Front delts', 7, require('../../assets/muscles/Shoulders/anteriorHead.jpg')),
      lateralHead: new Muscle('Deltoid lateral head', 'Side delts', 6, require('../../assets/muscles/Shoulders/lateralHead.jpg')),
      posteriorHead: new Muscle('Deltoid posterior head', 'Rear delts', 5, require('../../assets/muscles/Shoulders/posteriorHead.jpg'))
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
      upperTrapezius: new Muscle('Trapezius superior fibers', 'Upper traps', 5, require('../../assets/muscles/Back/upperTrapezius.jpg')),
      middleBack: new Muscle('Trapezius inferior fibers and rhomboid', 'Middle back', 7, require('../../assets/muscles/Back/middleBack.jpg')),
      lats: new Muscle('Latissimus dorsi', 'Lats', 8, require('../../assets/muscles/Back/lats.jpg')),
      rotatorCuff: new Muscle('Teres minor, Infraspinatus, Supraspinatus, Subscapularis', 'Rotator cuff', 3, require('../../assets/muscles/Back/rotatorCuff.jpg'))
    }
  },

  abs: {
    name: 'Abs',
    parts: {
      abs: new Muscle('Rectus abdominis', 'Abs', 6, require('../../assets/muscles/Abs/abs.jpg')),
      obliques: new Muscle('Abdominal obliques', 'Obliques', 4, require('../../assets/muscles/Abs/obliques.jpg'))
    }
  },

  biceps: {
    name: 'Biceps',
    parts: {
      bicepsLongHead: new Muscle('Biceps brachii long head', 'Biceps outer head', 7, require('../../assets/muscles/Biceps/bicepsLongHead.jpg')),
      bicepsShortHead: new Muscle('Biceps brachii short head', 'Biceps inner head', 7, require('../../assets/muscles/Biceps/bicepsShortHead.jpg'))
    }
  },

  triceps: {
    name: 'Triceps',
    parts: {
      tricepsLongHead: new Muscle('Triceps brachii long head', 'Triceps inner head', 7, require('../../assets/muscles/Triceps/tricepsLongHead.jpg')),
      tricepsShortHead: new Muscle('Triceps brachii lateral head', 'Triceps outer head', 7, require('../../assets/muscles/Triceps/tricepsShortHead.jpg'))
    }
  },

  forearms: {
    name: 'Forearms',
    parts: {
      brachioradialis: new Muscle('Brachioradialis', 'Brachioradialis', 4, require('../../assets/muscles/Forearms/brachioradialis.jpg')),
      flexors: new Muscle('Flexors muscle group', 'Flexors', 4, require('../../assets/muscles/Forearms/flexors.jpg')),
      extensors: new Muscle('Extensors muscle group', 'Extensors', 4, require('../../assets/muscles/Forearms/extensors.jpg'))
    },
  },

  legs: {
    name: 'Legs',
    parts: {
      quardriceps: new Muscle('Quadriceps muscle group', 'Quads', 10, require('../../assets/muscles/Legs/quadriceps.jpg')),
      hamstrings: new Muscle('Hamstrings muscle group', 'Hamstrings', 8, require('../../assets/muscles/Legs/hamstrings.jpg')),
      glutes: new Muscle('Gluteus muscles group', 'Glutes', 8, require('../../assets/muscles/Legs/glutes.jpg')),
      calves: new Muscle('Soleus, Gastrocnemius', 'Calves', 5, require('../../assets/muscles/Legs/calves.jpg'))
    }
  }

};