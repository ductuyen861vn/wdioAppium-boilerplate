import type {Options} from '@wdio/types';
import * as process from "node:process";
import {ScreenShotUtils} from "../tests/helpers/ScreenShotUtils.js";
// @ts-ignore
import fs from "fs-extra";
import path from "path";
import {addCustomCommands} from "../tests/helpers/CustomCommandUtils.js";

const retries = process.env.RETRIES;
const sessionTimeout = process.env.SESSION_TIMEOUT;
const debug = process.env.DEBUG

/**
 * All not needed configurations, for this boilerplate, are removed.
 * If you want to know which configuration options you have then you can
 * check https://webdriver.io/docs/configurationfile
 */
export const config: Options.Testrunner = {
    // ====================
    // Runner Configuration
    // ====================


    // ==================
    // Specify Test Files
    // ==================
    // The test-files are specified in:
    // - wdio.android.browser.conf.ts
    // - wdio.android.app.conf.ts
    // - wdio.ios.browser.conf.ts
    // - wdio.ios.app.conf.ts
    // NOTE: This is just a place holder and will be overwritten by each specific configuration
    specs: [],


    // ============
    // Capabilities
    // ============
    // NOTE: This is just a place holder and will be overwritten by each specific configuration
    capabilities: [],


    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: '',
    // Default timeout for all waitFor* commands.
    /**
     * NOTE: This has been increased for more stable Appium Native app
     * tests because they can take a bit longer.
     */
    waitforTimeout: 10000,
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    // Default request retries count
    connectionRetryCount: 3,
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    //
    // Services are empty here but will be defined in the
    // - wdio.shared.browserstack.conf.ts
    // - wdio.shared.local.appium.conf.ts
    // - wdio.shared.sauce.conf.ts
    // configuration files
    // Issue 1: https://github.com/webdriverio/webdriverio/issues/12227 Can not run debugger with service 'appium' -> start Appium manually
    services: [],
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    // The number of times to retry the entire spec file when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
        ['junit', {
            outputDir: 'junit-results',
            outputFileFormat: function () {
                return `test-results.xml`
            }
        }]
    ],
    // Options to be passed to Mocha.
    mochaOpts: {
        ui: 'bdd',
        /**
         * NOTE: This has been increased for more stable Appium Native app
         * tests because they can take a bit longer.
         */
        execArgv: debug ? ['--inspect'] : [],
        timeout: Number(sessionTimeout) * 1000,
        retries: Number(retries),
    },


    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    /**
     * NOTE: No Hooks are used in this project, but feel free to add them if you need them.
     */

    before: function (capabilities, specs) {
        addCustomCommands();
    },

    after: async () => {
    },

    //Take screenshot if failed, support local run, if using BS, check screenshot / record file on BS instead
    afterTest: async function (test, context, {error, result, duration, passed, retries}) {
        await ScreenShotUtils.getScreenShotAsFailed(test,context, error);
    },

    //Allure report, support local run, if using BS, check report on BS instead
    onComplete: function (exitCode, config, capabilities, results) {
        const resultsDir = path.join(process.cwd(), 'allure-results');
        const historyDir = path.join(resultsDir, 'history');
        const historyBackupDir = path.join(process.cwd(), 'history_backup');

        if (fs.existsSync(historyBackupDir)) {
            fs.copySync(historyBackupDir, historyDir);
        }
    },

    onPrepare: function (config, capabilities) {
        const resultsDir = path.join(process.cwd(), 'allure-results');
        const historyDir = path.join(resultsDir, 'history');

        // Ensure the history directory exists before the test run
        if (!fs.existsSync(historyDir)) {
            fs.mkdirSync(historyDir);
        }

        // Copy the previous history to the new results directory
        if (fs.existsSync(historyDir)) {
            fs.copySync(historyDir, path.join(process.cwd(), 'history_backup'));
        }
    },

    maxInstances: 1
};
