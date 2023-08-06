import { memo, useState } from "react";
import "../styles/BGMToggle.css";
import clickSound from "../assets/pokemon-a-button.mp3";
import playAudio from "../playAudio";
import victoryBGM from "../assets/victory.mp3";
import openingBGM from "../assets/opening.mp3";
import ReactHowler from "react-howler";

const clickAudio = new Audio(clickSound);
clickAudio.volume = 0.3;

const initialBgmOn = JSON.parse(localStorage.getItem("bgm-on"));

function BGMToggle({ status }) {
  const [isBGMOn, setIsBGMOn] = useState(
    initialBgmOn === null ? true : initialBgmOn
  );

  const imgName = isBGMOn ? "music-on" : "music-off";

  return (
    <>
      <ReactHowler
        src={openingBGM}
        volume={0.2}
        loop
        playing={isBGMOn && status !== "win"}
      />

      {status === "win" && (
        <ReactHowler src={victoryBGM} volume={0.2} loop playing={isBGMOn} />
      )}

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

export default memo(BGMToggle);
