import AppScreen from "../../AppScreen.js";
import logger from "@wdio/logger";
import HomeScreenObjects from "../objects/HomeScreenObjects.js";
import JoinStudyScreenObjects from "../objects/JoinStudyScreenObjects.js";
import LoginScreenObjects from "../objects/LoginScreenObjects.js";

const log = logger('HomeScreen');

const SELECTORS = {
    SCREEN: '~Home-screen',
};

class HomeScreen extends AppScreen {
    constructor () {
        super(SELECTORS.SCREEN);
    }

    get screen () {return $(SELECTORS.SCREEN);}

    async clickOnButtonJoinStudy(){
        log.info("Click on button Join Study");
       await HomeScreenObjects.btnJoinStudy.click()
        await expect(JoinStudyScreenObjects.lblQuestion).toBeDisplayed()
    }

    async clickOnButtonSignIn(){
        log.info("Click on button SignIn");
        await HomeScreenObjects.btnSignIn.click()
        await expect(LoginScreenObjects.txtPassword).toBeDisplayed()
    }

}

export default new HomeScreen();
