import Muscle from './muscle';

/*
 * DISCLAIMER
 * some muscles are grouped based on function or type of exercises that train them
 * some muscles are not included because they are trained together with some of the muscles below
 * muscle sizes are not accurate but this classification is enough for designing the training
 */
export default {
  shoulders: {
    name: 'Shoulders',
    parts: {
      anteriorHead: new Muscle('Deltoid anterior head', 'Front delts'),
      lateralHead: new Muscle('Deltoid lateral head', 'Side delts'),
      posteriorHead: new Muscle('Deltoid posterior head', 'Rear delts')
    }
  },

  chest: {
    name: 'Chest',
    parts: {
      clavicularHead: new Muscle('Pectoralis major clavicular head', 'Upper chest'),
      sternalHead: new Muscle('Pectoralis major sternal head', 'Lower chest')
    }
  },

  back: {
    name: 'Back',
    parts: {
      upperTrapezius: new Muscle('Trapezius superior fibers', 'Upper traps'),
      middleBack: new Muscle('Trapezius inferior fibers and rhomboid', 'Middle back'),
      lats: new Muscle('Latissimus dorsi', 'Lats'),
      rotatorCuff: new Muscle('Teres minor, Infraspinatus, Supraspinatus, Subscapularis', 'Rotator cuff')
    }
  },

  abs: {
    name: 'Abs',
    parts: {
      abs: new Muscle('Rectus abdominis', 'Abs'),
      obliques: new Muscle('Abdominal obliques', 'Obliques')
    }
  },

  biceps: {
    name: 'Biceps',
    parts: {
      longHead: new Muscle('Biceps brachii long head', 'Biceps outer head'),
      shortHead: new Muscle('Biceps brachii short head', 'Biceps inner head')
    }
  },

  triceps: {
    name: 'Triceps',
    parts: {
      longHead: new Muscle('Triceps brachii long head', 'Triceps inner head'),
      lateralHead: new Muscle('Triceps brachii lateral head', 'Triceps outer head')
    }
  },

  forearms: {
    name: 'Forearms',
    parts: {
      brachioradialis: new Muscle('Brachioradialis', 'Brachioradialis'),
      flexors: new Muscle('Flexors muscle group', 'Flexors'),
      extensors: new Muscle('Extensors muscle group', 'Extensors')
    },
  },

  legs: {
    name: 'Legs',
    parts: {
      quardriceps: new Muscle('Quadriceps muscle group', 'Quads'),
      hamstrings: new Muscle('Hamstrings muscle group', 'Hamstrings'),
      glutes: new Muscle('Gluteus muscles group', 'Glutes')
    }
  },

  calves: {
    name: 'calves',
    parts: {
      calves: new Muscle('Soleus, Gastrocnemius', 'Calves')
    }
  }

};