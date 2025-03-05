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

    createDeck(){   
        for (let i = 0; i < 10; i++) {
            let card = new Card(i, i, `images/${i}.png`);
        }
    }



}

export default Deck;