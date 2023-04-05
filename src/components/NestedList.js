import React, { useState } from "react";
import "../components/NestedList.css"

function TreeNode({ node }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="tree-node">
      <div
        className={`tree-node-label ${hasChildren && "tree-node-label-parent"}`}
        onClick={handleClick}
      >
        {node.label}
      </div>
      {isExpanded && hasChildren && (
        <div className="tree-node-children">
          {node.children.map((child) => (
            <div className="tree-node-child">
              <TreeNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Tree({ data }) {
  return (
    <div className="tree">
      {data.map((node) => (
        <div className="tree-root">
          <TreeNode node={node} />
        </div>
      ))}
    </div>
  );
}

// Example usage
const data = [
  {
    label: "Application",
    children: [
      {
        label: "Front End",
        children: [
          { label: "React.js" },
          { label: "Material UI" },
          { label: "Bootstrap" },
        ],
      },
      { label: "Back End" },
    ],
  },
  {
    label: "Users",
    children: [
      { label: "Admin" },
      {
        label: "Guests",
        children: [
          { label: "John" },
          { label: "Rita" },
        ],
      },
    ],
  },
];

function App() {
  return (
    <div>
      <div className="animate__animated animate__fadeInLeftBig animate__delay-0.7s">
        <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
          Click on buttons
        </h2>
      </div>

      <div className="animate__animated animate__fadeInRightBig animate__delay-0.7s">
        <Tree data={data} />
      </div>
    </div>
  );
}
export default App;
