import BaseScreen from "../../BaseScreen.js";
import logger from "@wdio/logger";
import HomeScreenObjects from "../objects/en/HomeScreenObjects.js";
import JoinStudyScreenObjects from "../objects/en/JoinStudyScreenObjects.js";
import LoginScreenObjects from "../objects/en/LoginScreenObjects.js";
import {languageSettings} from "../../../helpers/LanguageSettings.js";

const log = logger('HomeScreen');

const SELECTORS = {
    SCREEN: '~Home-screen',
};

class HomeScreen extends BaseScreen {
    // @ts-ignore
    private homeScreenObjects: typeof HomeScreenObjects;

    constructor () {
        super(SELECTORS.SCREEN);
        this.initialize()
    }

    async initialize() {
        const language = languageSettings.getLanguage();
        try {
            this.homeScreenObjects = (await import(`../objects/${language}/HomeScreenObjects.js`)).default;
        } catch (error) {
            throw new Error(`Failed to load element container for language: ${language}`);
        }
    }

    get screen () {return $(SELECTORS.SCREEN);}

    async clickOnButtonJoinStudy(){
        log.info("Click on button Join Study");
       await this.homeScreenObjects.btnJoinStudy.click()
        await expect(JoinStudyScreenObjects.lblQuestion).toBeDisplayed()
    }

    async clickOnButtonSignIn(){
        log.info("Click on button SignIn");
        await this.homeScreenObjects.btnSignIn.click()
        await expect(LoginScreenObjects.txtPassword).toBeDisplayed()
    }

}

export default new HomeScreen();
