function testDayFour(puzzleInput) {
  var input =
    puzzleInput || "2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8";

  var intersection = (arrA, arrB) => arrA.filter((x) => arrB.includes(x))[0];

  var createArray = ([s, e]) => {
    var arr = [];

    for (var i = s; i <= e; i++) {
      arr.push(i);
    }

    return arr;
  };

  var partOne = input
    .split("\n")
    .map((it) =>
      it.split(",").map((jt) => jt.split("-").map((zt) => Number(zt)))
    )
    .reduce((summ, [[s1, e1], [s2, e2]]) => {
      if ((s2 >= s1 && e1 >= e2) || (s1 >= s2 && e1 <= e2)) return summ + 1;

      return summ;
    }, 0);

  var partTwo = input
    .split("\n")
    .map((it) =>
      it.split(",").map((jt) => jt.split("-").map((zt) => Number(zt)))
    )
    .reduce((summ, cur) => {
      var first = createArray(cur[0]);
      var second = createArray(cur[1]);

      if (intersection(first, second)) return summ + 1;

      return summ;
    }, 0);

  return { partOne, partTwo };
}
