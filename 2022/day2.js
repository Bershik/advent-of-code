// A(1) - rock vs Y(2) - paper => win(6)
// B(2) - paper vs X(1) - rock => lose(0)
// C(3) - scissors vs Z(3) - scissors => draw(3)

// move - response = win
// A(1) - Y(2)     = -1
// B(2) - Z(3)     = -1
// C(3) - X(1)     = 2

// move - response = lose
// A(1) - Z(3)     = -2
// B(2) - X(1)     = 1
// C(3) - Y(2)     = 1

function testDayTwo(puzzleInput) {
  var input = puzzleInput || "A Y\nB X\nC Z";

  var mo = {
    A: 1,
    B: 2,
    C: 3,
  };

  var res = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  var win = 6,
    draw = 3,
    lose = 0;

  var partOne = input.split("\n").reduce((summ, it) => {
    if (!Boolean(it)) return summ;

    var [ve, ponse] = it.split(" ");

    switch (mo[ve] - res[ponse]) {
      case -1:
      case 2:
        return summ + res[ponse] + win;
      case 1:
      case -2:
        return summ + res[ponse] + lose;
      default:
        return summ + res[ponse] + draw;
    }
  }, 0);

  var partTwo = input.split("\n").reduce((summ, it) => {
    if (!Boolean(it)) return summ;

    var [ve, round] = it.split(" ");

    switch (round) {
      case "X":
        return summ + (mo[ve] - (ve === "A" ? -2 : 1)) + lose;
      case "Z":
        return summ + (mo[ve] - (ve === "C" ? 2 : -1)) + win;
      default:
        return summ + mo[ve] + draw;
    }
  }, 0);

  return { partOne, partTwo };
}
