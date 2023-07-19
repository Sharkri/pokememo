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
          <span className="poke">Poké</span>
          <span className="memo">Memo</span>
        </span>
      </h1>
      <div className="stats">
        <div className="container">
          <p className="current-score">
            Score: <b>{currentScore}</b>
          </p>
          <p className="best-score">
            Best Score: <b>{bestScore}</b>
          </p>
        </div>

        <div className="divider" />

        <div className="container">
          <p className="level">
            Level <b>{level}</b>
          </p>
          <p className="level">
            Best Level: <b>{bestLevel}</b>
          </p>
        </div>
      </div>
    </header>
  );
}
