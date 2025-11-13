import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Holiday from "./pages/Holiday";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/holiday/:id" element={<Holiday />} />
    </Routes>
  );
}

export default App;
