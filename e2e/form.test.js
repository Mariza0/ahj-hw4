import puppeteer from 'puppeteer';

describe('form load', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
