function testDayFive(puzzleInputStorage, puzzleInputMoves) {
  // var puzzleInputStorage = [
  //   ["Z", "T", "F", "R", "W", "J", "G"],
  //   ["G", "W", "M"],
  //   ["J", "N", "H", "G"],
  //   ["J", "R", "C", "N", "W"],
  //   ["W", "F", "S", "B", "G", "Q", "V", "M"],
  //   ["S", "R", "T", "D", "V", "W", "C"],
  //   ["H", "B", "N", "C", "D", "Z", "G", "V"],
  //   ["S", "J", "N", "M", "G", "C"],
  //   ["G", "P", "N", "W", "C", "J", "D", "L"],
  // ];

  var stacks = puzzleInputStorage || [["Z", "N"], ["M", "C", "D"], ["P"]];
  var moves =
    puzzleInputMoves ||
    "move 1 from 2 to 1\nmove 3 from 1 to 3\nmove 2 from 2 to 1\nmove 1 from 1 to 2";

  var movesArr = moves.split("\n").map((it) =>
    it
      .trim()
      .split(" ")
      .filter((it) => it !== "move" && it !== "from" && it !== "to")
  );

  var partOne = movesArr
    .reduce((obj, [move, from, to]) => {
      obj[to - 1].push(...obj[from - 1].splice(-move, move).reverse());

      return obj;
    }, JSON.parse(JSON.stringify(stacks)))
    .map((it) => it.pop())
    .join("");

  var partTwo = movesArr
    .reduce((obj, [move, from, to]) => {
      obj[to - 1].push(...obj[from - 1].splice(-move, move));

      return obj;
    }, JSON.parse(JSON.stringify(stacks)))
    .map((it) => it.pop())
    .join("");

  return { partOne, partTwo };
}
