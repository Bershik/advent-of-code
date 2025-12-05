export default function testDayTwo(puzzleInput) {
  var input =
    puzzleInput ||
    "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,\n1698522-1698528,446443-446449,38593856-38593862,565653-565659,\n824824821-824824827,2121212118-2121212124";

  var ranges = input
    .replaceAll("\n", "")
    .split(",")
    .map((it) => it.split("-"));

  function checkString(str) {
    var strL = str.length;

    // console.log({str, strL});

    if (strL % 2 !== 0) return false;

    var half1 = str.slice(0, strL / 2);
    var half2 = str.slice(strL / 2);

    // console.log({half1, half2});

    return half1 === half2;
  }

  var invalidIds = ranges.reduce((acc, [s, e]) => {
    var invalidIds = [];
    // console.log({s});

    var ns = parseInt(s);
    var ne = parseInt(e);
    var diff = ne - ns;

    // console.log({ns, ne, diff});

    do {
      // console.log({diff});

      var str = String(ne - diff);

      // console.log({str})

      if (checkString(str)) {
        // console.log('push str');

        invalidIds.push(str);
      }

      diff--;
    } while (diff >= 0);

    acc.push(...invalidIds);

    return acc;
  }, []);

  var partOne = invalidIds.reduce((acc, it) => {
    return acc + parseInt(it);
  }, 0);

  function isPrime(num) {
    if (num <= 3) {
      return num > 1;
    } else if (num % 2 == 0 || num % 3 == 0) {
      return false;
    } else {
      for (var i = 5; i * i <= num; i += 6) {
        if (num % i == 0 || num % (i + 2) == 0) return false;
      }
    }
    return true;
  }

  function findDivisors(num) {
    if (num <= 0) return [];

    const divisors = [];

    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        divisors.push(i);
        if (i !== num / i) {
          divisors.push(num / i);
        }
      }
    }

    return divisors.sort((a, b) => a - b);
  }

  function checkString2(str) {
    var strL = str.length;

    // console.log({str, isPrime: isPrime(strL), strL});

    if (isPrime(strL)) {
      return str.split("").every((it) => it === str[0]);
    }

    var divisors = findDivisors(strL);

    // console.log({ divisors });

    return divisors.some((it) => {
      // console.log(new Array(it).fill(strL / it));

      var substrings = new Array(it)
        .fill(strL / it)
        .reduce((substrings, it, index) => {
          // console.log({ s: index * it, e: (index + 1) * it });

          // console.log({ substre: str.slice(index * it, (index + 1) * it) });

          return substrings.concat(str.slice(index * it, (index + 1) * it));
        }, []);

      // console.log({ substrings });

      return substrings.every((it) => it === substrings[0]);
    });
  }

  var invalidIds2 = ranges.reduce((acc, [s, e]) => {
    var invalidIds = [];
    // console.log({s});

    var ns = parseInt(s);
    var ne = parseInt(e);
    var diff = ne - ns;

    // console.log({ns, ne, diff});

    do {
      // console.log({diff});

      var str = String(ne - diff);

      // console.log({str})

      if (checkString2(str)) {
        // console.log('push str');

        invalidIds.push(str);
      }

      diff--;
    } while (diff >= 0);

    acc.push(...invalidIds);

    return acc;
  }, []);

  var partTwo = invalidIds2.reduce((acc, it) => {
    return acc + parseInt(it);
  }, 0);

  return { partOne, partTwo };
}
