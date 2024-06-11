export class WaitUtils {

    /**
     * Waits for an element to be displayed (visible).
     * @param {WebdriverIO.Element} element - The element to wait for.
     * @param {number} timeout - The maximum time to wait in milliseconds.
     */
    static async waitForElementToBeVisible(element: WebdriverIO.Element, timeout: number = 5000): Promise<void> {
        await element.waitForDisplayed({
            timeout,
            timeoutMsg: 'Element was not displayed within the timeout'
        });
    }

    /**
     * Waits for an element to be clickable.
     * @param {WebdriverIO.Element} element - The element to wait for.
     * @param {number} timeout - The maximum time to wait in milliseconds.
     */
    static async waitForElementToBeClickable(element: WebdriverIO.Element, timeout: number = 5000): Promise<void> {
        await element.waitForClickable({
            timeout,
            timeoutMsg: 'Element was not clickable within the timeout'
        });
    }

    /**
     * Waits for an element to exist in the DOM.
     * @param {WebdriverIO.Element} element - The element to wait for.
     * @param {number} timeout - The maximum time to wait in milliseconds.
     */
    static async waitForElementToExist(element: WebdriverIO.Element, timeout: number = 5000): Promise<void> {
        await element.waitForExist({
            timeout,
            timeoutMsg: 'Element did not exist within the timeout'
        });
    }

    /**
     * Waits for an element to disappear (not be displayed).
     * @param {WebdriverIO.Element} element - The element to wait for.
     * @param {number} timeout - The maximum time to wait in milliseconds.
     */
    static async waitForElementToDisappear(element: WebdriverIO.Element, timeout: number = 5000): Promise<void> {
        await browser.waitUntil(
            async () => !(await element.isDisplayed()),
            {
                timeout,
                timeoutMsg: 'Element did not disappear within the timeout'
            }
        );
    }

    /**
     * Waits for an element's text to equal a specific value.
     * @param {WebdriverIO.Element} element - The element to wait for.
     * @param {string} text - The text to wait for.
     * @param {number} timeout - The maximum time to wait in milliseconds.
     */
    static async waitForElementTextToBe(element: WebdriverIO.Element, text: string, timeout: number = 5000): Promise<void> {
        await browser.waitUntil(
            async () => (await element.getText()) === text,
            {
                timeout,
                timeoutMsg: `Element's text did not become "${text}" within the timeout`
            }
        );
    }

    /**
     * Waits for an element's value to equal a specific value.
     * @param {WebdriverIO.Element} element - The element to wait for.
     * @param {string} value - The value to wait for.
     * @param {number} timeout - The maximum time to wait in milliseconds.
     */
    static async waitForElementValueToBe(element: WebdriverIO.Element, value: string, timeout: number = 5000): Promise<void> {
        await browser.waitUntil(
            async () => (await element.getValue()) === value,
            {
                timeout,
                timeoutMsg: `Element's value did not become "${value}" within the timeout`
            }
        );
    }

    // Add other wait methods here as needed
}