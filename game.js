import Deck from "./deck.js";
import Player from "./player.js";
import Card from "./card.js";

class Game {
  static gamesCount = 0;
  constructor(name) {
    this.name = name;
    this.playersWins = 0;
    this.dealerWins = 0;
    console.log("Game constructor " + this.name);
    this.id = Game.gamesCount++;
    this.gameContainer = this.createGameContainer();
    this.addListeners();
    this.deck = new Deck("cards54.json");
    this.player = new Player("Player", this.gameContainer);
    this.dealer = new Player("Dealer", this.gameContainer);
    this.resultContainer = this.createResultContainer();

  }

  createGameContainer() {
    const container = document.createElement("div");
    container.id = `game_${this.id}`;
    container.style.backgroundColor = "lightblue";
    container.style.borderRadius = "15px";
    container.className = "game";
    container.innerHTML = `<h1>${this.name}</h1>
    <button id="hit_${this.id}">Hit</button>
    <button id="stand_${this.id}">Stand</button>  
    `;

    const dealButton = document.createElement("button");
    dealButton.id = `deal_${this.id}`;
    dealButton.innerText = "Deal";
    dealButton.style.color = "black";
    dealButton.style.background = "pink";

    container.appendChild(dealButton);
    document.body.appendChild(container);
    return container;
  }

  createResultContainer() {
    const resultContainer = document.createElement("div");
    resultContainer.id = "result_" + this.id;
    this.gameContainer.appendChild(resultContainer);
    return resultContainer;
  }

  addListeners() {
    const dealButton = document.getElementById("deal_" + this.id);
    dealButton.addEventListener("click", this.deal.bind(this));

    const hitButton = document.getElementById("hit_" + this.id);
    hitButton.addEventListener("click", this.hit.bind(this));

    const standButton = document.getElementById("stand_" + this.id);
    standButton.addEventListener("click", this.stand.bind(this));
  }

  async deal() {
    for (let i = 0; i < 35; i++) {
      console.log("🎲 Deal №", i + 1);
      this.reset();
      await this.deck.ready; // Чекаємо, поки завантажаться та перемішаються карти
  
      while (this.player.score < 17 && this.player.score < 21) {
        this.hit();
      }
  
      this.stand();
  
      // Затримка між іграми, щоб бачити результат
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  stand() {
    while (this.player.score <= 21 && this.dealer.score < 17) {
      this.dealer.addCard(this.deck.drawCard());
    }
    this.finish();
  }

  hit() {
    const newCard = this.deck.drawCard();
    if (!newCard) {
      console.error("Колода закінчилася");
      return;
    }

    this.player.addCard(newCard);
    console.log("Гравець отримав карту. Новий рахунок:", this.player.score);

    if (this.player.score >= 21) {
      console.log("Гравець перебрав або має 21. Дилер ходить...");
      this.stand();
    }
  }

  finish() {
    const playerScore = this.player.score;
    const dealerScore = this.dealer.score;
    let message = "";

    switch (true) {
      case playerScore > 21:
        message = "Player busts";
        this.dealerWins++;
        break;
      case dealerScore > 21:
        message = "Dealer busts";
        this.playersWins++;
        break;
      case playerScore > dealerScore:
        message = "Player wins";
        this.playersWins++;
        break;
      case playerScore < dealerScore:
        message = "Dealer wins";
        this.dealerWins++;
        break;
      default:
        message = "It's a tie";
        this.playersWins++;
        this.dealerWins++;
        break;
    }
    this.resultContainer.innerHTML += `
    <div>
      ${message}. 
      Scores → Player: ${playerScore}, Dealer: ${dealerScore}. - 
      Total wins → Player: ${this.playersWins}, Dealer: ${this.dealerWins}
    </div>`;    setTimeout(() => this.reset(), 2000);
  }

  reset() {
    this.deck = new Deck("cards54.json");
    this.deck.shuffle(); // Додано
    this.dealer.reset();
    this.player.reset();
  }

  showPleaseReset() {
    alert("Please reset the game");
  }
}

export default Game;
