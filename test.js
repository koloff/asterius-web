let step = 2.5;


function getVolumeGrid(startReps, endReps, startWeight, endWeight, weightStep) {
  let sum = 0;
  for (let weight = startWeight; weight <= endWeight; weight += weightStep) {
    for (let reps = startReps; reps <= endReps; reps++) {
      let setVolume = reps * weight;
      sum += setVolume;
      console.log(`${reps}x${weight}=${setVolume}`);
    }
  }


  let width = endReps - startReps + 1;
  console.log(width);
  let height = (endWeight - startWeight) / weightStep + 1;
  console.log(height);

  let sumAverage = sum / (width * height);
  console.log(`sum: ${sum}`);
  console.log(`sumAverage: ${sumAverage}`);
}

getVolumeGrid(7, 8, 32.5, 37.5, step);
getVolumeGrid(8, 10, 27.5, 32.5, step);
getVolumeGrid(10, 13, 27.5, 30, step);