import React, { useState } from "react";
import Problem1 from "../src/components/Transfer";
import Problem2 from "../src/components/NestedList";
import Problem3 from "../src/components/Infinite";
import Problem4 from "../src/components/Game"
import Problem5 from "../src/components/Square";
import "animate.css";
import "./App.css"


function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Problem 1":
        return <Problem1 />;
      case "Problem 2":
        return <Problem2 />;
      case "Problem 3":
        return <Problem3 />;
      case "Problem 4":
        return <Problem4 />;
      case "Problem 5":
        return <Problem5 />;

      default:
        return null;
    }
  };
 
  return (
    <div className=" animate__animated animate__fadeInUpBig animate__delay-0.5s ">
      <div className="container">
        <div className="animate__animated animate__flash animate__slower animate__infinite animate__delay-0.1s">
          <p className="flash">click the buttons to the right & unleash power! &nbsp;
          </p>
        </div>
        <button onClick={() => handleButtonClick("Problem 1")}>
          Problem 1
        </button>
        <button onClick={() => handleButtonClick("Problem 2")}>
          Problem 2
        </button>
        <button onClick={() => handleButtonClick("Problem 3")}>
          Problem 3
        </button>{" "}
        <button onClick={() => handleButtonClick("Problem 4")}>
          Problem 4
        </button>{" "}
        <button onClick={() => handleButtonClick("Problem 5")}>
          Problem 5
        </button>
      </div>
      {renderActiveComponent()}
    </div>
  );
}

export default App;

