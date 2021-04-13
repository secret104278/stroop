import { Color, TestCase } from "./components/TestCaseDisplay";
import { sampleSize, shuffle, uniq, zip } from "lodash";

import { KeyControl } from "./components/useKeyControl";

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const sampleRandomInt = (max: number, length: number): number[] => {
  const set = new Set<number>();
  while (set.size < length) {
    set.add(getRandomInt(max));
  }
  return Array.from(set.values());
};

const availableColor: Color[] = ["red", "purple", "blue", "green", "brown"];

// len = 16
const towThreeNoSameBrownCases: Color[][] = [
  // no red
  ["purple", "purple", "blue", "green", "brown"],
  ["purple", "blue", "blue", "green", "brown"],
  ["purple", "blue", "green", "green", "brown"],
  // no purple
  ["red", "red", "blue", "green", "brown"],
  ["red", "blue", "blue", "green", "brown"],
  ["red", "blue", "green", "green", "brown"],
  // no blue
  ["red", "purple", "green", "green", "brown"],
  ["red", "purple", "purple", "green", "brown"],
  ["red", "red", "purple", "green", "brown"],
  // no green
  ["red", "red", "purple", "blue", "brown"],
  ["red", "purple", "purple", "blue", "brown"],
  ["red", "purple", "blue", "blue", "brown"],
  // no brown
  ["red", "red", "purple", "blue", "green"],
  ["red", "purple", "purple", "blue", "green"],
  ["red", "purple", "blue", "blue", "green"],
  ["red", "purple", "blue", "green", "green"],
];

// len = 4
const towThreeDoubleBrownCases: Color[][] = [
  // no red
  ["purple", "blue", "green", "brown", "brown"],
  // no purple
  ["red", "blue", "green", "brown", "brown"],
  // no blue
  ["red", "purple", "green", "brown", "brown"],
  // no green
  ["red", "purple", "blue", "brown", "brown"],
];

// len = 30
const twoTwoOneCases: Color[][] = [
  //
  ["blue", "blue", "green", "green", "brown"],
  ["blue", "green", "green", "brown", "brown"],
  ["blue", "blue", "green", "brown", "brown"],
  //
  ["purple", "purple", "green", "green", "brown"],
  ["purple", "green", "green", "brown", "brown"],
  ["purple", "purple", "green", "brown", "brown"],
  //
  ["purple", "purple", "blue", "blue", "brown"],
  ["purple", "blue", "blue", "brown", "brown"],
  ["purple", "purple", "blue", "brown", "brown"],
  //
  ["purple", "purple", "blue", "blue", "green"],
  ["purple", "blue", "blue", "green", "green"],
  ["purple", "purple", "blue", "green", "green"],
  //
  ["red", "red", "green", "green", "brown"],
  ["red", "green", "green", "brown", "brown"],
  ["red", "red", "green", "brown", "brown"],
  //
  ["red", "red", "blue", "blue", "brown"],
  ["red", "blue", "blue", "brown", "brown"],
  ["red", "red", "blue", "brown", "brown"],
  //
  ["red", "red", "blue", "blue", "green"],
  ["red", "blue", "blue", "green", "green"],
  ["red", "red", "blue", "green", "green"],
  //
  ["red", "red", "purple", "purple", "brown"],
  ["red", "purple", "purple", "brown", "brown"],
  ["red", "red", "purple", "brown", "brown"],
  //
  ["red", "red", "purple", "purple", "green"],
  ["red", "purple", "purple", "green", "green"],
  ["red", "red", "purple", "green", "green"],
  //
  ["red", "red", "purple", "purple", "blue"],
  ["red", "purple", "purple", "blue", "blue"],
  ["red", "red", "purple", "blue", "blue"],
];

const colorToKeyControl = (c: Color): KeyControl => {
  switch (c) {
    case "red":
      return KeyControl.Up;
    case "green":
      return KeyControl.Down;
    case "purple":
      return KeyControl.Left;
    case "blue":
      return KeyControl.Right;
    case "brown":
      return KeyControl.Esc;
  }
};

const toTestCase = (literals: Color[], colors: Color[]): TestCase => {
  const map = new Map<Color, boolean>();
  let duplicated: Color | undefined = undefined;

  for (const x of literals) {
    if (map.get(x)) {
      duplicated = x;
      break;
    }
    map.set(x, true);
  }

  if (!duplicated) throw Error("#112");

  return {
    texts: zip(literals, colors).map(([x, y]) => ({ literal: x!, color: y! })),
    ans: colorToKeyControl(duplicated),
    category:
      uniq(colors).length === 5
        ? "一般命中"
        : duplicated === "brown"
        ? "正確拒絕"
        : "虛警",
  };
};

function sampleSizeDuplicate<T>(arr: T[], size: number): T[] {
  let res: T[] = [];
  for (let i = 0; i < Math.floor(size / arr.length); i++) {
    res = res.concat(arr);
  }

  const left = size % arr.length;
  res = res.concat(sampleSize(arr, left));

  return res;
}

export const generateTestCases = (): TestCase[] => {
  const a = 34;
  const b = 33;
  const c = 33;

  let testcases: TestCase[] = [];

  testcases = testcases.concat(
    shuffle(
      sampleSizeDuplicate(
        [...towThreeNoSameBrownCases, ...towThreeDoubleBrownCases],
        a
      )
    ).map((x) => toTestCase(x, availableColor))
  );

  testcases = testcases.concat(
    zip(
      shuffle(sampleSizeDuplicate(towThreeNoSameBrownCases, b)),
      shuffle(
        sampleSizeDuplicate(
          [
            ...twoTwoOneCases,
            ...towThreeNoSameBrownCases,
            ...towThreeDoubleBrownCases,
          ],
          b
        )
      )
    ).map(([x, y]) => toTestCase(x!, y!))
  );

  testcases = testcases.concat(
    zip(
      shuffle(sampleSizeDuplicate(towThreeDoubleBrownCases, c)),
      shuffle(
        sampleSizeDuplicate(
          [
            ...twoTwoOneCases,
            ...towThreeNoSameBrownCases,
            ...towThreeDoubleBrownCases,
          ],
          c
        )
      )
    ).map(([x, y]) => toTestCase(x!, y!))
  );

  return shuffle(testcases);
};
