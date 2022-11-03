import "../styles/Card.css";

export default function Card({ image, name, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img
        src={image}
        alt={`Flag of ${name}`}
        className="flag"
        draggable="false"
      />
      <p className="card-name">{name}</p>
    </div>
  );
}
