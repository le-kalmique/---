import fs from "fs";

const parseFileInLines = (fileName) => {
  const file = fs.readFileSync(fileName, "utf-8");
  const lines = file.split("\n");
  return lines;
};

export { parseFileInLines };
