import { detectCardType, LuhnCheck } from './validators';

export default class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
    <form data-widget="cards-form-widget">
    <ul class="cards"> 
    </ul>
      <div class="form-control">
          <input id="card-input" data-id="card-input" type="text">
          <button data-id="card-submit">Click to Validate</button>
       </div>
       <div class="table"></div>
    </form>
    <div class="Luhn-status">Check Luhn Algorithm
    <span class="status-luhn"></span>
    <span class="status-luhn-negative"></span>
    </div>
    `;
  }

  static get inputSelector() {
    return '[data-id=card-input]';
  }

  static get submitSelector() {
    return '[data-id=card-submit]';
  }

  imagesBlock() {
    const images = {
      'card-mir': require('../img/mir.jpeg'),
      'card-jcb': require('../img/jcb.png'),
      'card-mastercard': require('../img/mastercard.png'),
      'card-visa': require('../img/visa.png'),
      'card-discover': require('../img/discover.png'),
      'card-amer-express': require('../img/amer-express.png'),
    };

    const cards = this.parentEl.querySelector('.cards');
    for (const key in images) {
      if (key in images) {
        const newLi = document.createElement('li');
        const newImg = document.createElement('img');
        newImg.src = images[key];
        newImg.classList.add(key);
        newImg.classList.add('card-size');
        newLi.append(newImg);
        cards.append(newLi);
      }
    }
  }

  addTable() {
    // Создаем таблицу
    const table = document.createElement('table');

    // Создаем заголовок таблицы (thead)
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const th1 = document.createElement('th');
    th1.textContent = 'Credit Card Type';
    headerRow.appendChild(th1);

    const th2 = document.createElement('th');
    th2.textContent = 'Credit Card Number';
    headerRow.appendChild(th2);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Создаем тело таблицы (tbody)
    const tbody = document.createElement('tbody');
    const dict = {
      'American Express': '371449635398431',
      Discover: '6011111111111117',
      JCB: '3530111333300000',
      MasterCard: '5555555555554444',
      Visa: '4111111111111111',
      MIR: '2200111111111111',
    };
    for (const key in dict) {
      // проверка key явл. собств. св-ом объекта. Позв. избежать явного вызова метода hasOwnProperty
      if (key in dict) {
        const row = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = key;
        row.appendChild(td1);
        const td2 = document.createElement('td');
        td2.textContent = dict[key];
        row.appendChild(td2);
        tbody.appendChild(row);
      }
    }
    table.appendChild(tbody);
    const container = this.parentEl.querySelector('.table');
    container.appendChild(table);
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    this.imagesBlock();
    this.addTable();
    const input = this.parentEl.querySelector(this.constructor.inputSelector);
    input.addEventListener('input', (evt) => this.inInput(evt));
    const submit = this.parentEl.querySelector(this.constructor.submitSelector);
    submit.addEventListener('click', (evt) => this.onSubmit(evt));
  }

  inInput(evt) {
    // add event listeners here
    evt.preventDefault();
    const inputEl = this.parentEl.querySelector(this.constructor.inputSelector);
    const res = detectCardType(inputEl.value);
    if (res !== 'Unknown') {
      // добавляем маску на изображения карт
      const collection = this.parentEl.getElementsByTagName('li');
      for (let i = 0; i < collection.length; i++) {
        if (!collection[i].firstElementChild.classList.contains(res)) {
          collection[i].firstElementChild.classList.add('disabled');
        }
      }
    } else {
      const collection = this.parentEl.getElementsByTagName('li');
      for (let i = 0; i < collection.length; i++) {
        if (collection[i].firstElementChild.classList.contains('disabled')) {
          collection[i].firstElementChild.classList.remove('disabled');
        }
      }
    }
  }

  onSubmit(evt) {
    // add event listeners here
    evt.preventDefault();
    const input = this.parentEl.querySelector(this.constructor.inputSelector);
    const inputValue = input.value;
    const res = LuhnCheck(inputValue);
    const status = document.querySelector('.status-luhn');
    const statusNegative = document.querySelector('.status-luhn-negative');
    if (res) {
      status.classList.add('active');

      if (statusNegative.classList.contains('active')) {
        statusNegative.classList.remove('active');
      }
    } else {
      statusNegative.classList.add('active');

      if (status.classList.contains('active')) {
        status.classList.remove('active');
      }
    }
  }
}
