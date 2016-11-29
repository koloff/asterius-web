const mc = require('./muscles-collection');
const Exercise = require('./exercise');

let difficulties = Exercise.getPossibleDifficulties();
let types = Exercise.getPossibleTypes();

module.exports = {

  // push focused

  lateralRaise: new Exercise('lateral_raise', types.isolation, difficulties.easy, [
    mc.shoulderAnteriorHead.use(15),
    mc.shoulderLateralHead.use(70),
    mc.shoulderPosteriorHead.use(15)
  ])



};