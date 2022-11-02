export default function Card({ image, name }) {
  return (
    <div className="card">
      <img src={image} alt={`Flag of ${name}`} className="flag" />
      <p>{name}</p>
    </div>
  );
}
