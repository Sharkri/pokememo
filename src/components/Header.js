import "../styles/Header.css";

export default function Header({ currentScore, bestScore, level, bestLevel }) {
  return (
    <header>
      <h1>
        <img
          src={`${process.env.PUBLIC_URL}/pokeball.png`}
          alt="pokeball"
          className="pokeball"
        />
        <span>
          <span class="poke">Poké</span>
          <span className="memo">Memo</span>
        </span>
      </h1>
      <div className="stats">
        <p className="current-score">Score: {currentScore}</p>|
        <p className="best-score">Best Score: {bestScore}</p>|
        <p className="level">Level {level}</p>|
        <p className="level">Best Level Reached: {bestLevel}</p>
      </div>
    </header>
  );
}
