export default class Game {
  constructor(playground) {
    this.playground = playground;
    this.bumpGoblin = this.bumpGoblin.bind(this);
    this.count = 0;
    // Добавляем обработчик событий в конструкторе
    document.addEventListener('click', this.bumpGoblin);
  }

  bumpGoblin(e) {
    const goblin = document.querySelector('.playground-img');
    if (e) {
      if (goblin && e.target.classList.contains('playground-img')) {
        this.updateScore();
        const element = e.target.closest('li');
        if (element && element.firstElementChild) {
          element.firstElementChild.remove(); // удаляем гоблина при попадании
        }
      }
    }
    return this.count;
  }

  updateScore() {
    // Обновляем счет
    this.count = this.scoring(this.count);
  }

  scoring(count) {
    count++;
    return count;
  }
}
