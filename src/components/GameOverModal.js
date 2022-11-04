import "../styles/GameOverModal.css";

export default function GameOverModal({ score, level, onPlayAgain }) {
  return (
    <div className="game-over-modal">
      <div className="game-over-content">
        <h2>Game Over!</h2>
        <div className="final-stats">
          <span className="final-score">
            Your final score is{" "}
            <span className="final-score-number">{score}</span>
          </span>
          <span className="level-reached">
            Level Reached: <span className="level-number">Level {level}</span>
          </span>
        </div>
        <button className="play-again" onClick={onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  );
}
