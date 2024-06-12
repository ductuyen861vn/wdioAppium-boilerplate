export default class BaseController {
    protected pElement: Promise<WebdriverIO.Element>;

    constructor(element: Promise<WebdriverIO.Element>) {
        this.pElement = element;
    }

    async click() {
        const element = await this.pElement;
        await element.click();
    }

    async isDisplayed() {
        const element = await this.pElement;
        return await element.isDisplayed();
    }

    // Add other common methods here
}