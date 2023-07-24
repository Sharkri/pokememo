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
import flipCardSound from "./assets/flip.mp3";
import BGMToggle from "./components/BGMToggle";
import playAudio from "./playAudio";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const levelUpAudio = new Audio(levelUpSound);
levelUpAudio.volume = 0.3;
const flipCardAudio = new Audio(flipCardSound);
flipCardAudio.volume = 0.4;

function App() {
  const initializePokemons = async (amount) => {
    const randomPkmns = getRandomPokemons(amount);

    setLoading(true);

    await sleep(MIN_LOAD_TIME);

    setPokemons(await randomPkmns);
    setLoading(false);

    await sleep(CARD_SLEEP_TIME);
    setCardsShowing(true);
  };

  const INCREMENT_STEP = 2;
  const CARD_SLEEP_TIME = 800;
  const MIN_LOAD_TIME = 250;

  const { pokemons, shufflePokemons, setPokemons, getRandomPokemons } =
    usePokemons();
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("best-score") || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [scoreGoal, setScoreGoal] = useState(null);
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
    playAudio(levelUpAudio);

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
    if (gameOver || !cardsShowing) return;

    const card = pokemons[cardIndex];
    if (card.isClicked) {
      setGameOver("lose");
      return;
    }

    updateCardsClicked(cardIndex);
    incrementScore();
    setCardsShowing(false);

    // if every card being clicked is false
    if (!pokemons.every((card) => card.isClicked)) {
      playAudio(flipCardAudio);
      setTimeout(() => {
        setCardsShowing(true);
        shufflePokemons();
      }, CARD_SLEEP_TIME);
      return;
    }

    const isWin = pokemons.length === scoreGoal;
    if (isWin) setGameOver("win");
    else handleLevelUp();
  }

  function playAgain() {
    setGameOver(false);
    setCurrentScore(0);
    initializePokemons(scoreGoal);
  }

  function handleQuit() {
    setGameOver(false);
    setCurrentScore(0);
    setStartScreen(true);
  }
  return (
    <div className="App">
      <BGMToggle status={gameOver} />

      {loading ? (
        <LoadingScreen />
      ) : startScreen ? (
        <StartScreen
          onStart={(cardScoreGoal) => {
            setStartScreen(false);
            setScoreGoal(cardScoreGoal);
            initializePokemons(cardScoreGoal);
          }}
        />
      ) : (
        <>
          {gameOver && (
            <GameOverModal
              status={gameOver}
              score={currentScore}
              onPlayAgain={playAgain}
              onQuit={handleQuit}
              onContinue={() => {
                setGameOver(false);
                handleLevelUp();
              }}
            />
          )}
          <Header onQuit={handleQuit}>
            <Score currentScore={currentScore} bestScore={bestScore} />
          </Header>

          <Main
            cards={pokemons}
            cardsShowing={cardsShowing}
            onClick={handleCardClick}
            score={currentScore}
            scoreGoal={scoreGoal}
          />
        </>
      )}
    </div>
  );
}

export default App;
