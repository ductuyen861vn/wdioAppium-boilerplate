import logger from "@wdio/logger";
import {ReportUtils} from "../helpers/ReportUtils.js"
import {TestDataUtils} from "../helpers/TestDataUtils.js";
import {TestLocalizationUtils} from "../helpers/TestLocalizationUtils.js";
import {TestEnvironmentUtils} from "../helpers/TestEnvironmentUtils.js";

const log = logger('wdio.mobile-shared.conf');

export class BaseTest {
    // Common property
    public testData: any;
    public environment: any;
    public loc: any;
    public logger: any;

    constructor() {
    }

    // Common setup for all tests
    async setup() {
        this.logger = log
        log.info("Setup")
        log.info("Loading test data file to BaseTest")
        this.testData = await JSON.parse(await TestDataUtils.readTestDataFile());

        log.info("Loading loc file to BaseTest")
        this.loc = await TestLocalizationUtils.parseLOCFileWithLanguageSetting();

        log.info("Loading Environment file to BaseTest")
        this.environment = await JSON.parse(await TestEnvironmentUtils.readEnvironmentFile())
        return this
    }

    async logStep(stepDescription: string) {
        await ReportUtils.logStep(stepDescription)
    }

    // Common teardown for all tests
    async teardown() {
        log.info('Tearing down');
        // Additional teardown code here
    }
}