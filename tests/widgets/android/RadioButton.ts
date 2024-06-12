import BaseController from '../BaseController.js';

export default class RadioButton extends BaseController {
    constructor(element: Promise<WebdriverIO.Element>) {
        super(element);
    }

    async clickButton() {
        await this.click();
    }

    // Add other button-specific methods here
}