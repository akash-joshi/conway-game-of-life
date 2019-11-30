import React, { useState, useEffect, useRef } from "react";

const giveStart = (rows, cols) =>
  new Array(rows)
    .fill(0)
    .map(() =>
      new Array(cols).fill(0).map(() => Math.floor(Math.random() * 2))
    );

const countNeighbors = (myArray, x, y) => {
  let count = 0;
  if (myArray[x - 1] && myArray[x - 1][y]) count++;
  if (myArray[x - 1] && myArray[x - 1][y + 1]) count++;
  if (myArray[x - 1] && myArray[x - 1][y - 1]) count++;
  if (myArray[x + 1] && myArray[x + 1][y]) count++;
  if (myArray[x + 1] && myArray[x + 1][y + 1]) count++;
  if (myArray[x + 1] && myArray[x + 1][y - 1]) count++;
  if (myArray[x][y + 1]) count++;
  if (myArray[x][y - 1]) count++;
  return count;
};

const initArray = giveStart(50, 50);

const nextState = prevState =>
  prevState.map((row, x) =>
    row.map((el, y) => {
      const count = countNeighbors(prevState, x, y);
      if (count > 3 || count < 2) return 0;
      if (count == 3 && !el) return 1;
      if ((count == 2 || count == 3) && el) return 1;
      return el;
    })
  );

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const One = () => (
  <div
    style={{ width: "50px", height: "50px", border: "1px solid black" }}
  ></div>
);

const Zero = () => (
  <div
    style={{ width: "50px", height: "50px", border: "1px solid black", backgroundColor: "black" }}
  ></div>
);

function App() {
  const [board, setBoard] = useState(initArray);

  useInterval(() => {
    setBoard(nextState(board));
  }, 70);

  return (
    <div>
      <table>
        <tbody>
          {board.map((row, index) => (
            <tr key={index}>
              {row.map((el, index) => (
                <td key={index}>{el ? <One /> : <Zero />}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
