import Card from "./card.js";

class Deck {
  constructor() {
    this.cards = this.createDeck();
  }

  shuffleDeck() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  dealCard() {
    return this.cards.pop();
  }

  createDeck() {
    const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    const ranks = [
      { name: "1", value: 11 }, // Ace
      { name: "2", value: 2 },
      { name: "3", value: 3 },
      { name: "4", value: 4 },
      { name: "5", value: 5 },
      { name: "6", value: 6 },
      { name: "7", value: 7 },
      { name: "8", value: 8 },
      { name: "9", value: 9 },
      { name: "10", value: 10 },
      { name: "11", value: 10 }, // Jack
      { name: "12", value: 10 }, // Queen
      { name: "13", value: 10 }, // King
    ];

    const deck = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        let card = new Card(rank.name, rank.value, `${suit} ${rank.name}.png`);
        deck.push(card);
      }
    }
  }
}

export default Deck;
