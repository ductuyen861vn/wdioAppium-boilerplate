import { JsonUtils } from "../helpers/JsonUtils.js";
import logger from "@wdio/logger";
const log = logger('wdio.mobile-shared.conf');

export class BaseTest {
    // Common property
    public testData: any;
    public environment: any;
    public loc: any ;
    public logger: any;

    // Common setup for all tests
    async setup() {
        this.logger = log
        log.info("Setup")
        log.info("Loading test data file")
        this.testData = await JSON.parse(await JsonUtils.readTestDataFile());

        log.info("Loading loc file")
        this.loc = await JSON.parse(await JsonUtils.readLOCFile())

        log.info("Loading Environment file")
        this.environment = await JSON.parse(await JsonUtils.readEnvironmentFile())
        return this
    }

    // Common teardown for all tests
    async teardown() {
        log.info('Tearing down');
        // Additional teardown code here
    }
}