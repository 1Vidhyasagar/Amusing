// App.js

import React, { useState } from "react";
import "./Square.css";

function App() {
  const [squares, setSquares] = useState([
    { id: 0, x: 0, y: 0, size: 500, visible: true },
  ]);

  const handleSquareClick = (clickedSquare) => {
    // Create new squares for the four quadrants of the clicked square
    const newSquares = [
      {
        id: clickedSquare.id * 4 + 1,
        x: clickedSquare.x,
        y: clickedSquare.y,
        size: clickedSquare.size / 2,
        visible: true,
      },
      {
        id: clickedSquare.id * 4 + 2,
        x: clickedSquare.x + clickedSquare.size / 2,
        y: clickedSquare.y,
        size: clickedSquare.size / 2,
        visible: true,
      },
      {
        id: clickedSquare.id * 4 + 3,
        x: clickedSquare.x,
        y: clickedSquare.y + clickedSquare.size / 2,
        size: clickedSquare.size / 2,
        visible: true,
      },
      {
        id: clickedSquare.id * 4 + 4,
        x: clickedSquare.x + clickedSquare.size / 2,
        y: clickedSquare.y + clickedSquare.size / 2,
        size: clickedSquare.size / 2,
        visible: true,
      },
    ];

    // Hide the clicked square
    const updatedSquares = squares.map((s) => {
      if (s.id === clickedSquare.id) {
        return { ...s, visible: false };
      } else {
        return s;
      }
    });

    // Add the new squares to the list
    setSquares([...updatedSquares, ...newSquares]);
  };

  return (
    <div className="App">
      {squares.map((square) => (
        <Square
          key={square.id}
          x={square.x}
          y={square.y}
          size={square.size}
          visible={square.visible}
          onClick={() => handleSquareClick(square)}
        />
      ))}
    </div>
  );
}

function Square({ x, y, size, visible, onClick }) {
  const style = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${size}px`,
    height: `${size}px`,
    display: visible ? "block" : "none",
  };

  return (
    <div className="square" style={style} onClick={onClick}>
      {size <= 50 && (
        <>
          <div className="vertical-line" />
          <div className="horizontal-line" />
        </>
      )}
    </div>
  );
}

export default App;
