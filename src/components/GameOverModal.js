import "../styles/GameOverModal.css";
import pokemonAButtonSound from "../assets/pokemon-a-button.mp3";

const pokemonAButtonAudio = new Audio(pokemonAButtonSound);
pokemonAButtonAudio.volume = 0.5;

export default function GameOverModal({ score, level, onPlayAgain, onQuit }) {
  const onAction = async (cb) => {
    pokemonAButtonAudio.play();
    setTimeout(cb, 200);
  };

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
            You reached <span className="level-number">Level {level}</span>
          </span>
        </div>

        <div class="options">
          <button onMouseDown={() => onAction(onPlayAgain)}>Play again</button>
          <button onMouseDown={() => onAction(onQuit)}>Quit</button>
        </div>
      </div>
    </div>
  );
}