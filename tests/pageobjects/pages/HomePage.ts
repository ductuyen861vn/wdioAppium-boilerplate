import Page from '../page.js';
import HomePageObjects from '../objects/HomePageObjects.js';

class HomePage extends Page {
    async enterValueToSearchBox (value: string){
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
        await browser.maximizeWindow()
    }
}

export default new HomePage();