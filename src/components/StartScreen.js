import "../styles/StartScreen.css";
import Modal from "./Modal";
import OptionButton from "./OptionButton";

export default function StartScreen({ onStart }) {
  return (
    <Modal>
      <div className="start-screen-modal-content modal-content">
        <p className="ask-text">What would you like to do?</p>
        <div className="start-options">
          <OptionButton onClick={onStart}>Start Game</OptionButton>
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
