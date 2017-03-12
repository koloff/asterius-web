let dc = require('./day-collection');
let mcKeys = require('../muscle/muscle-keys');

module.exports = {
  sex: 'male',
  height: 180,
  age: 18,
  experience: 0,
  trainingDays: [dc.monday, dc.wednesday, dc.friday],
  priorityMuscles: [mcKeys.biceps.shortHead, mcKeys.chest.clavicularHead]
};