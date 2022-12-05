import { parseFileInLines } from "../general.js";

// Get numbers from range string
const getNumbersFromRange = (range) => {
  const [min, max] = range.split("-");
  const numbers = [];
  for (let i = Number(min); i <= Number(max); i++) {
    numbers.push(i);
  }
  return numbers;
};

const splitPairs = (pairs) => {
  const [first, second] = pairs.split(",");
  return [first, second];
};

const contains = (first, second) => {
  return (
    second.every((item) => first.includes(item)) ||
    first.every((item) => second.includes(item))
  );
};

const overlap = (first, second) => {
  return (
    first.some((item) => second.includes(item)) ||
    second.some((item) => first.includes(item))
  );
};

export const day4 = () => {
  const pairs = parseFileInLines("day4/pairs.txt");
  const splicedPairs = pairs.map(splitPairs);

  const numbers = splicedPairs.map(([first, second]) => [
    getNumbersFromRange(first),
    getNumbersFromRange(second),
  ]);

  const fullyContained = numbers.filter(([first, second]) =>
    contains(first, second)
  );
  const overlapping = numbers.filter(([first, second]) =>
    overlap(first, second)
  );

  console.log("Fully contained pairs: ", fullyContained.length);
  console.log("Overlapping pairs: ", overlapping.length);
};
