import { parseFileInLines } from "../general.js";

const getInputArray = () => {
  const lines = parseFileInLines("day6/code.txt");
  return lines[0].split("");
};

/**
 * @param {Array<String>} array - general array
 * @param {Number} start - start of marker index
 * @param {Number} end - end of marker index
 */
const checkForDuplicates = (array, start, end) => {
  const checkedArray = array.slice(start, end + 1);
  return !checkedArray.every(
    (item) => checkedArray.indexOf(item) === checkedArray.lastIndexOf(item)
  );
};

const findStartingPoint = (array, length) => {
  let point = length - 1;
  for (let i = point; i < array.length; i++) {
    const withDuplicates = checkForDuplicates(array, i - point, i);
    if (!withDuplicates) {
      point = i;
      break;
    }
  }
  return point;
};

export const day6 = () => {
  console.log("Day 6");
  const part1Length = 4;
  const part2Length = 14;

  const code = getInputArray();
  const startingPoint = findStartingPoint(code, part2Length);

  console.log("Starting point: ", startingPoint + 1);
};
