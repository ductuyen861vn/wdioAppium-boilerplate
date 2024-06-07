export default class BaseController {
    protected element: WebdriverIO.Element;

    constructor(element: WebdriverIO.Element) {
        this.element = element;
    }

    async click() {
        await this.element.click();
    }

    async isDisplayed() {
        return await this.element.isDisplayed();
    }

    // Add other common methods here
}