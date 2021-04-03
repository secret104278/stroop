import { useWindowSize } from "react-use";

const colorToChinses = (color: Color): string => {
  switch (color) {
    case "red":
      return "紅色";
    case "purple":
      return "紫色";
    case "blue":
      return "藍色";
    case "green":
      return "綠色";
    case "brown":
      return "棕色";
  }
};

export type Color = "red" | "purple" | "blue" | "green" | "brown";

export interface TextPair {
  literal: Color;
  color: Color;
}

export interface TestCase {
  texts: [TextPair, TextPair, TextPair, TextPair, TextPair];
}

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const sampleRandomInt = (max: number, length: number): number[] => {
  const set = new Set<number>();
  while (set.size < length) {
    set.add(getRandomInt(max));
  }
  return Array.from(set.values());
};

export const TestCaseDisplay = (testcase: TestCase) => {
  const { width, height } = useWindowSize();

  const padding = 60;
  const grid = 10;

  const fontSize = Math.min(width, height) / 10;

  const divWidth = (width - 2 * padding) / grid;
  const divHeight = (height - 2 * padding) / grid;

  const textDivs = [];

  const xAnchor = sampleRandomInt(grid, testcase.texts.length);
  const yAnchor = sampleRandomInt(grid, testcase.texts.length);

  let i = 0;
  for (const text of testcase.texts) {
    textDivs.push(
      <div
        style={{
          position: "absolute",
          left: padding + divWidth * xAnchor[i],
          top: padding + divHeight * yAnchor[i],
          fontSize: fontSize,
          color: text.color,
        }}
      >
        {colorToChinses(text.literal)}
      </div>
    );
    i++;
  }

  return <div style={{ position: "relative" }}>{textDivs}</div>;
};
