export function addCustomCommands() {
    driver.addCommand('waitForElementToDisappear', async function (this: WebdriverIO.Element, timeout: number = 5000) {
        await driver.waitUntil(
            async () => !(await this.isDisplayed()),
            {
                timeout,
                timeoutMsg: 'Element did not disappear within the timeout'
            }
        );
    }, true);

    driver.addCommand('waitForElementToBeClickable', async function (this: WebdriverIO.Element, timeout: number = 5000) {
        await driver.waitUntil(
            async () => await this.isClickable(),
            {
                timeout,
                timeoutMsg: 'Element was not clickable within the timeout'
            }
        );
    }, true);

    driver.addCommand('waitForText', async function (this: WebdriverIO.Element, text: string, timeout: number = 5000) {
        await driver.waitUntil(
            async () => (await this.getText()).includes(text),
            {
                timeout,
                timeoutMsg: `Text "${text}" not found within the timeout`
            }
        );
    }, true);
}