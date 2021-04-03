import { useEffect, useState } from "react";

import { useKeyPress } from "react-use";

export enum KeyControl {
  Up,
  Down,
  Left,
  Right,
  Esc,
}

export const useKeyControl = (): KeyControl | undefined => {
  const [current, setCurrent] = useState<KeyControl | undefined>(undefined);

  const upPressed = useKeyPress("ArrowUp")[0];
  const downPressed = useKeyPress("ArrowDown")[0];
  const leftPressed = useKeyPress("ArrowLeft")[0];
  const rightPressed = useKeyPress("ArrowRight")[0];
  const escPressed = useKeyPress("Escape")[0];

  useEffect(() => {
    if (upPressed) {
      setCurrent(KeyControl.Up);
    } else if (downPressed) {
      setCurrent(KeyControl.Down);
    } else if (leftPressed) {
      setCurrent(KeyControl.Left);
    } else if (rightPressed) {
      setCurrent(KeyControl.Right);
    } else if (escPressed) {
      setCurrent(KeyControl.Esc);
    } else {
      setCurrent(undefined);
    }
  }, [downPressed, escPressed, leftPressed, rightPressed, upPressed]);

  return current;
};
