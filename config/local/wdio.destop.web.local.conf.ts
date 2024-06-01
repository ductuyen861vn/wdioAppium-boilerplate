import {config as baseConfig} from '../wdio.shared.conf.js';

const webBrowser = process.env.BROWSER || process.env.DEFAULT_BROWSER
const retries = process.env.RETRIES || process.env.DEFAULT_RETRIES;
const defaultImplicitWait = process.env.IMPLICIT_WAIT_WEB || process.env.DEFAULT_SECOND_IMPLICIT_WAIT_WEB;
const debug = process.env.DEBUG

export const config: WebdriverIO.Config = {
    ...baseConfig,

    //
    // ====================
    // Runner Configuration
    // ====================
    //

    // ============
    // Specs
    // ============
    specs: ['../../tests/specs/web/**/*.ts'],

    // ============
    // Capabilities
    // ============
    capabilities: [
        {
            browserName: webBrowser,
        }
    ],

    mochaOpts: {
        ui: 'bdd',
        /**
         * NOTE: This has been increased for more stable Appium Native app
         * tests because they can take a bit longer.
         */
        execArgv: debug ? ['--inspect'] : [],
        timeout: Number(defaultImplicitWait) * 1000, // debug 30min, run 3min
        retries: Number(retries),
    },
};
