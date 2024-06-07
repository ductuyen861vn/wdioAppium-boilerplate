import BasePage from '../BasePage.js';
import HomePageObjects from "../objects/en/HomePageObjects.js";
import {browser} from "@wdio/globals";

class HomePage extends BasePage {
    constructor() {
        super();
    }

    async enterValueToSearchBox(value: string) {
        console.log("Entering value to search :" + value);
        await HomePageObjects.txtSearch.setValue(value)
    }

    /**
     * define or overwrite page methods
     */
    async openHomePage() {
        console.log("Opening Home Page")
        await browser.url('https://google.com/');
        console.log("Maximize Window")
        if (!browser.isAndroid && !browser.isIOS) await browser.maximizeWindow()
    }
}

export default new HomePage();