//mrv - max recoverable volume


function calculateSetCountPerSession(sessionLength) {
  const warmupTime = 10;
  return (sessionLength - warmupTime) / 2.5 ;
}

export function calculateMaximumWeeklySets(daysCount, sessionLength) {
  let setsCount = calculateSetCountPerSession(sessionLength);
  console.log(setsCount);
  return setsCount * daysCount;
}