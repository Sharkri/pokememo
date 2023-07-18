import Card from "./Card";
import "../styles/Main.css";

export default function Main({ cards, onClick, showing }) {
  return (
    <main>
      <p className="game-instructions">
        Get points by clicking on a Pokémon but don't click on any more than
        once.
      </p>
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
