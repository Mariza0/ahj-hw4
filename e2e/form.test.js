import puppeteer from 'puppeteer';

describe('form load', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('launch new page', async () => {
    await page.goto('http://localhost:9000');

    await page.waitForSelector('body');
  });

  afterAll(async () => {
    await browser.close();
  });
});
