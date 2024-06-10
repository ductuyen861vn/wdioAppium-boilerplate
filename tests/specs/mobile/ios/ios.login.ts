import HomeScreen from "../../../screenobjects/ios/screens/HomeScreen.js";
import LoginScreen from "../../../screenobjects/ios/screens/LoginScreen.js";
import {BaseTest} from "../../BaseTest.js";
import {languageSettings} from "../../../helpers/LanguageSettings.js";
import {TestDataUtils} from "../../../helpers/TestDataUtils.js";
import {TestLocalizationUtils} from "../../../helpers/TestLocalizationUtils.js";

const testData = await JSON.parse(await TestDataUtils.readTestDataFile());
const testLOC = await JSON.parse(await TestLocalizationUtils.readLOCFile());

export class IOSLoginPage extends BaseTest {
    constructor() {
        super();
    }

    async testMethod() {
        describe('Thread-Mobile[IOS]-Verify buttons on Login Screen', () => {
            before(async () => {
                await this.setup();
            });

            after(() => {
                this.teardown();
            });

            const dataDriven = [
                {userName: testData.TC_0001.participant1.username, participant:testData.TC_0001.participant1},
                {userName: testData.TC_0001.participant2.username, participant:testData.TC_0001.participant2},
            ];

            dataDriven.forEach(function (run) {
                it(`should return error message if login by invalid user : ${run.userName}`, async () => {
                    await HomeScreen.clickOnButtonSignIn()
                    await LoginScreen.submitLogin(run.participant.username, run.participant.password)
                    await expect($(`[label="Username not found."]`)).toBeDisplayed({ wait: 10 * 1000 })
                });
            })

            const locTest = [
                {language: testLOC.en.language, locData:testLOC.en.TC_0001, userName: testData.TC_0001.participant1.username, participant:testData.TC_0001.participant1},
                {language: testLOC.fr.language, locDta:testLOC.fr.TC_0001, userName: testData.TC_0001.participant2.username, participant:testData.TC_0001.participant2},
            ];

            locTest.forEach(function (run) {
                it(`[Language=${run.language}]should return error message if login by invalid user : ${run.userName}` , async () => {
                    await languageSettings.setLanguage("fr")
                    await HomeScreen.initialize()
                    const loc = await TestLocalizationUtils.parseLOCFileWithLanguageSetting();

                    await HomeScreen.clickOnButtonSignIn()
                    await LoginScreen.submitLogin(run.participant.username, run.participant.password)
                    const errorMessage = `[label="${loc.TC_0001.loginScreen.txtForgotPassword}."]`
                    await expect($(errorMessage)).toBeDisplayed({ wait: 10 * 1000 })
                });
            })
        });
    }
}

new IOSLoginPage().testMethod();