import { useState } from "react";
import uniqid from "uniqid";

export default function usePokemons() {
  const [pokemons, setPokemons] = useState([]);
  const POSSIBLE_POKEMONS = 721; // Up to gen 6

  const getPokemon = async ({ id, shiny }) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { name, sprites } = await res.json();
    const image = sprites[shiny ? "front_shiny" : "front_default"];
    return { name, image, id, shiny };
  };
  const getRandomPokemons = async (amount) => {
    const pokemonsToShow = [];
    let tries = 0;
    const isFirstVisit = localStorage.getItem("visited") === null;
    if (isFirstVisit) localStorage.setItem("visited", true);

    const shiny = Math.random() > (isFirstVisit ? 0.55 : 0.9);
    while (pokemonsToShow.length < amount && tries < 100) {
      const randomId = Math.floor(Math.random() * POSSIBLE_POKEMONS) + 1;

      const isDuplicateId = pokemonsToShow.find(({ id }) => id === randomId);
      if (isDuplicateId) tries++;
      else pokemonsToShow.push({ id: randomId, shiny: false });
    }

    if (shiny) {
      const randomIndex = Math.floor(Math.random() * pokemonsToShow.length);
      pokemonsToShow[randomIndex].shiny = true;
    }

    return await Promise.all(pokemonsToShow.map(getPokemon));
  };

  function shufflePokemons() {
    const availableCards = [...pokemons];
    const shuffledPokemons = [];
    while (availableCards.length) {
      const index = Math.floor(Math.random() * availableCards.length);
      const card = availableCards[index];
      // Need to give a new key/uniqid for react to detect a rerender
      card.id = uniqid();
      shuffledPokemons.push(card);
      availableCards.splice(index, 1);
    }
    setPokemons(shuffledPokemons);
  }

  return { pokemons, getRandomPokemons, shufflePokemons, setPokemons };
}
