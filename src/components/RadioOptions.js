import { useEffect } from "react";

export default function RadioOptions({ onNavigate, onEnter, children }) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "ArrowUp") onNavigate(-1);
      else if (e.key === "ArrowDown") onNavigate(1);
      else if (e.key === "Enter") onEnter();
    };

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [onEnter, onNavigate]);

  return children;
}
