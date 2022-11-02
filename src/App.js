import { useState } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import flags from "./flags.json";

function App() {
  const getRandomFlag = () => {
    const flag = flags[Math.floor(Math.random() * flags.length)];
    const image = require(`./images/${flag.code.toLowerCase()}.png`);

    return { image, title: flag.name };
  };

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([getRandomFlag()]);

  return (
    <div className="App">
      <Header currentScore={currentScore} bestScore={bestScore} />
      <Main cards={cards} />
    </div>
  );
}

export default App;
