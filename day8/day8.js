import { parseFileInLines } from "../general.js";

const parseStringsInArray = (lines) => {
  return lines.map((line) => {
    return line.split("").map((char) => parseInt(char));
  });
};

const checkIfVisibleFromLeft = (forest, x, y) => {
  const line = forest[y];
  const tree = line[x];
  for (let i = 0; i < x; i++) {
    if (line[i] >= tree) {
      return false;
    }
  }
  return true;
};

const checkIfVisibleFromRight = (forest, x, y) => {
  const line = forest[y];
  const tree = line[x];
  for (let i = x + 1; i < line.length; i++) {
    if (line[i] >= tree) {
      return false;
    }
  }
  return true;
};

const checkIfVisibleFromTop = (forest, x, y) => {
  const tree = forest[y][x];
  for (let i = 0; i < y; i++) {
    if (forest[i][x] >= tree) {
      return false;
    }
  }
  return true;
};

const checkIfVisibleFromBottom = (forest, x, y) => {
  const tree = forest[y][x];
  for (let i = y + 1; i < forest.length; i++) {
    if (forest[i][x] >= tree) {
      return false;
    }
  }
  return true;
};

const checkAmountVisibleFromLeft = (forest, x, y) => {
  const tree = forest[y][x];
  const line = forest[y];
  let count = 1;
  for (let i = x - 1; i > 0; i--) {
    if (line[i] >= tree) {
      return count;
    }
    count++;
  }
  return count;
};

const checkAmountVisibleFromRight = (forest, x, y) => {
  const line = forest[y];
  const tree = forest[y][x];
  let count = 0;
  for (let i = x + 1; i < line.length; i++) {
    count++;
    if (line[i] >= tree) {
      return count;
    }
  }
  return count;
};

const checkAmountVisibleFromTop = (forest, x, y) => {
  let count = 1;
  const tree = forest[y][x];
  for (let i = y - 1; i > 0; i--) {
    if (forest[i][x] >= tree) {
      return count;
    }
    count++;
  }
  return count;
};

const checkAmountVisibleFromBottom = (forest, x, y) => {
  let count = 0;
  const tree = forest[y][x];
  for (let i = y + 1; i < forest.length; i++) {
    count++;
    if (forest[i][x] >= tree) {
      return count;
    }
  }
  return count;
};

const checkVisibility = (forest, x, y) => {
  return (
    checkIfVisibleFromLeft(forest, x, y) ||
    checkIfVisibleFromRight(forest, x, y) ||
    checkIfVisibleFromTop(forest, x, y) ||
    checkIfVisibleFromBottom(forest, x, y)
  );
};

const checkTrees = (forest) => {
  let count = 0;
  for (let y = 0; y < forest.length; y++) {
    for (let x = 0; x < forest[y].length; x++) {
      const isVisible = checkVisibility(forest, x, y);
      if (isVisible) {
        count++;
      }
    }
  }
  return count;
};

const checkTreesScores = (forest) => {
  let maxScore = 0;
  for (let y = 0; y < forest.length; y++) {
    for (let x = 0; x < forest[y].length; x++) {
      const lastX = forest[y].length - 1;
      const lastY = forest.length - 1;

      const visibleFromLeft =
        x === 0 ? 0 : checkAmountVisibleFromLeft(forest, x, y);
      const visibleFromRight =
        x === lastX ? 0 : checkAmountVisibleFromRight(forest, x, y);
      const visibleFromTop =
        y === 0 ? 0 : checkAmountVisibleFromTop(forest, x, y);
      const visibleFromBottom =
        y === lastY ? 0 : checkAmountVisibleFromBottom(forest, x, y);

      const score =
        visibleFromLeft * visibleFromRight * visibleFromTop * visibleFromBottom;

      if (score > maxScore) {
        maxScore = score;
      }
    }
  }
  return maxScore;
};

export const day8 = () => {
  const lines = parseFileInLines("day8/text.txt");
  const forest = parseStringsInArray(lines);
  const visibleTrees = checkTrees(forest);
  const maxScore = checkTreesScores(forest);

  console.log("Day 8");
  console.log("Trees visible from the edges: ", visibleTrees);
  console.log("Optimal tree score: ", maxScore);
};
