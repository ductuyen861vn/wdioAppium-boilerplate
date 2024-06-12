import BaseController from './BaseController.js';

export default class Table extends BaseController {
    constructor(element: Promise<WebdriverIO.Element>) {
        super(element);
    }

    async getRowCount() {
        const element = await this.pElement;
        const rows = await element.$$('tr');
        return rows.length;
    }

    async getCellText(row: number, column: number) {
        const element = await this.pElement;
        const cell = await element.$(`tr:nth-child(${row}) td:nth-child(${column})`);
        return cell.getText();
    }

    // Add other table-specific methods here
}