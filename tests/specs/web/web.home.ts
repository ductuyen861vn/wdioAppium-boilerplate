import HomePage from "../../pageobjects/pages/HomePage.ts";
import HomePageObjects from "../../pageobjects/objects/HomePageObjects.js";
import {BaseTest} from "../BaseTest.js";

class WebHome extends BaseTest {
    constructor() {
        super();
    }

    async testMethod() {
        describe('Thread-Web-Verify buttons on Home Screen', () => {
            before(async () => {
                await this.setup();
            });

            after(() => {
                this.teardown();
            });

            it('should be open web successfully - Test 1', async () => {
                console.log("waiting for 5 seconds")
                const a = await this.testData.TC_0001.participant1.username
                await HomePage.openHomePage()
                await HomePage.enterValueToSearchBox("WebdriverIO-FailCase-Step1")
                await HomePageObjects.txtSearch.clearValue()
                await HomePageObjects.txtSearch.setValue("WebdriverIO-FailCase-Step2")
                await expect($("//ToBeFailed")).toBeDisplayed({wait:5*1000, message:"Force fail to test"})
            });

            it('should be open web successfully - Test 2', async () => {
                console.log("waiting for 5 seconds")
                await HomePage.openHomePage()
                await HomePage.enterValueToSearchBox("WebdriverIO-PassCase-Step1")
                await HomePageObjects.txtSearch.clearValue()
                await HomePageObjects.txtSearch.setValue("WebdriverIO-PassCase-Step2")
            });
        });
    }
}

new WebHome().testMethod();
