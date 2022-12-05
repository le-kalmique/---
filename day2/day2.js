import { parseFileInLines } from "../general.js";

const parsePair = (pair) => {
  const [first, second] = pair.split(" ");
  return [first, second];
};

const getOutcomeOfPair = ([opponent, player]) => {
  const outcomes = {
    A: {
      X: 3,
      Y: 6,
      Z: 0,
    },
    B: {
      X: 0,
      Y: 3,
      Z: 6,
    },
    C: {
      X: 6,
      Y: 0,
      Z: 3,
    },
  };
  return outcomes[opponent][player];
};

const getOutcomeOfPairPart2 = ([opponent, player]) => {
  const outcomes = {
    X: 0,
    Y: 3,
    Z: 6,
  };
  return outcomes[player];
};

const getPointsForChoice = (choice) => {
  const points = {
    X: 1,
    Y: 2,
    Z: 3,
  };
  return points[choice];
};

const getChoiceBasedOnWinner = ([opponent, result]) => {
  const choices = {
    A: {
      X: "Z",
      Y: "X",
      Z: "Y",
    },
    B: {
      X: "X",
      Y: "Y",
      Z: "Z",
    },
    C: {
      X: "Y",
      Y: "Z",
      Z: "X",
    },
  };
  return choices[opponent][result];
};

export const day2 = () => {
  const pairs = parseFileInLines("day2/strategy.txt").map(parsePair);
  const pointsForWins = pairs.map(getOutcomeOfPair);
  const pointsForChoices = pairs.map(([_, player]) =>
    getPointsForChoice(player)
  );
  const totalPoints =
    pointsForWins.reduce((acc, curr) => acc + curr, 0) +
    pointsForChoices.reduce((acc, curr) => acc + curr, 0);
  console.log("Total points (part 1): ", totalPoints);

  const pointsForWins2 = pairs.map(getOutcomeOfPairPart2);
  const newChoices = pairs.map(getChoiceBasedOnWinner);
  const pointsForChoices2 = newChoices.map(getPointsForChoice);
  const totalPoints2 =
    pointsForWins2.reduce((acc, curr) => acc + curr, 0) +
    pointsForChoices2.reduce((acc, curr) => acc + curr, 0);
  console.log("Total points (part 2): ", totalPoints2);
};
