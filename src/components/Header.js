import "../styles/Header.css";

export default function Header({ children, onQuit }) {
  return (
    <header>
      <h1>
        <button onClick={onQuit} className="logo-button">
          <img
            src={`${process.env.PUBLIC_URL}/pokeball.webp`}
            alt="pokeball"
            className="pokeball"
          />
          <span>
            <span className="poke">Poké</span>
            <span className="memo">Memo</span>
          </span>
        </button>
      </h1>
      {children}
    </header>
  );
}
