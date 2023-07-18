import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import uniqid from "uniqid";
import GameOverModal from "./components/GameOverModal";
import LoadingScreen from "./components/LoadingScreen";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function App() {
  const getPokemon = useCallback(async ({ id, shiny }) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { name, sprites } = await res.json();
    const image =
      sprites.other["official-artwork"][
        shiny ? "front_shiny" : "front_default"
      ];

    return { name, image, id, shiny };
  }, []);

  const getRandomPokemons = useCallback(
    async (amount) => {
      const pokemonsToShow = [];
      let tries = 0;

      const isFirstVisit = localStorage.getItem("visited") === null;
      const shiny = Math.random() > (isFirstVisit ? 0.5 : 0.9);
      while (pokemonsToShow.length < amount && tries < 100) {
        const randomId = Math.floor(Math.random() * 1000);

        const isDuplicateId = pokemonsToShow.find(({ id }) => id === randomId);
        if (isDuplicateId) tries++;
        else pokemonsToShow.push({ id: randomId, shiny: false });
      }

      if (shiny) {
        const randomIndex = Math.floor(Math.random() * pokemonsToShow.length);
        pokemonsToShow[randomIndex].shiny = true;
      }

      return await Promise.all(pokemonsToShow.map(getPokemon));
    },
    [getPokemon]
  );

  const initializePokemons = useCallback(async () => {
    const pokemons = getRandomPokemons(INITIAL_CARD_AMOUNT);

    setCards(null);
    await sleep(MIN_LOAD_TIME);
    setCards(await pokemons);

    await sleep(CARD_SLEEP_TIME);
    setCardsShowing(true);
  }, [getRandomPokemons]);

  const INCREMENT_STEP = 2;
  const INITIAL_CARD_AMOUNT = 4;
  const CARD_SLEEP_TIME = 850;
  const MIN_LOAD_TIME = 250;

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("best-score") || 0
  );
  const [cards, setCards] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [bestLevel, setBestLevel] = useState(
    localStorage.getItem("best-level") || 0
  );
  const [cardsShowing, setCardsShowing] = useState(false);

  useEffect(() => {
    initializePokemons().then(() => localStorage.setItem("visited", true));
    document.title = "PokéMemo";
  }, [initializePokemons]);

  function shuffleCards() {
    const availableCards = [...cards];
    const shuffledCards = [];
    while (availableCards.length) {
      const index = Math.floor(Math.random() * availableCards.length);
      const card = availableCards[index];
      // Need to give a new key/uniqid for react to detect a rerender
      card.id = uniqid();
      shuffledCards.push(card);
      availableCards.splice(index, 1);
    }
    setCards(shuffledCards);
  }

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
    const pokemons = getRandomPokemons(cards.length + INCREMENT_STEP);
    setCards(null); // show loading screen
    setTimeout(async () => {
      setCards(await pokemons);
      setCardsShowing(true);
    }, CARD_SLEEP_TIME);
  }

  function updateCardsClicked(index) {
    const newCards = [...cards];
    newCards[index].isClicked = true;
    setCards(newCards);
  }

  async function handleCardClick(cardIndex) {
    if (isGameOver || !cardsShowing) return;

    const card = cards[cardIndex];
    if (card.isClicked) {
      setIsGameOver(true);
      return;
    }

    updateCardsClicked(cardIndex);
    incrementScore();
    setCardsShowing(false);

    // check if every card has been clicked
    if (cards.every((card) => card.isClicked)) handleLevelUp();
    else {
      setTimeout(() => {
        setCardsShowing(true);
        shuffleCards();
      }, CARD_SLEEP_TIME);
    }
  }

  function playAgain() {
    setIsGameOver(false);
    setCurrentScore(0);
    initializePokemons();
    setLevel(1);
  }

  if (cards == null) return <LoadingScreen next={level} />;

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

      <Main cards={cards} showing={cardsShowing} onClick={handleCardClick} />
    </div>
  );
}

export default App;
