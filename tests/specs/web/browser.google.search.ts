import {browser} from "@wdio/globals";


describe('WebdriverIO and Appium research', () => {
    it('should be open web successfully', async () => {
        console.log("waiting for 5 seconds")
        await driver.pause(50000)
        await browser.url("https://google.com/");
    });
});