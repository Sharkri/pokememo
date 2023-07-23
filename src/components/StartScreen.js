import startUpSound from "../assets/startup.mp3";
import Header from "./Header";
import "../styles/StartScreen.css";

const startupAudio = new Audio(startUpSound, { volume: 0.5 });

export default function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <Header />

      <button
        onClick={() => {
          startupAudio.play();
          onStart();
        }}
        className="nes-btn is-primary"
        type="button"
      >
        Start Game
      </button>
    </div>
  );
}
