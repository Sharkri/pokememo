import { useState } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import countries from "./countries.json";
import uniqid from "uniqid";

function App() {
  const getRandomFlag = () => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    const flag = require(`./images/${country.code.toLowerCase()}.png`);

    return { image: flag, name: country.name, id: uniqid() };
  };

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([
    getRandomFlag(),
    getRandomFlag(),
    getRandomFlag(),
    getRandomFlag(),
  ]);

  return (
    <div className="App">
      <Header currentScore={currentScore} bestScore={bestScore} />
      <Main cards={cards} />
    </div>
  );
}

export default App;
