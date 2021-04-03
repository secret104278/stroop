import { KeyControl, useKeyControl } from "./useKeyControl";

export const ControlBar = () => {
  const hstyle = { flex: 1 };

  const keyPressed = useKeyControl();

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          ...hstyle,
          color: keyPressed === KeyControl.Up ? "black" : "gray",
        }}
      >
        ↑紅色
      </div>
      <div
        style={{
          ...hstyle,
          color: keyPressed === KeyControl.Down ? "black" : "gray",
        }}
      >
        ↓綠色
      </div>
      <div
        style={{
          ...hstyle,
          color: keyPressed === KeyControl.Left ? "black" : "gray",
        }}
      >
        ←紫色
      </div>
      <div
        style={{
          ...hstyle,
          color: keyPressed === KeyControl.Right ? "black" : "gray",
        }}
      >
        →藍色
      </div>
      <div
        style={{
          ...hstyle,
          color: keyPressed === KeyControl.Esc ? "black" : "gray",
        }}
      >
        esc拒絕
      </div>
    </div>
  );
};
