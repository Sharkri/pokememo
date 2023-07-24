import "../styles/OptionButton.css";
import clickSound from "../assets/pokemon-a-button.mp3";
import playAudio from "../playAudio";
const clickAudio = new Audio(clickSound);
clickAudio.volume = 0.3;

export default function OptionButton({ onClick, children }) {
  return (
    <button
      onClick={() => {
        playAudio(clickAudio);
        onClick();
      }}
      className="option-button"
    >
      {children}
    </button>
  );
}
