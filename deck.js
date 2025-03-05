import Card from "./card.js";

class Deck {
  constructor(jsonFile) {
    this.cards = [];
    this.ready = this.loadCardsFromJSON(jsonFile); // зберігаємо проміс
  }

  async loadCardsFromJSON(jsonFile) {
    try {
      const response = await fetch(jsonFile);
      const json = await response.json();
      this.importFromJSON(json);
      this.shuffle(); // перемішуємо після завантаження
    } catch (error) {
      console.error("Error loading deck:", error);
    }
  }

  importFromJSON(json) {
    this.cards = json.map(
      (card) =>
        new Card(
          card.value,
          card.suit,
          card.rank,
          `./cards_img/${card.file}`,
          ""
        )
    );
  }

  drawCard() {
    if (this.cards.length === 0) {
      console.error("❌ Колода порожня!");
      return null;
    }
    return this.cards.pop();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    console.log(
      "✅ Перемішана колода:",
      this.cards.map((c) => c.rank + c.suit).join(", ")
    );
  }
}

export default Deck;
