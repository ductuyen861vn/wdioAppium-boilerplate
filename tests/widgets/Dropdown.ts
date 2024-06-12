import BaseController from './BaseController.js';

export default class Dropdown extends BaseController {
    constructor(element: Promise<WebdriverIO.Element>) {
        super(element);
    }

    async selectByValue(value: string) {
        const element = await this.pElement;
        await element.selectByAttribute('value', value);
    }

    async selectByVisibleText(text: string) {
        const element = await this.pElement;
        await element.selectByVisibleText(text);
    }

    // Add other dropdown-specific methods here
}