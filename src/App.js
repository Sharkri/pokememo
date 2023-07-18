import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import GameOverModal from "./components/GameOverModal";
import LoadingScreen from "./components/LoadingScreen";
import usePokemons from "./usePokemons";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function App() {
  const initializePokemons = async () => {
    const randomPkmns = getRandomPokemons(INITIAL_CARD_AMOUNT);
    setPokemons(null);

    await sleep(MIN_LOAD_TIME);
    setPokemons(await randomPkmns);

    await sleep(CARD_SLEEP_TIME);
    setCardsShowing(true);
  };

  const INCREMENT_STEP = 2;
  const INITIAL_CARD_AMOUNT = 4;
  const CARD_SLEEP_TIME = 850;
  const MIN_LOAD_TIME = 250;

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("best-score") || 0
  );

  const { pokemons, shufflePokemons, setPokemons, getRandomPokemons } =
    usePokemons();
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [bestLevel, setBestLevel] = useState(
    localStorage.getItem("best-level") || 0
  );
  const [cardsShowing, setCardsShowing] = useState(false);

  useEffect(() => {
    initializePokemons().then(() => localStorage.setItem("visited", true));
    document.title = "PokéMemo";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function incrementScore() {
    const incrementedScore = currentScore + 1;
    setCurrentScore(incrementedScore);
    const newBestScore = Math.max(incrementedScore, bestScore);
    setBestScore(newBestScore);

    localStorage.setItem("best-score", newBestScore);
  }

  function handleLevelUp() {
    setLevel((prevLevel) => prevLevel + 1);
    const newBestLevel = Math.max(bestLevel, level);
    setBestLevel(newBestLevel);
    localStorage.setItem("best-level", newBestLevel);
    // Add current card amount/length + increment step
    const randomPkmns = getRandomPokemons(pokemons.length + INCREMENT_STEP);
    setPokemons(null); // show loading screen
    setTimeout(async () => {
      setPokemons(await randomPkmns);
      setCardsShowing(true);
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

  function playAgain() {
    setIsGameOver(false);
    setCurrentScore(0);
    initializePokemons();
    setLevel(1);
  }

  if (pokemons == null) return <LoadingScreen next={level} />;

  return (
    <div className="App">
      {isGameOver && (
        <GameOverModal
          score={currentScore}
          level={level}
          onPlayAgain={playAgain}
        />
      )}
      <Header
        currentScore={currentScore}
        bestScore={bestScore}
        level={level}
        bestLevel={bestLevel}
      />

      <Main cards={pokemons} showing={cardsShowing} onClick={handleCardClick} />
    </div>
  );
}

export default App;
