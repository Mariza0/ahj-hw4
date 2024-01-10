import puppeteer from 'puppeteer';

describe('form load', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // Убедитесь, что это значение true
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Добавьте эти аргументы
    });
    page = await browser.newPage();
  });
  // beforeEach(async () => {
  //   browser = await puppeteer.launch({
  //     headless: false,
  //     slowMo: 100,
  //     devtools: true,
  //   });

  //   page = await browser.newPage();
  // });

  test('launch new page', async () => {
    await page.goto('http://localhost:9000');

    await page.waitForSelector('body');
  });

  afterAll(async () => {
    await browser.close();
  });
});
