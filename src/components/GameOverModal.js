import "../styles/GameOverModal.css";
import Modal from "./Modal";
import OptionButton from "./OptionButton";

export default function GameOverModal({ score, level, onPlayAgain, onQuit }) {
  return (
    <Modal>
      <div className="game-over-modal-content modal-content">
        <h2>Game Over!</h2>
        <div className="final-stats">
          <span className="final-score">
            Your final score is{" "}
            <span className="final-score-number">{score}</span>
          </span>
          <span className="level-reached">
            You reached <span className="level-number">Level {level}</span>
          </span>
        </div>
        <div className="options">
          <OptionButton onClick={onPlayAgain}>Play again</OptionButton>
          <OptionButton onClick={onQuit}>Quit</OptionButton>
        </div>
      </div>
    </Modal>
  );
}
