import HomeScreen from "../../../screenobjects/ios/screens/HomeScreen.js";
import LoginScreen from "../../../screenobjects/ios/screens/LoginScreen.js";
import {JsonUtils} from "../../../helpers/JsonUtils.js";
import {BaseTest} from "../../BaseTest.js";
import {languageSettings} from "../../../helpers/LanguageSettings.js";

const testData = await JSON.parse(await JsonUtils.readTestDataFile());

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

            const runs = [
                {userName: testData.TC_0001.participant1.username, participant:testData.TC_0001.participant1},
                {userName: testData.TC_0001.participant2.username, participant:testData.TC_0001.participant2},
            ];

            runs.forEach(function (run) {
                it('should return error message if login by invalid user ' + run.userName, async () => {
                    // await languageSettings.setLanguage("fr")
                    // await HomeScreen.initialize()
                    await HomeScreen.clickOnButtonSignIn()
                    await LoginScreen.submitLogin(run.participant.username, run.participant.password)
                    await expect($('[label="Username not found."]')).toBeDisplayed({ wait: 10 * 1000 })
                });
            })
        });
    }
}

new IOSLoginPage().testMethod();