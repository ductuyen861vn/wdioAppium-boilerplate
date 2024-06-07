import { JsonUtils } from "@helpers/JsonUtils.js";
import logger from "@wdio/logger";
const log = logger('wdio.mobile-shared.conf');
import allureReporter from '@wdio/allure-reporter'

export class BaseTest {
    // Common property
    public testData: any;
    public environment: any;
    public loc: any ;
    public logger: any;

    constructor() {
    }

    // Common setup for all tests
    async setup() {
        this.logger = log
        log.info("Setup")
        log.info("Loading test data file to BaseTest")
        this.testData = await JSON.parse(await JsonUtils.readTestDataFile());

        log.info("Loading loc file to BaseTest")
        this.loc = await JSON.parse(await JsonUtils.readLOCFile())

        log.info("Loading Environment file to BaseTest")
        this.environment = await JSON.parse(await JsonUtils.readEnvironmentFile())
        return this
    }

    async logStep(stepDescription :string) {
        // Log step to Allure report
        allureReporter.addStep(stepDescription);
        // Log step to BrowserStack report
        await driver.execute('browserstack_executor: {"action": "annotate", "arguments": {"data": "' + stepDescription + '", "level": "info"}}');
    }

    // Common teardown for all tests
    async teardown() {
        log.info('Tearing down');
        // Additional teardown code here
    }
}