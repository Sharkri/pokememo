export default function Card({ image, title }) {
  return (
    <div className="card">
      <img src={image} alt={`Flag of ${title}`} className="flag" />
      <p>{title}</p>
    </div>
  );
}
