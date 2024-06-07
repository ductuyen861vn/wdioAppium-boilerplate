import BaseController from './BaseController.js';

export default class Table extends BaseController {
    constructor(element: WebdriverIO.Element) {
        super(element);
    }

    async getRowCount() {
        const rows = await this.element.$$('tr');
        return rows.length;
    }

    async getCellText(row: number, column: number) {
        const cell = await this.element.$(`tr:nth-child(${row}) td:nth-child(${column})`);
        return cell.getText();
    }

    // Add other table-specific methods here
}