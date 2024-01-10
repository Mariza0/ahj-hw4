import puppeteer from 'puppeteer';

describe('Check cardNumber through submit', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  // ввод валидной карты VISA (номер сгенерирован на общедоступном сервисе https://www.vccgenerator.org/ru/visa-card-generator-result/ )
  test('input valid number', async () => {
    await page.goto('http://localhost:9000');
    await page.type('input', '4019243327095581');
    const submit = await page.$('[data-id="card-submit"]');
    submit.click();
    await page.$('.status-luhn.activate');
    await page.waitForTimeout(2000);
  }, 10000);

  // ввод валидной карты MASTERCARD (номер сгенерирован на общедоступном сервисе https://www.vccgenerator.org/ru/visa-card-generator-result/ )
  test('input valid number', async () => {
    await page.goto('http://localhost:9000');
    await page.type('input', '5524910129565442');
    const submit = await page.$('[data-id="card-submit"]');
    submit.click();
    await page.$('.status-luhn.activate');
    await page.waitForTimeout(2000);
  }, 10000);

  // ввод валидной карты JCB ((номер взят на общедоступном сервисе https://www.freeformatter.com/credit-card-number-generator-validator.html/
  test('input valid number', async () => {
    await page.goto('http://localhost:9000');
    await page.type('input', '3533283112872371');
    const submit = await page.$('[data-id="card-submit"]');
    submit.click();
    await page.$('.status-luhn.activate');
    await page.waitForTimeout(2000);
  }, 10000);

  // ввод валидной карты DISCOVER (номер взят на общедоступном сервисе https://www.freeformatter.com/credit-card-number-generator-validator.html/
  test('input valid number', async () => {
    await page.goto('http://localhost:9000');
    await page.type('input', '6011180540391921');
    const submit = await page.$('[data-id="card-submit"]');
    submit.click();
    await page.$('.status-luhn.activate');
    await page.waitForTimeout(2000);
  }, 10000);

  // ввод валидной карты American Express (номер взят на общедоступном сервисе https://www.freeformatter.com/credit-card-number-generator-validator.html/
  test('input valid number', async () => {
    await page.goto('http://localhost:9000');
    await page.type('input', '344261159923708');
    const submit = await page.$('[data-id="card-submit"]');
    submit.click();
    await page.$('.status-luhn.activate');
    await page.waitForTimeout(2000);
  }, 10000);

  // ввод валидной карты MIR
  test('input valid number', async () => {
    await page.goto('http://localhost:9000');
    await page.type('input', '2201382000000013');
    const submit = await page.$('[data-id="card-submit"]');
    submit.click();
    await page.$('.status-luhn.activate');
    await page.waitForTimeout(2000);
  }, 10000);

  test('input valid number', async () => {
    await page.goto('http://localhost:9000');
    await page.type('input', '220012345678910');
    const submit = await page.$('[data-id="card-submit"]');
    submit.click();
    await page.$('.status-luhn.activate');
    await page.waitForTimeout(2000);
  }, 10000);

  // ввод НЕвалидной карты
  test('input valid number', async () => {
    await page.goto('http://localhost:9000');
    await page.type('input', '0000111');
    const submit = await page.$('[data-id="card-submit"]');
    submit.click();
    await page.$('.status-luhn-negative.activate');
    await page.waitForTimeout(2000);
  }, 10000);

  afterAll(async () => {
    await browser.close();
  });
});
