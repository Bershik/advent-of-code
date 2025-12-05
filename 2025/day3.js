export default function testDayThree(puzzleInput) {
  var input =
    puzzleInput ||
    "987654321111111\n811111111111119\n234234234234278\n818181911112111";

  var banks = input.split("\n");

  var maxSumms = banks.reduce((acc, it) => {
    var batteries = it.split("");

    var summs = batteries.reduce((acc, it, i, arr) => {
      var j = i + 1;
      var sum = [];

      do {
        sum.push(parseInt(`${it}${arr[j]}`));

        j++;
      } while (j < arr.length);

      acc.push(...sum);

      return acc;
    }, []);

    acc.push(Math.max(...summs));

    return acc;
  }, []);

  var partOne = maxSumms.reduce((acc, it) => {
    return acc + parseInt(it);
  }, 0);

  // take the first highest number from bank in range [0] to length - 12
  // take the highest number from bank in range [i+1] to length - 11
  // take the highest number from bank in range [i+2] to length - 10
  // ...
  // take the highest number from bank in range [i+11] to length -1

  var NUMBER_LENGTH = 12;

  var maxSumms2 = banks.reduce((acc, it) => {
    var batteries = it.split("");
    var batteriesLength = batteries.length;

    var numberParts = [];
    var currentIndex = 0;

    for (var i = 0; i < NUMBER_LENGTH; i++) {
      var range = batteries.slice(
        currentIndex,
        batteriesLength - (NUMBER_LENGTH - i) + 1
      );
      // console.log({range, batteriesLength, NUMBER_LENGTH, i});
      var currentMax = Math.max(...range);
      // console.log({currentMax});
      numberParts.push(currentMax);
      currentIndex = batteries.indexOf(String(currentMax), currentIndex) + 1;
      // console.log({currentIndex});
    }

    // console.log({numberParts, number: numberParts.join('')});

    acc.push(numberParts.join(""));

    return acc;
  }, []);

  var partTwo = maxSumms2.reduce((acc, it) => {
    return acc + parseInt(it);
  }, 0);

  return { partOne, partTwo };
}
