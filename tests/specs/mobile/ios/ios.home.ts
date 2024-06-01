import HomeScreen from "../../../screenobjects/ios/screens/HomeScreen.js";
import LoginScreen from "../../../screenobjects/ios/screens/LoginScreen.js";

describe('Verify buttons on Home Screen', () => {
    beforeEach(async () => {
    });

    it('should be open SignIn screen when click on button SignIn', async () => {
        await HomeScreen.clickOnButtonSignIn()
    });

    it('should be open JoinStudy screen when click on button JoinStudy', async () => {
        await HomeScreen.clickOnButtonJoinStudy()
    });

    it('should return error message if login by invalid user', async () => {
        await HomeScreen.clickOnButtonSignIn()
        await LoginScreen.submitLogin("InvalidUser@gmail.com", "InvalidPassword")
        await expect($('[label="Username not found."]')).toBeDisplayed({ wait: 10 * 1000 })
    });
});
