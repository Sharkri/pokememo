import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import uniqid from "uniqid";
import GameOverModal from "./components/GameOverModal";
import LoadingScreen from "./components/LoadingScreen";

const getImageUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

function App() {
  const getPokemon = useCallback(async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { name } = await res.json();
    return { name, image: getImageUrl(id), id };
  }, []);

  const getRandomPokemons = useCallback(
    async (amount) => {
      const pokemonIds = [];
      let tries = 0;
      while (pokemonIds.length < amount && tries < 100) {
        const randomId = Math.floor(Math.random() * 1000);
        const isDuplicateId = pokemonIds.find((id) => id === randomId);
        if (isDuplicateId) tries++;
        else pokemonIds.push(randomId);
      }

      return await Promise.all(pokemonIds.map(getPokemon));
    },
    [getPokemon]
  );

  const initializePokemons = useCallback(() => {
    const pokemons = getRandomPokemons(INITIAL_CARD_AMOUNT);
    setCards(null);
    setTimeout(async () => setCards(await pokemons), CARD_SLEEP_TIME);
  }, [getRandomPokemons]);

  const INCREMENT_STEP = 2;
  const INITIAL_CARD_AMOUNT = 4;
  const CARD_SLEEP_TIME = 600;

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [bestLevel, setBestLevel] = useState(0);
  const [cardsShowing, setCardsShowing] = useState(true);

  useEffect(() => {
    initializePokemons();
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
    // Check if current score exceeded best score
    if (incrementedScore > bestScore) setBestScore(incrementedScore);
  }

  function handleLevelUp() {
    const newLevel = level + 1;
    setLevel(newLevel);
    setBestLevel(Math.max(bestLevel, newLevel));
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
    if (isGameOver) return;

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

  if (cards == null) return <LoadingScreen />;

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

      <Main
        cards={cards}
        showing={cardsShowing}
        onClick={handleCardClick}
        show={cardsShowing}
      />
    </div>
  );
}

export default App;
