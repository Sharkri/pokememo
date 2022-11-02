import Card from "./Card";

export default function Main({ cards }) {
  return (
    <main>
      {cards.map((card) => (
        <Card image={card.image} name={card.name} />
      ))}
    </main>
  );
}
