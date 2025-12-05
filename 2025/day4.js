export default function testFayFour(puzzleInput) {
  var input =
    puzzleInput ||
    "..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@.";

  var grid = input.split("\n").map((it) => it.split(""));

  function getAdjacentPositions([y, x]) {
    return [
      [y - 1, x],
      [y + 1, x],
      [y, x - 1],
      [y, x + 1],
      [y - 1, x - 1],
      [y - 1, x + 1],
      [y + 1, x - 1],
      [y + 1, x + 1],
    ].filter(
      ([yy, xx]) =>
        yy >= 0 && yy < grid.length && xx >= 0 && xx < grid[0].length
    );
  }

  function getRollPositions(g) {
    var rollPositions = [];

    for (var y = 0; y < g.length; y++) {
      for (var x = 0; x < g[0].length; x++) {
        if (g[y][x] === "@") {
          rollPositions.push([y, x]);
        }
      }
    }

    return rollPositions;
  }

  function getRemovedRollsPositions(g, rP) {
    var removedRP = rP
      .map((it) => {
        var adjacentPositions = getAdjacentPositions(it);
        var rP = adjacentPositions.reduce((acc, [y, x]) => {
          if (g[y][x] === "@") {
            acc.push([y, x]);
          }
          return acc;
        }, []);

        if (rP.length < 4) {
          return it;
        }
      })
      .filter(Boolean);

    return removedRP;
  }

  var partOne = 0;
  var totalRemovedRolls = 0;
  var justRemoved = 0;
  var currentGrid = JSON.parse(JSON.stringify(grid));
  var i = 0;

  do {
    // console.log({
    //   currentGrid,
    //   removedRollsPositions,
    // });
    var rollPositions = getRollPositions(currentGrid);
    var removedRollsPositions = getRemovedRollsPositions(
      currentGrid,
      rollPositions
    );

    // console.log({
    //   rollPositions,
    //   removedRollsPositions,
    // });

    removedRollsPositions.forEach(([y, x]) => {
      currentGrid[y][x] = ".";
    });

    justRemoved = removedRollsPositions.length;

    if (i === 0) {
      partOne = justRemoved;
    }

    totalRemovedRolls += justRemoved;

    // console.log({
    //   justRemoved,
    //   totalRemovedRolls,
    // });

    i++;
  } while (justRemoved > 0 || i === 0);

  var partTwo = totalRemovedRolls;

  return { partOne, partTwo };
}
