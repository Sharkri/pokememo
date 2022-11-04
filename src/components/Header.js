import "../styles/Header.css";

export default function Header({ currentScore, bestScore, level }) {
  return (
    <header>
      <h1>Memory Game</h1>
      <div className="stats">
        <p className="current-score">Score: {currentScore}</p>|
        <p className="best-score">Best Score: {bestScore}</p>|
        <p className="level">Level {level}</p>
      </div>
    </header>
  );
}
