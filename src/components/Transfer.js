import React, { useState } from "react";
import "../components/Transfer.css";

function Bucket({ title, items, selectedItems, onChange }) {
  const handleSelect = (item) => {
    if (selectedItems.includes(item)) {
      onChange(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      onChange([...selectedItems, item]);
    }
  };

  return (
    <div className="bucket"> 
      <h3>{title}</h3>
      {items.map((item) => (
        <label
          key={item}
          className={`itemA ${selectedItems.includes(item) ? "selected" : ""}`}
        >
          <button type="button" onClick={() => handleSelect(item)}>
            {item}
          </button>
        </label>
      ))}
    </div>
  );
}


function Transfer() {
  const [items1, setItems1] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Orange",
    "Mango",
    "Papaya",
  ]);
  const [items2, setItems2] = useState([]);
  const [selectedItems1, setSelectedItems1] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);

  const handleSelect1 = (selectedItems) => {
    setSelectedItems1(selectedItems);
  };

  const handleSelect2 = (selectedItems) => {
    setSelectedItems2(selectedItems);
  };

  const handleAdd = () => {
    setItems2([...items2, ...selectedItems1]);
    setItems1(items1.filter((item) => !selectedItems1.includes(item)));
    setSelectedItems1([]);
  };

  const handleAddAll = () => {
    setItems2([...items2, ...items1]);
    setItems1([]);
    setSelectedItems1([]);
  };

  const handleRemove = () => {
    setItems1([...items1, ...selectedItems2]);
    setItems2(items2.filter((item) => !selectedItems2.includes(item)));
    setSelectedItems2([]);
  };

  const handleRemoveAll = () => {
    setItems1([...items1, ...items2]);
    setItems2([]);
    setSelectedItems2([]);
  };

  return (
    <div>
      <div className="animate__animated animate__fadeInDownBig animate__delay-0.5s">
        <h2
          style={{ fontWeight: "bold", textAlign: "center", marginTop: "15px" }}
        >
          You can transfer the items in buckets
        </h2>
      </div>

      <div className="transfer">
        <div className="animate__animated animate__fadeInLeftBig animate__delay-1s transfer">
          <Bucket
            title="Bucket 1"
            items={items1}
            selectedItems={selectedItems1}
            onChange={handleSelect1}
          />
        </div>

        <div className="animate__animated animate__zoomIn animate__delay-2s buttons">
          <button type="button" onClick={handleAdd}>
            Add
          </button>
          <button type="button" onClick={handleAddAll}>
            Add All
          </button>
          <button type="button" onClick={handleRemove}>
            Remove
          </button>
          <button type="button" onClick={handleRemoveAll}>
            Remove All
          </button>
        </div>
        <div className="animate__animated animate__fadeInRightBig animate__delay-1s transfer">
          <Bucket
            title="Bucket 2"
            items={items2}
            selectedItems={selectedItems2}
            onChange={handleSelect2}
          />
        </div>
      </div>
    </div>
  );
}


export default Transfer;
