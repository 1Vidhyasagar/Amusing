import React, { useState, useEffect, useRef } from "react";
import "../components/Inf.css";

async function fetchData(page) {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}`
  );
  const json = await response.json();
  const newItems = json.map((item) => ({
    id: item.id,
    title: "Cat",
    thumbnail: item.url,
    description: "",
  }));
  return newItems;
}

function ItemList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    const currentRef = loadingRef.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    fetchData(page).then((newItems) => {
      setItems((prevItems) => [...prevItems, ...newItems]);
    });
  }, [page]);

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className="item">
          <h2>{item.title}</h2>
          <img src={item.thumbnail} alt={item.title} />
          <p>{item.description}</p>
        </div>
      ))}
      <div ref={loadingRef}>Loading...</div>
    </div>
  );
}

export default ItemList;
