let _ = require('lodash');


module.exports = function getMuscle(key, mc) {
  let muscleToReturn = {};
  muscleToReturn = _.find(mc, function(muscle) {
    return muscle.key == key;
  });

  return muscleToReturn;
};