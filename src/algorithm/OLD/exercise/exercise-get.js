let _ = require('lodash');

module.exports = function (key, ec) {
  let exerciseToReturn = {};
  exerciseToReturn = _.find(ec, function(exercise) {
    return exercise.key == key;
  });

  return exerciseToReturn;
};