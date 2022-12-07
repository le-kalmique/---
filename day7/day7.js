import { parseFileInLines } from "../general.js";

const buildTree = (lines) => {
  const tree = {
    name: "/",
    isDir: true,
    children: [],
    size: undefined,
    parent: undefined,
  };

  let curNode = tree;
  let curCommand = null;

  lines.forEach((line) => {
    if (line[0] === "$") {
      // command
      const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line);

      curCommand = match.groups.command;

      if (curCommand === "cd") {
        const target = match.groups.arg;
        switch (target) {
          case "/":
            curNode = tree;
            break;
          case "..":
            curNode = curNode.parent;
            break;
          default:
            curNode = curNode.children.find(
              (folder) => folder.isDir && folder.name === target
            );
        }
      }
    } else if (curCommand === "ls") {
      const match =
        /(?<size>\d+)? ?(?<type>dir)? (?<name>[\w.]+)(?! [\w.]+)/.exec(line);
      if (match) {
        const node = {
          name: match.groups.name,
          size: match.groups.size ? parseInt(match.groups.size) : undefined,
          isDir: match.groups.type === "dir",
          children: match.groups.type === "dir" ? [] : undefined,
          parent: curNode,
        };
        curNode.children.push(node);
      }
    }
  });

  return tree;
};

const getSize = (node, checkTreshold) => {
  if (!node.isDir) return node.size;

  const dirSize = node.children
    .map((child) => getSize(child, checkTreshold))
    .reduce((size, childSize) => size + childSize, 0);

  if (checkTreshold) checkTreshold(node.name, dirSize);

  return dirSize;
};

export const day7 = () => {
  const lines = parseFileInLines("day7/text.txt");

  // CONSTANTS
  const threshold = 100_000;
  const totalSpace = 70_000_000;
  const requiredSpace = 30_000_000;

  const tree = buildTree(lines);

  let smallFolderSizeSum = 0;
  const candidates = [];

  const usedSpace = getSize(tree, (_, size) => {
    if (size < threshold) {
      smallFolderSizeSum += size;
    }
  });
  const availableSpace = totalSpace - usedSpace;
  const minDirSize = requiredSpace - availableSpace;

  getSize(tree, (name, size) => {
    if (size >= minDirSize) candidates.push({ name, size });
  });
  candidates.sort((a, b) => a.size - b.size);

  console.log("Day 7");
  console.log("Sum of small folder sizes: ", smallFolderSizeSum);
  console.log("Size of the first candidate: ", candidates[0].size);
};
