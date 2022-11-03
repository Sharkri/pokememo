import "../styles/GameOverModal.css";

export default function GameOverModal({ score }) {
  return (
    <div className="game-over-modal">
      <div className="game-over-content">
        <h2>Game over!</h2>
        <p className="final-score">Your score is {score}</p>
        <button className="play-again">Play again</button>
      </div>
    </div>
  );
}
