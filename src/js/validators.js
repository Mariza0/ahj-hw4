const images = {
  'card-mir': '../img/mir.jpeg',
  'card-jcb': '../img/jcb.png',
  'card-mastercard': '../img/mastercard.png',
  'card-visa': '../img/visa.png',
  'card-discover': '../img/discover.png',
  'card-amer-express': '../img/amer-express.png',
};

export function detectCardType(cardNumber) {
  const visaRegex = /^4/;
  const mastercardRegex = /^(5[1-5])/;
  const mirRegex = /^22/;
  const jcbRegex = /^35/;
  const amexRegex = /^3[47]/;
  const discoverRegex = /^6(?:011|5|4[4-9])/;

  if (visaRegex.test(cardNumber)) {
    return 'card-visa';
  } if (mastercardRegex.test(cardNumber)) {
    return 'card-mastercard';
  } if (mirRegex.test(cardNumber)) {
    return 'card-mir';
  } if (discoverRegex.test(cardNumber)) {
    return 'card-discover';
  } if (jcbRegex.test(cardNumber)) {
    return 'card-jcb';
  } if (amexRegex.test(cardNumber)) {
    return 'card-amer-express';
  }
  return 'Unknown';
}

export function LuhnCheck(cardNumber) {
  // Преобразуем номер карты в массив цифр и инвертируем его
  const digits = cardNumber.split('').map(Number);

  const digitsRevers = digits.reverse();

  // Проходим по каждой второй цифре, удваиваем её и вычитаем 9, если результат больше 9
  for (let i = 1; i < digitsRevers.length; i += 2) {
    // console.log(digits[i])
    digitsRevers[i] *= 2;
    if (digitsRevers[i] > 9) {
      digitsRevers[i] -= 9;
    }
  }

  // Суммируем все цифры
  let sum = 0;
  sum = digitsRevers.reduce((acc, digit) => acc + digit, 0);
  // Карта валидна, если сумма делится на 10 нацело
  return sum % 10 === 0;
}
