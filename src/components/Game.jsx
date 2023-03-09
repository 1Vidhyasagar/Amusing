import React, { useState, useEffect } from "react";

const Game = () => {
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let timerId;
    if (isGameRunning) {
      // start game
      setTimeLeft(60);
      setScore(0);
      setBoxes(Array(9).fill(""));
      timerId = setInterval(() => {
        // randomly select a box to flash
        const randomIndex = Math.floor(Math.random() * 9);
        setBoxes((prevBoxes) => {
          const newBoxes = [...prevBoxes];
          newBoxes[randomIndex] = "HIT";
          setTimeout(() => {
            // remove flashing after 1 second
            newBoxes[randomIndex] = "";
            setBoxes(newBoxes);
          }, 1000);
          return newBoxes;
        });
      }, 2000);
    }
    return () => clearInterval(timerId);
  }, [isGameRunning]);

  useEffect(() => {
    let timerId;
    if (isGameRunning) {
      timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 1) {
            // game over, stop game
            clearInterval(timerId);
            setIsGameRunning(false);
            // show score in alert
            alert(`Game over! Your score is ${score}`);
            // reset score and time left
            setScore(0);
            setTimeLeft(60);
            // reset boxes
            setBoxes(Array(9).fill(""));
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isGameRunning, score]);

  const handleStart = () => {
    setIsGameRunning(true);
  };

  const handleStop = () => {
    setIsGameRunning(false);
  };

  const handleClick = (index) => {
    if (boxes[index] === "HIT") {
      setScore((prevScore) => prevScore + 5);
    } else {
      setScore((prevScore) => prevScore - 2.5);
    }
    setBoxes((prevBoxes) => {
      const newBoxes = [...prevBoxes];
      newBoxes[index] = "";
      return newBoxes;
    });
  };

  return (
    <div  style={{textAlign:"center"}}>
      <h1>Hit the Box!</h1>
      {!isGameRunning && <button onClick={handleStart}>Start Game</button>}
      {isGameRunning && (
        <>
          <p>Time left: {timeLeft}</p>
          <p>Score: {score}</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
              gap: "5px",
              width: "350px",
              margin: "0 auto",
            }}
          >
            {boxes.map((value, index) => (
              <div
                key={index}
                style={{
                  height: 100,
                  backgroundColor: value === "HIT" ? "gray" : "gray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleClick(index)}
              >
                {value}
              </div>
            ))}
          </div>
          <button onClick={handleStop}>Stop Game</button>
        </>
      )}
    </div>
  );
};

export default Game;

