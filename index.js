const _ = require('lodash');
const musclesCollection = require('./muscles-collection');
const exercisesCollection = require('./exercises-collection');

function getOptimalRestInterval(trainingsCount, monthLength) {
  let restDaysCount = monthLength - trainingsCount;
  return Math.round(monthLength / restDaysCount);
}

// test
let res = getOptimalRestInterval(16, 30);

