import { KeyControl, useKeyControl } from "./useKeyControl";

export const ControlBar = () => {
  const hstyle = { flex: 1 };

  const keyPressed = useKeyControl();

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
      <p
        style={{
          ...hstyle,
          color: keyPressed === KeyControl.Up ? "black" : "gray",
        }}
      >
        ↑紅色
      </p>
      <p
        style={{
          ...hstyle,
          color: keyPressed === KeyControl.Down ? "black" : "gray",
        }}
      >
        ↓綠色
      </p>
      <p
        style={{
          ...hstyle,
          color: keyPressed === KeyControl.Left ? "black" : "gray",
        }}
      >
        ←紫色
      </p>
      <p
        style={{
          ...hstyle,
          color: keyPressed === KeyControl.Right ? "black" : "gray",
        }}
      >
        →藍色
      </p>
      <p
        style={{
          ...hstyle,
          color: keyPressed === KeyControl.Esc ? "black" : "gray",
        }}
      >
        esc拒絕
      </p>
    </div>
  );
};
