import React, { useState, useEffect } from "react";
import SavedCard from "./SavedCard";
import "../styles/list.css";

const initialFestivities = [
  {
    id: 0,
    title: "Boston Cream Pie Day",
    date: "23 Oct",
    country: "us",
    img: "https://www.daysoftheyear.com/wp-content/uploads/boston-cream-pie-day1-scaled.jpg",
    description:
      "Celebra el delicioso postre que se ha convertido en un ícono estadounidense, con crema pastelera, bizcocho y glaseado de chocolate.",
  },
  {
    id: 1,
    title: "Food Day",
    date: "24 Oct",
    country: "us",
    img: "https://www.daysoftheyear.com/wp-content/uploads/food-day1-scaled.jpg",
    description:
      "Un día para reflexionar sobre la importancia de los alimentos saludables y sostenibles. ¡Come bien, vive mejor!",
  },
  {
    id: 2,
    title: "Earth Day",
    date: "22 Abr",
    country: "us",
    img: "https://www.daysoftheyear.com/wp-content/uploads/earth-day1-scaled.jpg",
    description:
      "Celebra la belleza del planeta y promueve acciones para proteger el medio ambiente y luchar contra el cambio climático.",
  },
];

export default function SavedList() {
  const [savedFestivities, setSavedFestivities] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedFestivities")) || [];
    setSavedFestivities(stored);
  }, []);

  const toggleSave = (id) => {
    let updated = [...savedFestivities];
    if (updated.includes(id)) {
      updated = updated.filter((i) => i !== id);
    } else {
      updated.push(id);
    }
    setSavedFestivities(updated);
    localStorage.setItem("savedFestivities", JSON.stringify(updated));
  };

  return (
    <div className="saved-container">
      <h1>Festividades Guardadas</h1>
      <div className="saved-list">
        {initialFestivities
          .filter((fest) => savedFestivities.includes(fest.id))
          .map((fest) => (
            <SavedCard key={fest.id} fest={fest} toggleSave={toggleSave} saved />
          ))}
      </div>
    </div>
  );
}
