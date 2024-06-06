import {browser} from "@wdio/globals";
import {JsonUtils} from "../helpers/JsonUtils.js";
import logger from "@wdio/logger";
const log = logger('BaseScreen');

export default class BasePage {
    public testData: any;
    public environment: any;
    public loc: any ;

    constructor() {
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
     * Opens a sub page of the page
     */
    async open (path: string):Promise<string> {
        return browser.url(path);
    }

    async pauseSecond(value:number){
        return browser.pause(value * 1000)
    }
}
