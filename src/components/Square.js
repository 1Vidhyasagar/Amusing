import React, { useState } from "react";
import "./Square.css";

function App() {

  const [squares, setSquares] = useState([
    { id: 0, x: 0, y: 0, size: 300, visible: true },
  ]);

  const [previousSquares, setPreviousSquares] = useState([]);

  const handleReset = () => {
     const originalSquare = { id: 0, x: 0, y: 0, size: 300, visible: true };
     setSquares([originalSquare]);
  };

const handleResetPrevious = () => {
  if (previousSquares.length > 0) {
    const prevSquares = [...previousSquares];
    const removedSquares = prevSquares.pop();
    const originalSquare = { id: 0, x: 0, y: 0, size: 300, visible: true };

    const updatedSquares = removedSquares.map((s) => {
      if (s.id === originalSquare.id) {
        return { ...s, visible: true };
      } else {
        return s;
      }
    });
    setSquares([...updatedSquares]);
    setPreviousSquares(prevSquares);
  }
};

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
   setPreviousSquares([...previousSquares, [...updatedSquares]]);
    setSquares([...updatedSquares, ...newSquares]);
  };


  return (
    <div className="animate__animated animate__zoomInDown animate__delay-0.7s">
      {squares.map((square) => (
        <Square
          key={square.id}
          x={square.x}
          y={square.y}
          size={square.size}
          visible={square.visible}
          onClick={() => handleSquareClick(square)}
        />
      ))}{" "}
      <div>
        <h2 style={{ textAlign: "center" }}>Click in the square box</h2>
      </div>
      <button
        onClick={handleResetPrevious}
        style={{ marginLeft: "550px", marginTop: "300px" }}
      >
        Reset Previous
      </button>
      <button
        onClick={handleReset}
        style={{ marginLeft: "550px", marginTop: "3px" }}
      >
        Reset all
      </button>
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
    <div
      className="square"
      style={style}
      onClick={onClick}
    >
      {size <= 0 && (
        <>
          <div className="vertical-line" />
          <div className="horizontal-line" />
        </>
      )}
      
    </div>
  );
}

export default App;


//Trials
// const [originalSquare] = useState(squares[squares.length - 1]);

// const handleReset = () => {
//   setSquares([originalSquare]);
// };

// const handleResetPrevious = ()=>{

// };