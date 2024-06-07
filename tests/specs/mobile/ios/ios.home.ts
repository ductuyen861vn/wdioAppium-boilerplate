import HomeScreen from "@iosScreens/HomeScreen.js";
import {BaseTest} from "@specs/BaseTest.js";

export class IOSHomePage extends BaseTest {
    constructor() {
        super();
    }

    async testMethod() {
        describe('Thread-Mobile[IOS]-Verify buttons on Home Screen', () => {
            beforeEach(async () => {
            });

            it('should be open SignIn screen when click on button SignIn', async () => {
                await this.logStep('Step 1: Click on button Sign In')
                await HomeScreen.clickOnButtonSignIn()
            });

            it('should be open JoinStudy screen when click on button JoinStudy', async () => {
                await this.logStep('Step 1: Click on button Join Study')
                await HomeScreen.clickOnButtonJoinStudy()
            });

            it('to be failed test case for IOS', async () => {
                await this.logStep('Step 1: Click on button Sign In')
                await HomeScreen.clickOnButtonSignIn()
                await this.logStep('Step 2: Verify text ToBeFailed show on screen')
                await expect($('[label="ToBeFailed"]')).toBeDisplayed({ wait: 2 * 1000 , message: "ToBeFailed" })
            });
        });
    }
}

new IOSHomePage().testMethod();