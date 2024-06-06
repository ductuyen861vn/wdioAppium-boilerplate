import HomeScreen from "../../../screenobjects/android/screens/HomeScreen.js";

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
