let Muscle = require('./muscle');
let keys = require('./muscle-keys');

module.exports = [
  new Muscle('Deltoid anterior head', 'Front Delts', keys.shoulders.anteriorHead, 'Shoulders', 7),
  new Muscle('Deltoid lateral head', 'Side Delts', keys.shoulders.lateralHead, 'Shoulders', 6),
  new Muscle('Deltoid posterior head', 'Rear Delts', keys.shoulders.posteriorHead, 'Shoulders', 5),
  new Muscle('Pectoralis major clavicular head', 'Upper Chest', keys.chest.clavicularHead, 'Chest', 10),
  new Muscle('Pectoralis major sternal head', 'Lower Chest', keys.chest.sternalHead, 'Chest', 11),
  new Muscle('Trapezius superior fibers', 'Upper traps', keys.back.upperTrapezius, 'Back', 5),
  new Muscle('Trapezius inferior fibers and rhomboid', 'Middle Back', keys.back.middleBack, 'Back', 7),
  new Muscle('Latissimus dorsi', 'Lats', keys.back.lats, 'Back', 8),
  new Muscle('Teres minor, Infraspinatus, Supraspinatus, Subscapularis', 'Rotator cuff', keys.back.rotatorCuff, 'Back', 3),
  new Muscle('Rectus abdominis', 'Abs', keys.core.abs, 'Abs', 6),
  new Muscle('Abdominal obliques', 'Obliques', keys.core.obliques, 'Abs', 4),
  new Muscle('Biceps brachii long head', 'Biceps outer head', keys.biceps.longHead, 'Biceps', 8),
  new Muscle('Biceps brachii short head', 'Biceps inner head', keys.biceps.shortHead, 'Biceps', 8),
  new Muscle('Triceps brachii long head', 'Triceps inner head', keys.triceps.longHead, 'Triceps', 8),
  new Muscle('Triceps brachii lateral head', 'Triceps outer head', keys.triceps.shortHead, 'Triceps', 8),
  new Muscle('Brachioradialis', 'Brachioradialis', keys.forearms.brachioradialis, 'Forearms', 4),
  new Muscle('Flexors muscle group', 'Flexors', keys.forearms.flexors, 'Forearms', 4),
  new Muscle('Extensors muscle group', 'Extensors', keys.forearms.extensors, 'Forearms', 4),
  new Muscle('Quadriceps muscle group', 'Quads', keys.legs.quadriceps, 'Legs', 10),
  new Muscle('Hamstrings muscle group', 'Hamstrings', keys.legs.hamstrings, 'Legs', 8),
  new Muscle('Gluteus muscles group', 'Glutes', keys.legs.glutes, 'Legs', 8),
  new Muscle('Soleus, Gastrocnemius', 'Calves', keys.legs.calves, 'Legs', 5)
];