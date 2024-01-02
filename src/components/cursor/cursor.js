export default class Cursor {
  constructor() {
    this.cursor = document.querySelector('.custom-cursor');
    this.moveMouse = this.moveMouse.bind(this);
    document.addEventListener('mousemove', this.moveMouse);
  }

  moveMouse(e) {
    const cursor = document.querySelector('.custom-cursor');
    // cursor.style.left = `${e.pageX}px`;
    // cursor.style.top = `${e.pageY}px`;
    cursor.style.left = e.pageX - cursor.offsetWidth / 2 + 'px';
    cursor.style.top = e.pageY - cursor.offsetHeight / 2 + 'px';
  }
}
