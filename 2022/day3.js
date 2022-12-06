function testDayThree(puzzleInput) {
  var input =
    puzzleInput ||
    "vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw";

  var alphabet = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  var intersection = (arrA, arrB, arrC) =>
    arrA.filter((x) =>
      arrC ? arrB.includes(x) && arrC.includes(x) : arrB.includes(x)
    )[0];

  var split = (str, index) => [str.slice(0, index), str.slice(index)];

  var arrayChunks = (array, chunkSize) =>
    Array(Math.ceil(array.length / chunkSize))
      .fill()
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));

  var partOne = input.split("\n").reduce((summ, it) => {
    var [first, second] = split(it, it.length / 2);

    var priority = intersection(first.split(""), second.split(""));

    var weigth = alphabet.indexOf(priority);

    return summ + weigth;
  }, 0);

  var partTwo = arrayChunks(input.split("\n"), 3).reduce(
    (summ, [first, second, third]) => {
      var priority = intersection(
        first.split(""),
        second.split(""),
        third.split("")
      );

      var weigth = alphabet.indexOf(priority);

      return summ + weigth;
    },
    0
  );

  return { partOne, partTwo };
}
