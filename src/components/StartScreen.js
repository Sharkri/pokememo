import "../styles/StartScreen.css";
import Modal from "./Modal";
import OptionButton from "./OptionButton";
import clickSound from "../assets/pokemon-a-button.mp3";
import LevelSelectOptions from "./LevelSelectOptions";
const clickAudio = new Audio(clickSound);
clickAudio.volume = 0.3;

export default function StartScreen({ onStart }) {
  return (
    <Modal>
      <div className="start-screen-modal-content modal-content">
        <p className="ask-text">Select a difficulty level</p>

        <div class="start-screen-menu">
          <LevelSelectOptions onStartGame={onStart} />
          <OptionButton
            onClick={() =>
              window.open("https://github.com/Sharkri/pokememo", "_blank")
            }
          >
            Github Repo
          </OptionButton>
        </div>
      </div>
    </Modal>
  );
}
