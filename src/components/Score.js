import "../styles/Score.css";

export default function Score({ currentScore, bestScore, level }) {
  return (
    <div className="stats">
      <p className="current-score">
        Score: <b>{currentScore}</b>
      </p>
      <p className="best-score">
        High Score:{" "}
        <span>
          <i className="nes-icon trophy" />
          <b>{bestScore}</b>
        </span>
      </p>
    </div>
  );
}
