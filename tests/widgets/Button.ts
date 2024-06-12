import BaseController from './BaseController.js';

export default class Button extends BaseController {
    constructor(element: Promise<WebdriverIO.Element>) {
        super(element);
    }

    // Add other button-specific methods here
}