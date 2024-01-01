import './playground.css';
import '../game/game.css';

let countGoblin = 0;

export default class PlayGround {
  constructor() {
    // Привязываем методы к текущему экземпляру класса
    this.moveGoblin = this.moveGoblin.bind(this);
    // this.createGoblin = this.createGoblin.bind(this);
  }

  moveGoblin() {
    let goblin = document.querySelector('.playground-img');
    if (goblin === null) {
      goblin = this.createGoblin();
    }
    const collectionElements = document.querySelectorAll('.playground-item');
    let positionRandom = Math.floor(Math.random() * collectionElements.length);
    for (let i = 0; i <= collectionElements.length - 1; i++) {
      if (collectionElements[i].firstElementChild) {
        if (i === positionRandom) {
          while (i === positionRandom) {
            positionRandom = Math.floor(Math.random() * collectionElements.length);
          }
        }
        collectionElements[i].firstElementChild.remove();
      }
    }
    collectionElements[positionRandom].append(goblin);

    countGoblin++;
    return countGoblin;
  }

  createGoblin() {
    const newElem = document.createElement('img');
    newElem.src = require('../../img/goblin.png');
    newElem.classList.add('playground-img');
    return newElem;
  }
}
