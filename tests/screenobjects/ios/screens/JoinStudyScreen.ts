import BaseScreen from "../../BaseScreen.js";
import logger from "@wdio/logger";
import JoinStudyScreenObjects from "../objects/en/JoinStudyScreenObjects.js";
import {languageSettings} from "../../../helpers/LanguageSettings.js";

const log = logger('JoinStudyScreen');

const SELECTORS = {
    SCREEN: '~JoinStudyScreen-screen',
};

class JoinStudyScreen extends BaseScreen {
    // @ts-ignore
    private joinStudyScreenObjects: typeof JoinStudyScreenObjects;
    constructor() {
        super(SELECTORS.SCREEN);
        this.initialize()
    }

    async initialize() {
        const language = languageSettings.getLanguage();
        try {
            this.joinStudyScreenObjects = (await import(`../objects/${language}/JoinStudyScreenObjects.js`)).default;
        } catch (error) {
            throw new Error(`Failed to load element container for language: ${language}`);
        }
    }

    get screen() {
        return $(SELECTORS.SCREEN);
    }

    async clickOnButtonYes() {
        log.info("Click on button Yes");
        await this.joinStudyScreenObjects.btnYes.click()
    }

    async clickOnButtonNo() {
        log.info("Click on button No");
        await this.joinStudyScreenObjects.btnNo.click()
    }

}

export default new JoinStudyScreen();
