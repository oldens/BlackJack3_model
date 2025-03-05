import Card from "./card.js";
import Deck from "./deck.js";

class Player {

  static playersCount = 0;

  constructor(name, gameContainer) {
    this.id = Player.playersCount++;  
    this.gameContainer = gameContainer;
    this.name = name;
    this.hand = [];
    this.score = 0;
    this.handContainer = this.createHandContainerInGame(this.gameContainer);
    console.log(`✔ Гравець ${this.name} створений`, this.handContainer.id);
  }

  generateUniqueId() {
    return "player" + Symbol().toString().slice(7);
  } 

  createHandContainerInGame(gameContainer) {
    const handContainer = document.createElement("div");
    handContainer.classList.add("hand-container");
    handContainer.style.display = "flex";
    handContainer.style.flexDirection = "row";
    handContainer.style.margin = "10px";
    handContainer.id = `player_${this.id}`;
    const userScore = this.createUserScoreElement();
    handContainer.appendChild(userScore);
    this.gameContainer.appendChild(handContainer);
    return handContainer;
  }

  createUserScoreElement() {
    const userScore = document.createElement("div");
    userScore.id = this.id + "_score";
    userScore.innerHTML = this.name + " Score: " + this.score;
    return userScore;
  }

  addCard(card) {
    if (!card || !card.html) {
      console.error("❌ Помилка: передано некоректний об'єкт картки:", card);
      return;
    }
  
    if (!this.handContainer) {
      console.error("❌ Помилка: handContainer не існує для гравця", this.name);
      return;
    }
  
    if (typeof card.value !== "number") {
      console.error("❌ Помилка: card.value не є числом:", card);
      return;
    }
  
    this.hand.push(card);
    this.handContainer.appendChild(card.html);
    this.score += card.value;
  
    console.log(`✔ Гравець ${this.name} отримав карту зі значенням ${card.value}`);
    card.show();
    this.updateScoreDisplay();
  }

  updateScoreDisplay() {
    const scoreElement = document.getElementById(this.id + "_score");
    
    if (!scoreElement) {
      console.error("❌ Не знайдено елемент для оновлення рахунку:", this.id + "_score");
      return;
    }
  
    scoreElement.textContent = `${this.name} Score: ${this.score}`;
    console.log(`✔ Рахунок оновлено: ${this.score}`);
  }

  reset() {
    console.log(`🔄 Скидання гравця ${this.name}...`);
  
    this.hand = []; // Очищення масиву карт гравця
    this.score = 0; // Обнулення рахунку
  
    if (!this.handContainer) {
      console.error("❌ Помилка: handContainer не існує для", this.name);
      return;
    }
  
    // Видаляємо всі карти з контейнера гравця
    this.handContainer.innerHTML = ""; 
    this.handContainer.appendChild(this.createUserScoreElement());
  
    // Переконуємося, що контейнер рахунку оновлений
    this.updateScoreDisplay();
  }
}

export default Player;
