export default function testDayOne(puzzleInput) {
  var input =
    puzzleInput ||
    "1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000\n";
  var maxSumm = 0;
  var maxArr = [0, 0, 0];

  input.split("\n").reduce((summ, current) => {
    var callories = Number(current);

    if (callories === 0) {
      if (summ > maxSumm) maxSumm = summ;

      var index = maxArr.findIndex((it) => it < summ);

      if (index !== -1) {
        maxArr[index] = summ;
        maxArr.sort((a, b) => a - b);
      }

      return 0;
    } else {
      return summ + callories;
    }
  }, 0);

  return { partOne: maxSumm, partTwo: maxArr[0] + maxArr[1] + maxArr[2] };
}
