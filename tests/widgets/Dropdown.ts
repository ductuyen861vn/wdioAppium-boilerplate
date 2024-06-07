import BaseController from './BaseController.js';

export default class Dropdown extends BaseController {
    constructor(element: WebdriverIO.Element) {
        super(element);
    }

    async selectByValue(value: string) {
        await this.element.selectByAttribute('value', value);
    }

    async selectByVisibleText(text: string) {
        await this.element.selectByVisibleText(text);
    }

    // Add other dropdown-specific methods here
}