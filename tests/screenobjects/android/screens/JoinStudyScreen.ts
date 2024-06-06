import AppScreen from "../../AppScreen.js";
import logger from "@wdio/logger";
import JoinStudyScreenObjects from "../objects/JoinStudyScreenObjects.js";

const log = logger('JoinStudyScreen');

const SELECTORS = {
    SCREEN: '~JoinStudyScreen-screen',
};

class JoinStudyScreen extends AppScreen {
    constructor() {
        super(SELECTORS.SCREEN);
    }

    get screen() {
        return $(SELECTORS.SCREEN);
    }

    async clickOnButtonYes() {
        log.info("Click on button Yes");
        await JoinStudyScreenObjects.btnYes.click()
    }

    async clickOnButtonNo() {
        log.info("Click on button No");
        await JoinStudyScreenObjects.btnNo.click()
    }

}

export default new JoinStudyScreen();
