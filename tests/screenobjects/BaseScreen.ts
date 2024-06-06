import SystemObjects from "./ios/objects/SystemObjects.js";
import logger from "@wdio/logger";
import {JsonUtils} from "../helpers/JsonUtils.js";
const log = logger('BaseScreen');

export default class BaseScreen {
    private selector: string;
    public testData: any;
    public environment: any;
    public loc: any ;

    constructor (selector: string) {
        this.selector = selector;
        this.setup()
    }

    async setup() {
        log.info("Setup")
        log.info("Loading test data file to AppScreen")
        this.testData = await JSON.parse(await JsonUtils.readTestDataFile());

        log.info("Loading loc file to AppScreen")
        this.loc = await JSON.parse(await JsonUtils.readLOCFile())

        log.info("Loading Environment file to AppScreen")
        this.environment = await JSON.parse(await JsonUtils.readEnvironmentFile())
        return this
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

    async closeIOSKeyboardIfExist(isShown = true): Promise<void> {
        log.info("Close keyboard button if exists", isShown);
        if (await driver.isKeyboardShown()){
            if (await SystemObjects.btnDoneKeyboard.isDisplayed()) await SystemObjects.btnDoneKeyboard.click()
        }
    }
}
