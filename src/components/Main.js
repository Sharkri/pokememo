import Card from "./Card";
import "../styles/Main.css";

export default function Main({ cards, onClick, showing }) {
  return (
    <main>
      <div className="cards">
        {cards.map((card, index) => (
          <Card
            image={card.image}
            name={card.name}
            key={card.id}
            index={index}
            onClick={() => onClick(index)}
            showing={showing}
          />
        ))}
      </div>
    </main>
  );
}
