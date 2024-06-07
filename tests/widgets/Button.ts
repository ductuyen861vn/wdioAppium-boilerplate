import BaseController from './BaseController.js';

export default class Button extends BaseController {
    constructor(element: WebdriverIO.Element) {
        super(element);
    }

    async clickButton() {
        await this.click();
    }

    // Add other button-specific methods here
}