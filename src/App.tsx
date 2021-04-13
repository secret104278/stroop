import "./App.css";

import { KeyControl, useKeyControl } from "./components/useKeyControl";
import {
  TestCase,
  TestCaseDisplay,
  colorToChinses,
} from "./components/TestCaseDisplay";
import { useEffect, useMemo, useRef, useState } from "react";

import Button from "@material-ui/core/Button";
import { ControlBar } from "./components/ControlBar";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { generateTestCases } from "./utils";
import { round } from "lodash";

const keyControlToString = (key: KeyControl) => {
  switch (key) {
    case KeyControl.Up:
      return "↑紅色";
    case KeyControl.Down:
      return "↓綠色";
    case KeyControl.Left:
      return "←紫色";
    case KeyControl.Right:
      return "→藍色";
    case KeyControl.Esc:
      return "esc拒絕";
  }
};

const testcaseShort = (testcase: TestCase) => {
  return (
    <p>
      {testcase.texts.map((x) => (
        <span style={{ color: x.color }}>{colorToChinses(x.literal)} </span>
      ))}
    </p>
  );
};

const testcasePlaintext = (testcase: TestCase) => {
  return testcase.texts
    .map((x) => `C(${colorToChinses(x.color)})T(${colorToChinses(x.literal)})`)
    .join(" ");
};

function App() {
  const testcases = useMemo(generateTestCases, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<
    { elapsedTime: number; ans: KeyControl }[]
  >([]);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(0);
  const keyPressed = useKeyControl();

  useEffect(() => {
    timerRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (keyPressed === undefined || finished) return;
    const elapsedTime = performance.now() - timerRef.current;
    setAnswerHistory((prev) => [
      ...prev,
      { elapsedTime: elapsedTime, ans: keyPressed },
    ]);
    setCurrentIndex((prev) => prev + 1);

    timerRef.current = performance.now();
  }, [finished, keyPressed]);

  useEffect(() => {
    if (currentIndex > testcases.length) {
      setFinished(true);
    }
  }, [currentIndex, testcases.length]);

  const testcase = testcases[currentIndex];
  if (!finished && testcase)
    return (
      <div className="App">
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <p>
            ({currentIndex + 1} / {testcases.length})
          </p>
          <p>
            正確答案: {keyControlToString(testcase.ans)} , 類別:{" "}
            {testcase.category}
          </p>
          <ControlBar></ControlBar>
        </div>
        <TestCaseDisplay testcase={testcase}></TestCaseDisplay>
      </div>
    );

  let correct = 0;
  answerHistory.slice(0, testcases.length - 1).forEach((history, i) => {
    if (testcases[i].ans === history.ans) correct += 1;
  });

  return (
    <div
      className="App"
      style={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        margin: "16px",
      }}
    >
      <div style={{ display: "flex", padding: "16px" }}>
        <div style={{ flex: 1 }} />
        <p style={{ paddingRight: "16px" }}>
          回答正確：{correct} / {testcases.length}
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            let text = "題號,題目,類別,正確答案,回答,結果,耗時(s)\n";
            answerHistory.slice(0, testcases.length).forEach((history, i) => {
              text += `${i + 1},${testcasePlaintext(testcases[i])},${
                testcases[i].category
              },${keyControlToString(testcases[i].ans)},${keyControlToString(
                history.ans
              )},${testcases[i].ans === history.ans ? "正確" : "錯誤"},${round(
                history.elapsedTime / 1000,
                2
              )}\n`;
            });

            const element = document.createElement("a");
            const file = new Blob([text], {
              type: "text/plain",
            });
            element.href = URL.createObjectURL(file);
            element.download = "result.csv";
            document.body.appendChild(element);
            element.click();
            element.remove();
          }}
        >
          下載 csv
        </Button>
      </div>

      <TableContainer component={Paper} style={{ flex: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow hover>
              <TableCell>題號</TableCell>
              <TableCell align="right">題目</TableCell>
              <TableCell align="right">類別</TableCell>
              <TableCell align="right">正確答案</TableCell>
              <TableCell align="right">回答</TableCell>
              <TableCell align="right">結果</TableCell>
              <TableCell align="right">耗時(s)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answerHistory.slice(0, testcases.length).map((history, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="right">
                  {testcaseShort(testcases[i])}
                </TableCell>
                <TableCell align="right">{testcases[i].category}</TableCell>
                <TableCell align="right">
                  {keyControlToString(testcases[i].ans)}
                </TableCell>
                <TableCell align="right">
                  {keyControlToString(history.ans)}
                </TableCell>
                <TableCell align="right">
                  {testcases[i].ans === history.ans ? "✅" : "❌"}
                </TableCell>
                <TableCell align="right">
                  {round(history.elapsedTime / 1000, 2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
