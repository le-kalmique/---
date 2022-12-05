import fs from "fs";

function parseCalories(data) {
  return data
    .split("\n\n")
    .map((el) => el.split("\n").map((el) => parseInt(el)));
}

const findBiggestSum = async () => {
  const data = await fs.promises.readFile("day1/calories.txt", "utf-8");
  const elfsCalories = parseCalories(data);

  let biggestCaloriesNum = 0;
  elfsCalories.forEach((el) => {
    const sum = el.reduce((acc, curr) => acc + curr, 0);
    if (sum > biggestCaloriesNum) biggestCaloriesNum = sum;
  });

  return biggestCaloriesNum;
};

const findTopThreeBiggestSums = async () => {
  const data = await fs.promises.readFile("day1/calories.txt", "utf-8");
  const elfsCalories = parseCalories(data);

  const sums = elfsCalories.map((el) =>
    el.reduce((acc, curr) => acc + curr, 0)
  );
  sums.sort((a, b) => b - a);

  return sums.slice(0, 3);
};

export const dayOne = () => {
  findBiggestSum().then((res) => console.log("Biggest calories sum: ", res));
  findTopThreeBiggestSums()
    .then((res) => res.reduce((a, b) => a + b, 0))
    .then((res) => console.log("Top three calories sum: ", res));
};
