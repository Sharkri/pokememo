import "../styles/Card.css";
import Tilt from "react-parallax-tilt";

export default function Card({ card, onClick, showing }) {
  return (
    <Tilt
      tiltReverse
      reset
      glareEnable={card.shiny}
      glareMaxOpacity={0.4}
      glareColor="#f1b818"
      glarePosition="all"
    >
      <div className={`card-container ${showing ? "front" : "back"}`}>
        <div className="card-inner">
          <div className="card-front">
            <button className="card" data-shiny={card.shiny} onClick={onClick}>
              <img
                src={card.image}
                alt={card.name}
                className="card-image"
                draggable="false"
              />
              <p className="card-name">
                <span className="sparkles">{card.shiny && "✨ "}</span>
                <span className="name">{card.name}</span>
                <span className="sparkles">{card.shiny && " ✨"}</span>
              </p>
            </button>
          </div>
          <div className="card-back">
            <img
              src={`${process.env.PUBLIC_URL}/card-back.png`}
              alt="pokemon card back"
              className="back"
            />
          </div>
        </div>
      </div>
    </Tilt>
  );
}
