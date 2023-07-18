import "../styles/Card.css";
import Tilt from "react-parallax-tilt";

export default function Card({ image, name, onClick, showing }) {
  return (
    <Tilt>
      <button className={`card ${showing ? "" : "hide"}`} onClick={onClick}>
        <img src={image} alt={name} className="card-image" draggable="false" />
        <p className="card-name">{name}</p>
      </button>
    </Tilt>
  );
}
