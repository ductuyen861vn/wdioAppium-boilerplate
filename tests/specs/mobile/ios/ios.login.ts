import HomeScreen from "../../../screenobjects/ios/screens/HomeScreen.js";
import LoginScreen from "../../../screenobjects/ios/screens/LoginScreen.js";
import {JsonUtils} from "../../../helpers/JsonUtils.js";

const testData = await JSON.parse(await JsonUtils.readTestDataFile());
const loc = await JSON.parse(await JsonUtils.readLOCFile())
const env = await JSON.parse(await JsonUtils.readEnvironmentFile())

describe('Thread-Mobile[IOS]-Verify buttons on Login Screen', () => {
    beforeEach(async () => {

    });

    const runs = [
        {userName: testData.TC_0001.participant1.username, password: testData.TC_0001.participant1.password},
        {userName: testData.TC_0001.participant2.username, password: testData.TC_0001.participant2.password},
    ];

    runs.forEach(function (run) {
        it('should return error message if login by invalid user ' + run.userName, async () => {
            await HomeScreen.clickOnButtonSignIn()
            await LoginScreen.submitLogin(run.userName, run.password)
            await expect($('[label="Username not found."]')).toBeDisplayed({ wait: 10 * 1000 })
        });
    })
});