import _ from 'lodash';
import mc from './muscle/muscles-collection';
import ec from './exercise/exercises-collection';

const weekDays = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday'
};

const maxSetsPerTraining = 23;

let availableDays = [1];

let totalWeeklySets = availableDays.length * maxSetsPerTraining;

console.log(totalWeeklySets);


/*

  bp - 3
  lat pulls - 3
  rows - 3
  squats - 4

  lateral raises - 3
  calves - 3

*/

_.forOwn(mc, (muscle) => {
  console.log(muscle.name, muscle.mrv);
});