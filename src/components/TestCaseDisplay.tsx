import { KeyControl } from "./useKeyControl";
import React from "react";
import { sampleRandomInt } from "../utils";
import { useWindowSize } from "react-use";

export const colorToChinses = (color: Color): string => {
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
  texts: TextPair[];
  ans: KeyControl;
  category: string;
}

export type TestCaseDisplayProps = {
  testcase: TestCase;
};

export const TestCaseDisplay = React.memo((props: TestCaseDisplayProps) => {
  const { width, height } = useWindowSize();

  const padding = 100;
  const grid = props.testcase.texts.length * 2;

  const fontSize = Math.min(width, height) / 11;

  const divWidth = (width - 2 * padding) / grid;
  const divHeight = (height - 2 * padding) / grid;

  const textDivs = [];

  const xAnchor = sampleRandomInt(grid, props.testcase.texts.length);
  const yAnchor = sampleRandomInt(grid, props.testcase.texts.length);

  let i = 0;
  for (const text of props.testcase.texts) {
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
});
