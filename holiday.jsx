import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SavedList from "../components/SavedList";

const festivities = [
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

export default function Holiday() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fest = festivities.find((f) => f.id === parseInt(id));

  if (!fest) return <div>Festividad no encontrada</div>;

  return (
    <div className="holiday-page">
      <button onClick={() => navigate(-1)}>← Volver</button>
      <h1>{fest.title}</h1>
      <img src={fest.img} alt={fest.title} className="holiday-img" />
      <p>{fest.description}</p>
      <p>
        Fecha: {fest.date} | País: {fest.country.toUpperCase()}
      </p>
    </div>
  );
}
