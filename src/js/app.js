import Game from '../components/game/game';
import PlayGround from '../components/playground/playground';
import Cursor from '../components/cursor/cursor';

let point = 0;
const cursor = new Cursor();

document.addEventListener('DOMContentLoaded', () => {
  const goblin = new PlayGround(document.querySelector('.playground'));
  const game = new Game(goblin);
  let count = 0;
  const intervalId = setInterval(() => {
    goblin.moveGoblin();
    point = game.bumpGoblin();
    count++;
    let myVariable = `количество попаданий в гоблина: ${point}`;
    let outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = myVariable;
    
    if (point === 5) {
      clearInterval(intervalId); // Останавливаем выполнение setInterval
      alert('Игра завершена. Вы поймали 5 гоблинов.');
      window.location.reload();
    } else if (count === 6) {
      clearInterval(intervalId); // Останавливаем выполнение setInterval
      alert('Игра завершена. Вы пропустили 5 гоблинов.');
      window.location.reload();
    }
  }, 1000);
});
