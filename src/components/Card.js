import "../styles/Card.css";

export default function Card({ image, name, onClick, index }) {
  return (
    <button className="card" onClick={onClick} data-index={index}>
      <img
        src={image}
        alt={`Flag of ${name}`}
        className="flag"
        draggable="false"
      />
      <p className="card-name">{name}</p>
    </button>
  );
}
