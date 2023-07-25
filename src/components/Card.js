import { useEffect, useState } from "react";
import "../styles/Card.css";
import Tilt from "react-parallax-tilt";

export default function Card({ card, onClick, cardsShowing }) {
  const ANIMATION_TIME = 850;
  const [interactable, setInteractable] = useState(false);

  useEffect(() => {
    setTimeout(() => setInteractable(true), ANIMATION_TIME);
  }, []);

  return (
    <Tilt
      tiltReverse
      reset
      glareEnable={card.shiny || true}
      glareMaxOpacity={0.4}
      glareColor={card.shiny ? "#f1b818" : "#fff"}
      glarePosition="all"
      className={`card-container ${cardsShowing ? "front" : "back"} ${
        cardsShowing && interactable ? undefined : "pointer-events-none"
      }`}
    >
      <div className="card-inner">
        <div className="card-front">
          <button className="card" data-shiny={card.shiny} onClick={onClick}>
            {card.shiny && <div className="shiny-symbol" />}

            <img
              src={card.image}
              alt={card.name}
              className="card-image"
              draggable="false"
            />
            <p className="card-name">
              <span className="name">{card.name}</span>
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
    </Tilt>
  );
}
