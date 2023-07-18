import Card from "./Card";
import "../styles/Main.css";

export default function Main({ cards, onClick, showing }) {
  return (
    <main>
      <div className="cards">
        {cards.map((card, index) => (
          <Card
            card={card}
            key={card.id}
            onClick={() => onClick(index)}
            showing={showing}
          />
        ))}
      </div>
    </main>
  );
}
