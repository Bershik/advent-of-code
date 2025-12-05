export default function testDayFive(puzzleInput) {
  var input = puzzleInput || "3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32";

  var [ranges, ids] = input.split("\n\n");
  ranges = ranges
    .split("\n")
    .map((it) => it.split("-").map((it) => parseInt(it)));
  ids = ids.split("\n").map((it) => parseInt(it));

  var freshIds = ids.reduce((acc, it) => {
    for (var i = 0; i < ranges.length; i++) {
      if (it >= ranges[i][0] && it <= ranges[i][1]) {
        acc.push(it);
        return acc;
      }
    }
    return acc;
  }, []);

  var partOne = freshIds.length;

  var generalRanges = ranges
    .sort((a, b) => a[0] - b[0])
    .reduce((acc, it, i) => {
      if (i === 0) {
        acc.push(it);
        return acc;
      }

      var accEnd = acc.length - 1;

      // if next range in isside previous range
      if (it[0] >= acc[accEnd][0] && it[1] <= acc[accEnd][1]) {
        return acc;
      }

      // if next range overlaps previous range: starts before previous range and ends inside previous range
      if (it[0] <= acc[accEnd][1] && it[1] >= acc[accEnd][0]) {
        acc[accEnd][1] = it[1];
        return acc;
      }

      // if next range overlaps previous range: starts inside previous range and ends after previous range
      if (it[0] >= acc[accEnd][0] && it[0] <= acc[accEnd][1]) {
        acc[accEnd][1] = it[1];
        return acc;
      }

      // if next range is completely after previous range
      if (it[0] > acc[accEnd][1]) {
        acc.push(it);
        return acc;
      }

      // if next range is completely before previous range
      if (it[1] < acc[accEnd][0]) {
        acc.push(it);
        return acc;
      }

      return acc;
    }, []);

  var allFreshIds = generalRanges.reduce((acc, it) => {
    acc += it[1] - it[0] + 1;

    return acc;
  }, 0);

  var partTwo = allFreshIds;

  return { partOne, partTwo };
}
