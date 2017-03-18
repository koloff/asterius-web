let step = 2.5;


function getVolumeGrid(startReps, endReps, startWeight, endWeight, weightStep) {
  let sum = 0;
  for (let weight = startWeight; weight <= endWeight; weight += weightStep) {
    for (let reps = startReps; reps <= endReps; reps++) {
      let setVolume = reps * weight;
      sum += setVolume;
      // console.log(`${reps}x${weight}=${setVolume}`);
    }
  }


  let width = endReps - startReps + 1;
  let height = (endWeight - startWeight) / weightStep + 1;

  let sumAverage = sum / (width * height);
  console.log(`sumAverage: ${sumAverage}`);

  return sumAverage;
}

let startLoad = 70;
let endLoad = 80;

let av1 = getVolumeGrid(7, 8, endLoad - step * 2, endLoad, step);
let av2 = getVolumeGrid(8, 10, startLoad + step, startLoad + step * 3, step);
let av3 = getVolumeGrid(10, 13, startLoad - 1, startLoad, step);

console.log(av1, av2, av3);