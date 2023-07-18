import "../styles/Card.css";
import Tilt from "react-parallax-tilt";

export default function Card({ image, name, onClick, showing }) {
  return (
    <Tilt tiltReverse reset>
      <div className={`card-container ${showing ? "front" : "back"}`}>
        <div className="card-inner">
          <div className="card-front">
            <button className="card" onClick={onClick}>
              <img
                src={image}
                alt={name}
                className="card-image"
                draggable="false"
              />
              <p className="card-name">{name}</p>
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
