class Card {
  constructor(name, value, img) {
    this.name = name;
    this, value = value;
    this.img = img;
  }

show() {
  console.log(`This is a ${this.name} card`);
}
}

export default Card;