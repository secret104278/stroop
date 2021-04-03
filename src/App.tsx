import "./App.css";

import { ControlBar } from "./components/ControlBar";
import { TestCaseDisplay } from "./components/TestCaseDisplay";

function App() {
  return (
    <div className="App">
      <ControlBar></ControlBar>
      <TestCaseDisplay
        texts={[
          { literal: "brown", color: "blue" },
          { literal: "green", color: "purple" },
          { literal: "brown", color: "green" },
          { literal: "red", color: "red" },
          { literal: "blue", color: "blue" },
        ]}
      ></TestCaseDisplay>
    </div>
  );
}

export default App;
