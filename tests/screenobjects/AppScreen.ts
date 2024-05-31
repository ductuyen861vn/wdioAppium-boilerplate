import SystemObjects from "./ios/objects/SystemObjects.js";
import logger from "@wdio/logger";
const log = logger('JoinStudyScreen');

export default class AppScreen {
    private selector: string;

    constructor (selector: string) {
        this.selector = selector;
    }

    /**
     * Wait for the login screen to be visible
     *
     * @param {boolean} isShown
     */
    async waitForIsShown (isShown = true): Promise<boolean | void> {
        return $(this.selector).waitForDisplayed({
            reverse: !isShown,
        });
    }

    async closeKeyboardIfExist(isShown = true): Promise<void> {
        log.info("Close keyboard button if exists", isShown);
        if (await driver.isKeyboardShown()){
            if (await SystemObjects.btnDoneKeyboard.isDisplayed()) await SystemObjects.btnDoneKeyboard.click()
        }
    }
}
