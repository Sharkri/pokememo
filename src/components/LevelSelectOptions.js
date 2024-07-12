import { useState } from "react";
import clickSound from "../assets/pokemon-a-button.mp3";
import playAudio from "../playAudio";
import RadioOptions from "./RadioOptions";

const clickAudio = new Audio(clickSound);
clickAudio.volume = 0.3;

const levels = [
  { label: "Easy", goal: 5, index: 0 },
  { label: "Medium", goal: 10, index: 1 },
  { label: "Hard", goal: 18, index: 2 },
];

function RadioInput({ checked, labelText, onClick }) {
  return (
    <label>
      <input
        type="radio"
        className="nes-radio"
        name="answer"
        checked={checked}
        onClick={onClick}
        onChange={() => {}}
      />
      <span>{labelText}</span>
    </label>
  );
}

export default function LevelSelectOptions({ onStartGame }) {
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);

  const handleEnter = (goal) => {
    onStartGame(goal);
    playAudio(clickAudio);
  };

  const handleNavigate = (increment) => {
    setSelectedLevel((prev) => {
      let newOption = levels[prev.index + increment];
      if (newOption) {
        playAudio(clickAudio);
        return newOption;
      }
      return prev;
    });
  };

  return (
    <RadioOptions
      onNavigate={handleNavigate}
      onEnter={() => handleEnter(selectedLevel.goal)}
    >
      <div className="level-options">
        {levels.map((level) => (
          <RadioInput
            checked={level.index === selectedLevel.index}
            labelText={level.label}
            onClick={() => {
              setSelectedLevel(level);
              handleEnter(level.goal);
            }}
            key={level.index}
          />
        ))}
      </div>
    </RadioOptions>
  );
}
