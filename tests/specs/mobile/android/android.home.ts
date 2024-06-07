import HomeScreen from "@androidScreens/HomeScreen.js";
import {BaseTest} from "@specs/BaseTest.js";

export class AndroidHomePage extends BaseTest {
    constructor() {
        super();
    }

    async testMethod() {
        describe('Thread-Mobile[IOS]-Verify buttons on Home Screen', () => {
            beforeEach(async () => {
            });

            it('should be open SignIn screen when click on button SignIn', async () => {
                await HomeScreen.clickOnButtonSignIn()
            });

            it('should be open JoinStudy screen when click on button JoinStudy', async () => {
                await HomeScreen.clickOnButtonJoinStudy()
            });
        });
    }
}

new AndroidHomePage().testMethod();
