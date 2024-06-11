import HomePage from "../../../pageobjects/pages/HomePage.js";
import HomePageObjects from "../../../pageobjects/objects/en/HomePageObjects.js";
import {BaseTest} from "../../BaseTest.js";
import {languageSettings} from "../../../helpers/LanguageSettings.js";
import {TestDataUtils} from "../../../helpers/TestDataUtils.js";

const testData = await JSON.parse(await TestDataUtils.readTestDataFile());

export class WebHome extends BaseTest {
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
                await languageSettings.setLanguage("fr")
                await this.setup()
                await HomePage.openHomePage()
                await HomePage.enterValueToSearchBox("WebdriverIO-FailCase-Step1")
                await HomePageObjects.txtSearch.clearValue()
                await HomePageObjects.txtSearch.setValue("WebdriverIO-FailCase-Step2")
                const errorMessage = `[label="${this.loc.TC_0001.loginScreen.txtForgotPassword}."]`
                await expect($(errorMessage)).toBeDisplayed({ wait: 10 * 1000 })
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
