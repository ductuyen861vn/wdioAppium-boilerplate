export class WebElementUtils {
    /**
     * Check if a text exists on the screen for Android, iOS, and Web browsers
     * @param text The text to search for
     * @returns {Promise<boolean>} True if the text exists, false otherwise
     */
    static async isTextExistOnSource(text: string, parentElement?: WebdriverIO.Element): Promise<boolean> {
        const xpath = await this.constructXPathForText(text, parentElement);

        const elements = parentElement ? await parentElement.$$(xpath) : await driver.$$(xpath);
        return elements.length > 0;
    }

    static async isTextVisibleInViewport(text: string, parentElement?: WebdriverIO.Element): Promise<boolean> {
        const xpath = await this.constructXPathForText(text, parentElement);
        // Check if the text is visible within the parent element
        const isTextVisible = await this.isTextExistOnSource(text, parentElement);

        if (isTextVisible) {
            // Check if the element is in the viewport
            return await this.isElementInViewport(parentElement ? await parentElement.$(xpath) : await driver.$(xpath));
        }

        return false;
    }

    /**
     * This one is to ensure searchAble element is always on viewport since some elements exist on page but out of view
     * @param element
     */
    static async isElementInViewport(element: WebdriverIO.Element): Promise<boolean> {
        const {x, y} = await element.getLocation();
        const {width, height} = await element.getSize();
        const screenRect = await driver.getWindowRect();
        const viewportWidth = screenRect.width;
        const viewportHeight = screenRect.height;

        const elementCenterX = x + width / 2;
        const elementCenterY = y + height / 2;

        return (
            elementCenterX >= 0 &&
            elementCenterX <= viewportWidth &&
            elementCenterY >= 0 &&
            elementCenterY <= viewportHeight
        );
    }

    /**
     * Construct XPath query for finding text based on platform
     * @param text The text to search for
     * @param platformName The platform name ('android', 'ios', 'web')
     * @returns {string} The constructed XPath query
     */
    static async constructXPathForText(text: string, parentElement?: WebdriverIO.Element): Promise<string> {
        let xpath: string;
        let platformName: string;

        // Check if platform is Android
        if (await driver.isAndroid) {
            platformName = 'android';
        }
        // Check if platform is iOS
        else if (await driver.isIOS) {
            platformName = 'ios';
        }
        // Assume platform is Web browser if not Android or iOS
        else {
            platformName = 'web';
        }

        // Construct base XPath query based on platform
        if (platformName === 'android') {
            xpath = `//*[contains(@content-desc, '${text}') or contains(@text, '${text}')]`;
        } else if (platformName === 'ios') {
            xpath = `//*[contains(@name, '${text}') or contains(@value, '${text}') or contains(@label, '${text}')]`;
        } else if (platformName === 'web') {
            xpath = `//*[contains(text(), '${text}')]`;
        } else {
            throw new Error('Unsupported platform');
        }

        // Append parent element condition to XPath query if provided
        if (parentElement) {
            xpath = `.${xpath}`;
        }

        return xpath;
    }
}