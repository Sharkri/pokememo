export default function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}
