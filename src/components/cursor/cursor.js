export default class Cursor {
  constructor() {
    this.cursor = document.querySelector('.custom-cursor');
    this.moveMouse = this.moveMouse.bind(this);
    document.addEventListener('mousemove', this.moveMouse);
  }

  moveMouse(e) {
    const cursor = document.querySelector('.custom-cursor');
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
  }
}
