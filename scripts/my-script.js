let currentAnimal = "";
let score = 10;
let isPlaying = false;
let buttonPressed = false;

const playAudio = (src, callback) => {
  const audio = new Audio(src);
  audio.play();
  audio.addEventListener("ended", callback);
};

const audiosArray = ["audios/Cat.ogg", "audios/Eagle.ogg", "audios/Goat.ogg"];
const animals = ["Cat", "Eagle", "Goat"];

const checkAnswer = (animal) => {
  buttonPressed = true;
  const result = document.getElementById("result");
  disableButtons();
  if (currentAnimal === animal) {
    result.textContent = "Right";
    updateScore(1);
  } else {
    result.textContent = "Wrong";
    updateScore(-1);
  }
  result.textContent += ` Score: ${score}`;
};

const disableButtons = () => {
  document.getElementById("audio1").disabled = true;
  document.getElementById("audio2").disabled = true;
  document.getElementById("audio3").disabled = true;
};

const enableButtons = () => {
  document.getElementById("audio1").disabled = false;
  document.getElementById("audio2").disabled = false;
  document.getElementById("audio3").disabled = false;
};

document.getElementById("audio1").addEventListener("click", () => checkAnswer("Eagle"));
document.getElementById("audio2").addEventListener("click", () => checkAnswer("Cat"));
document.getElementById("audio3").addEventListener("click", () => checkAnswer("Goat"));

const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.volume = 0.5; // Adjust the volume as needed

document.getElementById("toggleBackgroundMusic").addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    if (!isPlaying) {
      isPlaying = true;
      playRandomSound();
    }
  } else {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }
});

const resetButtonPressed = () => {
  buttonPressed = false;
};

const updateScore = (points) => {
  score += points;
  if (score <= 0) {
    stopSounds();
  }
};

const playRandomSound = () => {
  if (!isPlaying) return;

  if (!buttonPressed) {
    updateScore(-1); // Deduct one point if no button was pressed
    const result = document.getElementById("result");
    result.textContent = "No button pressed. Score: " + score;
  }
  resetButtonPressed();

  const randomIndex = Math.floor(Math.random() * audiosArray.length);
  currentAnimal = animals[randomIndex];
  playAudio(audiosArray[randomIndex], enableButtons);
  const randomInterval = Math.random() * (3000 - 200) + 200; // Random interval between 0.2 seconds (200 ms) and 3 seconds (3000 ms)
  setTimeout(playRandomSound, randomInterval);
};

const stopSounds = () => {
  isPlaying = false;
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
};
