import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import GameOverModal from "./components/GameOverModal";
import LoadingScreen from "./components/LoadingScreen";
import usePokemons from "./usePokemons";
import levelUpSound from "./assets/levelup.mp3";
import StartScreen from "./components/StartScreen";
import "nes.css/css/nes.min.css";
import Score from "./components/Score";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const levelUpAudio = new Audio(levelUpSound, { volume: 0.5 });

function App() {
  const initializePokemons = async () => {
    const randomPkmns = getRandomPokemons(INITIAL_CARD_AMOUNT);

    setLoading(true);

    await sleep(MIN_LOAD_TIME);

    setPokemons(await randomPkmns);
    setLoading(false);

    await sleep(CARD_SLEEP_TIME);
    setCardsShowing(true);
  };

  const INCREMENT_STEP = 2;
  const INITIAL_CARD_AMOUNT = 4;
  const CARD_SLEEP_TIME = 800;
  const MIN_LOAD_TIME = 250;

  const { pokemons, shufflePokemons, setPokemons, getRandomPokemons } =
    usePokemons();
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("best-score") || 0
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [bestLevel, setBestLevel] = useState(
    localStorage.getItem("best-level") || 0
  );
  const [cardsShowing, setCardsShowing] = useState(false);
  const [startScreen, setStartScreen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("visited", true);
  }, []);

  function incrementScore() {
    const incrementedScore = currentScore + 1;
    setCurrentScore(incrementedScore);
    const newBestScore = Math.max(incrementedScore, bestScore);
    setBestScore(newBestScore);

    localStorage.setItem("best-score", newBestScore);
  }

  function handleLevelUp() {
    levelUpAudio.play();

    setLevel((prevLevel) => prevLevel + 1);
    const newBestLevel = Math.max(bestLevel, level);
    setBestLevel(newBestLevel);
    localStorage.setItem("best-level", newBestLevel);
    // Add current card amount/length + increment step
    const randomPkmns = getRandomPokemons(pokemons.length + INCREMENT_STEP);
    setLoading(true);

    setTimeout(async () => {
      setPokemons(await randomPkmns);
      setCardsShowing(true);
      setLoading(false);
    }, CARD_SLEEP_TIME);
  }

  function updateCardsClicked(index) {
    const newCards = [...pokemons];
    newCards[index].isClicked = true;
    setPokemons(newCards);
  }

  async function handleCardClick(cardIndex) {
    if (isGameOver || !cardsShowing) return;

    const card = pokemons[cardIndex];
    if (card.isClicked) {
      setIsGameOver(true);
      return;
    }

    updateCardsClicked(cardIndex);
    incrementScore();
    setCardsShowing(false);

    // check if every card has been clicked
    if (pokemons.every((card) => card.isClicked)) handleLevelUp();
    else {
      setTimeout(() => {
        setCardsShowing(true);
        shufflePokemons();
      }, CARD_SLEEP_TIME);
    }
  }

  function resetScores() {
    setCurrentScore(0);
    setLevel(1);
  }
  function playAgain() {
    setIsGameOver(false);
    resetScores();
    initializePokemons();
  }

  function handleQuit() {
    setIsGameOver(false);
    resetScores();
    setStartScreen(true);
  }

  if (loading) return <LoadingScreen next={level} />;

  return (
    <div className="App">
      {startScreen ? (
        <StartScreen
          onStart={() => {
            setStartScreen(false);
            initializePokemons();
          }}
        />
      ) : (
        <>
          {isGameOver && (
            <GameOverModal
              score={currentScore}
              level={level}
              onPlayAgain={playAgain}
              onQuit={handleQuit}
            />
          )}
          <Header onQuit={handleQuit}>
            <Score
              currentScore={currentScore}
              bestScore={bestScore}
              level={level}
              bestLevel={bestLevel}
            />
          </Header>

          <Main
            cards={pokemons}
            cardsShowing={cardsShowing}
            onClick={handleCardClick}
          />
        </>
      )}
    </div>
  );
}

export default App;
