import Card from "./Card";
import "../styles/Main.css";

export default function Main({ cards, onClick }) {
  return (
    <main>
      {cards.map((card, index) => (
        <Card
          image={card.image}
          name={card.name}
          key={card.id}
          index={index}
          onClick={onClick}
        />
      ))}
    </main>
  );
}
