import "../styles/Header.css";

export default function Header({ currentScore, bestScore }) {
  return (
    <header>
      <h1>Memory Game</h1>
      <div className="scoreboard">
        <p>Score: {currentScore}</p>
        <p>Best Score: {bestScore}</p>
      </div>
    </header>
  );
}
