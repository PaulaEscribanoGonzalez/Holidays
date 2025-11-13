import React from "react";
import SavedList from "../components/SavedList";
import Calendar from "../components/Calendar";

export default function Home() {
  return (
    <div className="home-page">
      <h1>Bienvenido a Festividades</h1>
      <SavedList />
      <Calendar />
    </div>
  );
}
