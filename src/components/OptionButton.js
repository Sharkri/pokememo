import "../styles/OptionButton.css";
import pokemonAButtonSound from "../assets/pokemon-a-button.mp3";
const pokemonAButtonAudio = new Audio(pokemonAButtonSound, { volume: 0.5 });

export default function OptionButton({ onClick, children }) {
  return (
    <button
      onClick={() => {
        pokemonAButtonAudio.play();
        onClick();
      }}
      className="option-button"
    >
      {children}
    </button>
  );
}
