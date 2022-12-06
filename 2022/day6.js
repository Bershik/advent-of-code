function testDaySix(puzzleInput) {
  var input = puzzleInput || "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

  var partOne = 0;

  for (var i = 4; i < input.length; i++) {
    var signalPortion = input.slice(i - 4, i);
    var marker = new Set(signalPortion.split(""));
    if (marker.size === 4) {
      partOne = i;
      break;
    }
  }

  var partTwo = 0;

  for (var i = 14; i < input.length; i++) {
    var signalPortion = input.slice(i - 14, i);
    var marker = new Set(signalPortion.split(""));
    if (marker.size === 14) {
      partTwo = i;
      break;
    }
  }

  return { partOne, partTwo };
}
