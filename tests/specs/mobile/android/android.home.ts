import HomeScreen from "../../../screenobjects/android/screens/HomeScreen.js";
import {BaseTest} from "../../BaseTest.js";

export class AndroidHomePage extends BaseTest {
    constructor() {
        super();
    }

    async testMethod() {
        describe('Thread-Mobile[Android]-Verify buttons on Home Screen, test suite 1', () => {
            beforeEach(async () => {
            });

            it('should be open SignIn screen when click on button SignIn', async () => {
                await HomeScreen.clickOnButtonSignIn()
            });

            it('should be open JoinStudy screen when click on button JoinStudy', async () => {
                await HomeScreen.clickOnButtonJoinStudy()
            });
        });

        describe('Thread-Mobile[Android]-Verify buttons on Home Screen, test suite 2', () => {
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
