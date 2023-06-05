/* let guessedLetters = [];
let gameEnded = false;

// Get the h1 hading, image and bottom message
const headingText = document.querySelector("h1");
const picture = document.querySelector("#hangmanPic");
const message = document.querySelector("#message");


// Starts from stage 2 to avoid the empty picture, 
let stage = 2;
picture.src = "images/" + stage +".png";

// Get a random word from words.js
const secretWord = words[Math.floor(Math.random() * words.length)];

// Only when the game is ended we can press the message to reload the page
function activateMessageButton(){
  message.addEventListener('click', () => {
    if (gameEnded){location.reload();} })
}

// Checks if stage>4, because there is when the head appears for the first time
function changeText() {
  if (stage>4 && !gameEnded){
    const randomIndex = Math.floor(Math.random() * messages.length);
    headingText.innerHTML = messages[randomIndex];
  }
  if (gameEnded)headingText.innerHTML = "Hangman";
}

setInterval(changeText, 10000); 

//Split to create an array. The map method swaps each letter for his uppercase equivalent
const arrSecretword = secretWord.split("").map(letter => letter.toUpperCase());
// hiddenWord it's an array of symbols "-" with the same length as arrSecretword
let hiddenWord = arrSecretword.map(() => "-");

const secretWordPanel = document.querySelector(".flex-container-secretWord")

// Add the arrSecretword to the flex-container-secretWord
hiddenWord.forEach(letter => {
  const p = document.createElement('p');
  p.textContent = letter; 
  secretWordPanel.appendChild(p);
  }
);

const keys = document.querySelectorAll(".iskey");
  // Loop through the title elements and add a click event listener to each
keys.forEach(key => {
  key.addEventListener('click', () => {

    // When the game ends the keys dont't respond anymore
    if (gameEnded){return};

    // If the game didn't end...
    // add/remove shadow effect on key
    key.classList.add("pressed");
    setTimeout(() => key.classList.remove("pressed"), 70);

    const pressedKey = key.textContent;

    if (arrSecretword.includes(pressedKey)) {

      guessedLetters.push(pressedKey);
  
      for (let i = 0; i < arrSecretword.length; i++) {
        if (arrSecretword[i] === pressedKey) {
      
          //change background on secret word panel
          secretWordPanel.children[i].style.backgroundColor = "Green";
          secretWordPanel.children[i].style.filter = "none";

          //change letter in hiddenWord to guessed letter
          hiddenWord[i] = pressedKey;
          secretWordPanel.children[i].textContent = pressedKey;

          //Change background on the keyboard
          key.classList.add("guessed");

          //Condition for winning is that hiddenWord is the same than arrSecretword (no "-")
          if (hiddenWord.join("") === arrSecretword.join("")) {
            picture.src = "images/winner.gif";
            message.innerText="You won with " + (stage-2) + " mistakes. Carlton is happy. Press here for another game";
            gameEnded = true;
            message.classList.add("activeMessage");
            activateMessageButton();
          }
        }
      }
    }
    // The guessed letter is not in arrSecretword
    else {
      key.classList.add("wrong");
      if (!gameEnded){stage++};
      picture.src = "images/" + stage +".png";
            
      if (stage === 10){
        message.innerText = "You lost, the secret word was '" + secretWord + "'. Press here for another game.";         
        gameEnded = true;
        message.classList.add("activeMessage");
        activateMessageButton();   
      }
    }      
  });
});

*/
// script.js
let audioContext;

function createSource(buffer, gainNode) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);
  return source;
}

document.querySelectorAll('.track').forEach(track => {
  let buffer = null;
  let source = null;
  let isPlaying = false;
  let gainNode;

  const audioInput = track.querySelector('.audio-input');
  const startButton = track.querySelector('.start');
  const playPauseButton = track.querySelector('.play-pause');
  const volumeInput = track.querySelector('.volume');
  const equalizerInput = track.querySelector('.equalizer');
  const pitchInput = track.querySelector('.pitch');

  audioInput.addEventListener('change', async e => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        const audioData = fileReader.result;
        buffer = await audioContext.decodeAudioData(audioData);
      };

      fileReader.readAsArrayBuffer(file);
    }
  });

  startButton.addEventListener('click', () => {
    if (!audioContext) {
      audioContext = new AudioContext();
      gainNode = audioContext.createGain();
    }
    audioContext.resume().then(() => {
      console.log('AudioContext resumed successfully');
    });
    if (buffer && !isPlaying) {
      source = createSource(buffer, gainNode);
      source.start(0);
      playPauseButton.innerText = 'Pause';
      isPlaying = true;
    }
  });

  playPauseButton.addEventListener('click', () => {
    if (source && isPlaying) {
      source.stop();
      isPlaying = false;
      playPauseButton.innerText = 'Play';
    } else if (buffer && !isPlaying) {
      source = createSource(buffer, gainNode);
      source.start(0);
      isPlaying = true;
      playPauseButton.innerText = 'Pause';
    }
  });

  volumeInput.addEventListener('input', e => {
    gainNode.gain.value = parseFloat(e.target.value);
  });

  pitchInput.addEventListener('input', e => {
    if (source) {
      source.playbackRate.value = parseFloat(e.target.value);
    }
  });

  
});