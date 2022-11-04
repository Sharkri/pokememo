import "../styles/Header.css";

export default function Header({ currentScore, bestScore }) {
  return (
    <header>
      <h1>Memory Game</h1>
      <div className="scoreboard">
        <p className="current-score">Score: {currentScore}</p>
        <p className="best-score">Best Score: {bestScore}</p>
      </div>
    </header>
  );
}
