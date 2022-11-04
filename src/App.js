import { useEffect, useState } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import countries from "./countries.json";
import uniqid from "uniqid";
import GameOverModal from "./components/GameOverModal";

function App() {
  const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

  function getRandomCountries(countryAmount) {
    // Clone countries to avoid modifying original array
    const availableCountries = [...countries];
    const randomCountries = [];
    for (let i = 0; i < countryAmount; i++) {
      // Get random index
      const index = getRandomIndex(availableCountries);
      const country = availableCountries[index];
      const flag = require(`./images/${country.code.toLowerCase()}.png`);
      randomCountries.push({
        image: flag,
        name: country.name,
        isClicked: false,
        id: uniqid(),
      });
      // Remove the country at index selected to avoid duplicates appearing
      availableCountries.splice(index, 1);
    }

    return randomCountries;
  }

  // How much to increment each level
  const INCREMENT_STEP = 2;
  const INITIAL_CARD_AMOUNT = 4;
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState(getRandomCountries(INITIAL_CARD_AMOUNT));
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  function shuffleCards() {
    const availableCards = [...cards];
    const shuffledCards = [];
    while (availableCards.length) {
      const index = getRandomIndex(availableCards);
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

  function setIsClicked(index) {
    const newCards = [...cards];
    newCards[index].isClicked = true;
    setCards(newCards);
  }

  function handleCardClick(e) {
    const cardIndex = e.currentTarget.dataset.index;
    const card = cards[cardIndex];
    if (card.isClicked) {
      setIsGameOver(true);
      return;
    }

    setIsClicked(cardIndex);
    incrementScore();

    // check if every card has been clicked
    if (cards.every((card) => card.isClicked)) {
      // go to next level
      setLevel(level + 1);
      // Add current card amount/length + increment step
      const newCountries = getRandomCountries(cards.length + INCREMENT_STEP);
      setCards(newCountries);
      return;
    }

    shuffleCards();
  }

  function playAgain() {
    setIsGameOver(false);
    setCurrentScore(0);
    setCards(getRandomCountries(INITIAL_CARD_AMOUNT));
    setLevel(1);
  }

  return (
    <div className="App">
      {isGameOver && (
        <GameOverModal score={currentScore} onPlayAgain={playAgain} />
      )}
      <Header currentScore={currentScore} bestScore={bestScore} level={level} />
      <Main cards={cards} onClick={handleCardClick} />
    </div>
  );
}

export default App;
