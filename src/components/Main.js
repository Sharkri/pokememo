import Card from "./Card";
import "../styles/Main.css";

export default function Main({ cards, onClick, cardsShowing }) {
  return (
    <main>
      <div className="cards">
        {cards.map((card, index) => (
          <Card
            card={card}
            key={card.id}
            onClick={() => onClick(index)}
            cardsShowing={cardsShowing}
          />
        ))}
      </div>
    </main>
  );
}
