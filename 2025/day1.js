export default function testDayOne(puzzleInput) {
  var input = puzzleInput || "L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82";

  var INIUTIAL_POSITION = 50;
  var ROUND_LENGTH = 100;

  var moves = input
    .split("\n")
    .map((it) => [it[0], parseInt(it.replace(/^L|R/, ""))]);

  var partOne = 0;

  moves.reduce((start, [direction, clicks]) => {
    var end =
      start +
      (clicks > ROUND_LENGTH ? clicks % ROUND_LENGTH : clicks) * (direction === "R" ? 1 : -1);

    if (end === ROUND_LENGTH || end === 0) {
      partOne++;
      return 0;
    }

    if (end > ROUND_LENGTH) {
      return end - ROUND_LENGTH;
    }

    if (end < 0) {
      return ROUND_LENGTH + end;
    }

    return end;
  }, INIUTIAL_POSITION);

  var partTwo = 0;

  moves.reduce((start, [direction, clicks]) => {
    var end =
      start +
      (clicks > ROUND_LENGTH ? clicks % ROUND_LENGTH : clicks) * (direction === "R" ? 1 : -1);

    // console.log({direction, start, clicks, end});

    if (clicks > ROUND_LENGTH) {
      partTwo = partTwo + Math.trunc(clicks / ROUND_LENGTH);
      // console.log({partTwo});
    }

    if (end === ROUND_LENGTH || end === 0 || end === -ROUND_LENGTH) {
      partTwo++;
      // console.log({partTwo});
      return 0;
    }

    if (end > ROUND_LENGTH) {
      partTwo++;
      // console.log({partTwo});
      return end - ROUND_LENGTH;
    }

    if (end < 0) {
      if (start !== 0) {
        partTwo++;
      }
      // console.log({partTwo});
      return ROUND_LENGTH + end;
    }

    return end;
  }, INIUTIAL_POSITION);

  return { partOne, partTwo };
}
