import { parseFileInLines } from "../general.js";

const getOnlyStackLines = (allLines) => {
  const lines = [];
  for (const line of allLines) {
    if (line.charAt(1) === "1") {
      break;
    }
    lines.push(line);
  }
  return lines;
};

const crateContent = (crate) => crate.charAt(1);

const parseStacks = (stackLines) => {
  const rows = [];
  for (const line of stackLines) {
    rows.push(line.split(" "));
  }
  rows.reverse();
  const amountOfStacks = rows[0].length;
  const stacks = Array(amountOfStacks)
    .fill(0)
    .map(() => new Array());

  for (const row of rows) {
    row.forEach((crate, i) => {
      if (crateContent(crate) !== ".") {
        stacks[i].push(crateContent(crate));
      }
    });
  }
  return stacks;
};

const followInstructionsPart2 = (stacks, instruction) => {
  const [amount, from, to] = parseInstruction(instruction);
  try {
    const crates = stacks[from - 1].splice(-amount);
    stacks[to - 1].push(...crates);
  } catch (e) {
    console.log(`Error: ${e}`, amount, stacks, to);
  }
};

const followinstructionsPart1 = (stacks, instruction) => {
  const [amount, from, to] = parseInstruction(instruction);
  for (let i = 0; i < amount; i++) {
    const crate = stacks[from - 1].pop();
    stacks[to - 1].push(crate);
  }
};

const parseInstruction = (instructionLine) => {
  const regex = new RegExp(/move (\d+) from (\d+) to (\d+)/);
  const [, amount, from, to] = instructionLine.match(regex);
  return [Number(amount), Number(from), Number(to)];
};

const getTopElementFromStack = (stack) => {
  return stack[stack.length - 1];
};

/**
 * @param {'1' | '2'} part - part of the task
 */
export const day5 = (part) => {
  const lines = parseFileInLines("day5/crates.txt");
  const stackLines = getOnlyStackLines(lines);
  const stacks = parseStacks(stackLines);
  const instructions = lines.splice(10);

  if (part === "1") {
    instructions.forEach((instruction) =>
      followinstructionsPart1(stacks, instruction)
    );
  } else {
    instructions.forEach((instruction) =>
      followInstructionsPart2(stacks, instruction)
    );
  }

  const topElements = stacks.map(getTopElementFromStack);
  console.log(`Top elements in stacks (part ${part}): `, topElements.join(""));
};
