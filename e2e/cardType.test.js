import puppeteer from 'puppeteer';

describe('Check cardType in input', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
  });

  // ввод валидной карты
  test('input valid number', async () => {
    await page.goto('http://localhost:9000');
    await page.type('input', '2200111');
  });

  // появление класса disable у карты НЕ мир
  test('get classes', async () => {
    await page.$('.card-mir.card-size');
    await page.$('.card-mastercar.card-size.disabled');
    await page.$('.card-discover.card-size.disabled');
    await page.$('.card-visa.card-size.disabled');
    await page.$('.card-jcb.card-size.disabled');
    await page.$('.card-amer-express.card-size.disabled');
  });

  // ввод НЕвалидной карты
  test('input valid number', async () => {
    await page.goto('http://localhost:9000');
    await page.type('input', '0000111');
  });

  // при вводе невалидного номера
  test('get classes', async () => {
    await page.$('.card-mir.card-size');
    await page.$('.card-mastercar.card-size');
    await page.$('.card-discover.card-size');
    await page.$('.card-visa.card-size');
    await page.$('.card-jcb.card-size');
    await page.$('.card-amer-express.card-size');
  });

  afterAll(async () => {
    await browser.close();
  });
});
