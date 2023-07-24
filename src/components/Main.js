import Card from "./Card";
import "../styles/Main.css";

function Main({ cards, onClick, cardsShowing, scoreGoal, score }) {
  return (
    <main>
      {score < scoreGoal && (
        <p className="score-progress">
          {score}/{scoreGoal}
        </p>
      )}
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
export default Main;
