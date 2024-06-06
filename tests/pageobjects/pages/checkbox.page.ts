import BasePage from '../BasePage.js';

class CheckboxPage extends BasePage {
    constructor() {
        super();
    }

    /**
     * define elements
     */
    get lastCheckbox () { return $('#checkboxes input:last-Child'); }
    get firstCheckbox (){ return $('#checkboxes input:first-Child'); }

    /**
     * overwrite specific options to adapt into page object
     */
    async open (): Promise<string> {
        return super.open('checkboxes');
    }
}

export default new CheckboxPage();
