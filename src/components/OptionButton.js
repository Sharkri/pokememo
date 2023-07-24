import "../styles/OptionButton.css";
import clickSound from "../assets/pokemon-a-button.mp3";
import playAudio from "../playAudio";
const clickAudio = new Audio(clickSound);
clickAudio.volume = 0.3;

export default function OptionButton({ onClick, children, type = "button" }) {
  return (
    <button
      onClick={() => {
        playAudio(clickAudio);
        onClick?.();
      }}
      type={type}
      className="option-button"
    >
      {children}
    </button>
  );
}
