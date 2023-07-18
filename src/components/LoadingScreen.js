import "../styles/LoadingScreen.css";

export default function LoadingScreen({ next }) {
  return (
    <div className="pokemon-loading-screen">
      <div className="ball-spinner" />
      <p>Loading Level {next}</p>
    </div>
  );
}
