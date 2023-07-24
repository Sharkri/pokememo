import "../styles/LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="pokemon-loading-screen">
      <div className="ball-spinner" />
      <p>Loading Pokemon</p>
    </div>
  );
}
