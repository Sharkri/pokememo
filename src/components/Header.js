import "../styles/Header.css";

export default function Header({ currentScore, bestScore }) {
  return (
    <header>
      <h1>Memory Game</h1>
      <p>Score: {currentScore}</p>
      <p>Best Score: {bestScore}</p>
    </header>
  );
}
