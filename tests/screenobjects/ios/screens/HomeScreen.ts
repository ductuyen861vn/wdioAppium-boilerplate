import BaseScreen from "../../BaseScreen.js";
import logger from "@wdio/logger";
import HomeScreenObjects from "../objects/en/HomeScreenObjects.js";
import JoinStudyScreenObjects from "../objects/en/JoinStudyScreenObjects.js";
import LoginScreenObjects from "../objects/en/LoginScreenObjects.js";
import {languageSettings} from "../../../helpers/LanguageSettings.js";
import process from "node:process";

const log = logger('HomeScreen');

const SELECTORS = {
    SCREEN: '~Home-screen',
};

class HomeScreen extends BaseScreen {
    // @ts-ignore
    private homeScreenObjects: typeof HomeScreenObjects;
    // @ts-ignore
    private loginScreenObjects: typeof LoginScreenObjects;
    // @ts-ignore
    private joinStudyScreenObjects: typeof JoinStudyScreenObjects;

    constructor () {
        super(SELECTORS.SCREEN);
        this.initialize()
    }

    async initialize() {
        const language = languageSettings.getLanguage();
        try {
            this.homeScreenObjects = (await import(`../objects/${language}/HomeScreenObjects.js`)).default;
            this.loginScreenObjects = (await import(`../objects/${language}/LoginScreenObjects.js`)).default;
            this.joinStudyScreenObjects = (await import(`../objects/${language}/JoinStudyScreenObjects.js`)).default;
        } catch (error) {
            throw new Error(`Failed to load element container for language: ${language}`);
        }
    }

    get screen () {return $(SELECTORS.SCREEN);}

    async clickOnButtonJoinStudy(){
        log.info("Click on button Join Study");
       await this.homeScreenObjects.btnJoinStudy.click()
        await expect(this.joinStudyScreenObjects.lblQuestion).toBeDisplayed()
    }

    async clickOnButtonSignIn(){
        log.info("Click on button SignIn");
        await this.homeScreenObjects.btnSignIn.click()
        await expect(this.loginScreenObjects.txtPassword).toBeDisplayed()
    }

}

export default new HomeScreen();
