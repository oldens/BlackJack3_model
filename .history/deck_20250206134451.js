class Deck {
    constructor() {
        this.cards = createDeck();
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

}

export default Deck;