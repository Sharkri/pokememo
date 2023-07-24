import { useState } from "react";
import "../styles/BGMToggle.css";
import clickSound from "../assets/pokemon-a-button.mp3";
import playAudio from "../playAudio";
import bgm from "../assets/route209.mp3";
import ReactHowler from "react-howler";

const clickAudio = new Audio(clickSound);
clickAudio.volume = 0.3;

const initialBgmOn = JSON.parse(localStorage.getItem("bgm-on"));

function BGMToggle({ isGameOver }) {
  const [isBGMOn, setIsBGMOn] = useState(
    initialBgmOn === undefined ? true : initialBgmOn
  );

  console.log(isBGMOn, localStorage);
  const imgName = isBGMOn ? "music-on" : "music-off";

  // useEffect(() => {
  //   if (isGameOver) setIsBGMOn(false);
  // }, [isGameOver]);

  return (
    <>
      <ReactHowler src={bgm} volume={0.2} loop playing={isBGMOn} />

      <button
        className="bgm-toggle"
        onClick={() => {
          playAudio(clickAudio);

          const newIsBGMOn = !isBGMOn;
          localStorage.setItem("bgm-on", newIsBGMOn);
          setIsBGMOn(newIsBGMOn);
        }}
      >
        <img src={`${process.env.PUBLIC_URL}/${imgName}.png`} alt={imgName} />
      </button>
    </>
  );
}

export default BGMToggle;
