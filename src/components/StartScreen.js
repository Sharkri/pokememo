import { useState } from "react";
import "../styles/StartScreen.css";
import Modal from "./Modal";
import OptionButton from "./OptionButton";

function RadioInput({ defaultChecked, value, labelText, onChange }) {
  return (
    <label>
      <input
        type="radio"
        className="nes-radio"
        defaultChecked={defaultChecked}
        name="answer"
        onChange={() => onChange(value)}
      />
      <span>{labelText}</span>
    </label>
  );
}

export default function StartScreen({ onStart }) {
  const cardGoals = [5, 10, 20];

  const [cardGoal, setCardGoal] = useState(cardGoals[0]);

  const handleStartGame = (e) => {
    e.preventDefault();
    onStart(cardGoal);
  };

  return (
    <Modal>
      <div className="start-screen-modal-content modal-content">
        <p className="ask-text">What would you like to do?</p>

        <form onSubmit={handleStartGame}>
          <div className="level-options">
            <RadioInput
              value={cardGoals[0]}
              labelText="Level 1"
              defaultChecked
              onChange={setCardGoal}
            />
            <RadioInput
              value={cardGoals[1]}
              labelText="Level 2"
              onChange={setCardGoal}
            />
            <RadioInput
              value={cardGoals[2]}
              labelText="Level 3"
              onChange={setCardGoal}
            />
          </div>

          <div className="start-options">
            <OptionButton type="submit">Start Game</OptionButton>
            <OptionButton
              onClick={() =>
                window.open("https://github.com/Sharkri/pokememo", "_blank")
              }
            >
              Github Repo
            </OptionButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}
