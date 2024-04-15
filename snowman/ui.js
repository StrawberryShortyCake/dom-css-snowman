import { SnowmanLogic } from "./snowman.js";

/** this is the template for adding interactions to the Snowman UI */
class SnowmanUI {
  constructor(maxWrong = 5) {
    console.debug("Snowman UI");

    this.maxWrong = maxWrong;
    this.game = new SnowmanLogic(maxWrong);

    this.$keyboard = document.querySelector("#Snowman-keyboard");
    this.$word = document.querySelector("#Snowman-word");
    this.$image = document.querySelector("#Snowman-image");
    this.$main = document.querySelector("#Snowman"); // have it in HTML

    this.updateWord();
    this.addKeyboard();
  }

  /** Add keys to keyboard area and register single event listener for area.  */

  addKeyboard() {
    console.debug("addKeyboard");

    const $letters = [..."abcdefghijklmnopqrstuvwxyz"].map(
      letter => {
        const $letter = document.createElement("button");
        $letter.classList.add("letter");
        $letter.dataset.letter = letter;
        $letter.innerText = letter;
        return $letter;
      },
    );

    this.$keyboard.append(...$letters);
    this.$keyboard.addEventListener("click", this.handleGuess.bind(this));
  }

  /** Update guessed word on board. */

  updateWord() {
    console.debug("updateWord");

    this.$word.innerText = this.game.getGuessedWord();
  }

  /** Update image after a bad guess. */

  updateImage() {
    console.debug("updateImage");

    this.$image.src = `${this.game.numWrong}.png`;
  }

  /** Handle guessing a letter. */

  guessLetter(letter) {
    console.debug("guessLetter", letter);

    const isCorrect = this.game.guessLetter(letter);
    this.updateWord();
    this.updateImage();
    // const gameState = this.game.gameState; // we've lost the reference here

    if (this.game.gameState !== "PLAYING") {
      this.endGame();
    }
  }

  /** Given the end game state, will display a message to the player */
  endGame() { // can aready access gameState
    const $endGameMsgDiv = document.createElement("div");
    $endGameMsgDiv.innerHTML =
      `You've ${this.game.gameState}! The word is ${this.game.answer}.`;
    this.$main.appendChild($endGameMsgDiv);
  }

  /** Handle clicking a letter button: disable button & handle guess. */

  handleGuess(evt) {
    console.debug("handleGuess");

    if (!evt.target.matches("button")) return;
    // select specifically buttons with letter class to prevent future bugs

    const letter = evt.target.dataset.letter;
    this.guessLetter(letter);
  }
}



export { SnowmanUI };
