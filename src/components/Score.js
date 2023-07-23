import "../styles/Score.css";

export default function Score({ currentScore, bestScore, level, bestLevel }) {
  return (
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
  );
}
