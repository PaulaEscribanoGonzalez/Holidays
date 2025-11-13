import React from "react";

export default function SavedCard({ fest, toggleSave, saved }) {
  return (
    <div className="saved-card">
      <button
        className={`save-btn ${saved ? "saved" : ""}`}
        onClick={() => toggleSave(fest.id)}
        aria-label="Guardar"
      >
        <span className="material-icons">{saved ? "bookmark" : "bookmark_border"}</span>
      </button>

      <div className="image-container">
        <img src={fest.img} alt={fest.title} />
      </div>

      <div className="saved-info">
        <div className="saved-header">
          <h3>{fest.title}</h3>
          <div className="saved-badge">
            <span>{fest.date}</span>
            <img
              className="flag"
              src={`https://flagcdn.com/${fest.country}.svg`}
              alt={fest.country.toUpperCase()}
            />
          </div>
        </div>
        <p className="saved-description">{fest.description}</p>
      </div>
    </div>
  );
}
