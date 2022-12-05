import { parseFileInLines } from "../general.js";

// Split packages in two halves
const splitPackages = (packages) => {
  const half = Math.ceil(packages.length / 2);
  const firstHalf = packages.slice(0, half);
  const secondHalf = packages.slice(half);
  return [firstHalf, secondHalf];
};

// Find items that are in both halves
const findCommonItem = (firstHalf, secondHalf) => {
  const firstHalfArray = firstHalf.split("");
  const secondHalfArray = secondHalf.split("");
  const commonItem = firstHalfArray.find((item) =>
    secondHalfArray.includes(item)
  );
  return commonItem;
};

// Get the weight of an item
const getWeight = (item) => {
  const isUppercase = item === item.toUpperCase();
  const weight = item.charCodeAt(0) - (isUppercase ? 38 : 96);
  return weight;
};

// Get packages in groups of 3
const getGroupsOfThree = (packages) => {
  const groups = [];
  for (let i = 0; i < packages.length; i += 3) {
    const group = packages.slice(i, i + 3);
    groups.push(group);
  }
  return groups;
};

// Find the common item in all 3 strings in group
const findCommonItemInGroup = (group) => {
  const [first, second, third] = group;
  const firstArray = first.split("");
  const secondArray = second.split("");
  const thirdArray = third.split("");
  const commonItem = firstArray.find((item) => {
    return secondArray.includes(item) && thirdArray.includes(item);
  });
  return commonItem;
};

export const day3 = () => {
  const packages = parseFileInLines("day3/packages.txt");
  const splicedPackages = packages.map(splitPackages);

  const commonItems = splicedPackages.map(([firstHalf, secondHalf]) =>
    findCommonItem(firstHalf, secondHalf)
  );
  const weights = commonItems.map(getWeight);
  const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);
  console.log("Total weight for each line: ", totalWeight);

  const groups = getGroupsOfThree(packages);
  const commonItemsInGroups = groups.map(findCommonItemInGroup);
  const weightsInGroups = commonItemsInGroups.map(getWeight);
  const totalWeightInGroups = weightsInGroups.reduce(
    (acc, curr) => acc + curr,
    0
  );
  console.log("Total weight for each group of 3: ", totalWeightInGroups);
};
