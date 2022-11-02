import { useState } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div className="App">
      <Header currentScore={currentScore} bestScore={bestScore} />
      <Main />
    </div>
  );
}

export default App;
