import "../styles/Header.css";

export default function Header({ children }) {
  return (
    <header>
      <h1>
        <img
          src={`${process.env.PUBLIC_URL}/pokeball.png`}
          alt="pokeball"
          className="pokeball"
        />
        <span>
          <span className="poke">Poké</span>
          <span className="memo">Memo</span>
        </span>
      </h1>
      {children}
    </header>
  );
}
