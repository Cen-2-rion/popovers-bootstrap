import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("popover form", () => {
  let server, browser, page;
  let url = "http://localhost:8080";

  beforeAll(async () => {
    server = fork(`${__dirname}/server.js`);

    browser = await puppeteer.launch({
      // headless: false,
      slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });

  test("clicking on the button should show a popover", async () => {
    await page.goto(url);

    await page.waitForSelector(".container");

    const container = await page.$(".container");
    const button = await container.$(".btn");
    await button.click();

    const popover = await page.waitForSelector("[aria-describedby]");
    expect(popover).toBeTruthy();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
