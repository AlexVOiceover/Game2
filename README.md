# Enigma Game
Something that plays sound.

## How to Play
1. When the game starts, you will see a hidden word represented by dashes (-) on the screen.

2. To guess a letter in the word, click on the corresponding key on the virtual keyboard.

3. If the letter is in the word, it will be revealed in its correct position(s) and turn green.

4. If the letter is not in the word, a part of the hangman figure will be drawn and the key will turn red.

5. Keep guessing until you have correctly identified all the letters in the word or until the hangman figure is complete.

6. If you identify all the letters in the word, you win! If the hangman figure is complete, you lose.

7. You can start a new game at any time by clicking the "Press here for another game" message that appears when the game ends.

## Code Overview
The game is built using JavaScript and HTML. The main file is index.html, which contains the game's interface. The game logic is implemented in the in the hangman.js file.

The game uses an array of words (words.js) that is randomly selected from to choose the word to be guessed.

The game uses the following global variables:

* guessedLetters: an array that stores the letters guessed by the player.

* gameEnded: a Boolean value that indicates whether the game has ended.

* picture: a reference to the img element that displays the hangman figure.

* message: a reference to the h2 element that displays messages to the player.

* headingText: a reference to the h1 element that displays messages to the player.

* stage: a number that keeps track of the number of incorrect guesses made by the player.

The game flow is controlled by the keys event listener, which listens for clicks on the virtual keyboard. When a key is clicked, the listener checks whether the letter is in the hidden word and responds accordingly. If the letter is in the word, the letter is revealed and the keyboard key turns green. If the letter is not in the word, the hangman figure is drawn and the key turns red. Pressing the same key again will count as another wrong guess.

When the game ends, a message is displayed indicating whether the player has won or lost. The message includes a clickable link to start a new game.

## Planning
The idea was to start just with a basic design and add funtionallity in different stages:

* Capture the click events on the keyboard.

* Implement the logic to check if a guess is right.

* Update the picture to reflect the progress of the game.

## Building
The game was built incrementally.

* The first stage was just to distribute the elements on the screen. I did it on desktop mode but I forgot to check the mobile version. Because of that I had to spend a lot of time later on readjusting the distribution and sizes to work well on a phone. For future projects I will design taking in consideration both versions from the beggining.

* Next step was to make the keyboard recognise the click event. When I first designed it I used `<p>` elements, so I just carried on with that decision. Maybe would make more sense to use buttons.

* At this point I realised that I was showing the secret word all the time... so I created a second array `hiddenWord` substituting all the letters for the `-` symbol and this array is the one shown at `.flex-container-secret-word`.

* I modifed the usability changing the colours both of the keyboard and the secret word after each guess.

* Until this moment I was using just a sample word, but the idea was to use a word randomlly choosed from an array. I stored all the possible words in `words.js` to keep the data in a separated file. Later on I will use this same file for some random messages that will be shown where the title goes.

* Trying it on mobile didn't work as spected, so on the CSS file I capture when the user is using a phone with `@media all and (pointer:none),(pointer:coarse) {}` and readjust both the distribution and sizes of everything to look well on a phone screen.

## Debugging
For debugging I just needed to show messages on the console using `console.log` at strategic points. The aim was to monitorise the value of variables and verify if they were right or if any adjust was needed.