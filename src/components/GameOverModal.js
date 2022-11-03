import "../styles/GameOverModal.css";

export default function GameOverModal({ score, onPlayAgain }) {
  return (
    <div className="game-over-modal">
      <div className="game-over-content">
        <h2>Game over!</h2>
        <p className="final-score">Your score is {score}</p>
        <button className="play-again" onClick={onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  );
}
