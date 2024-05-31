import {config as baseConfig} from './wdio.shared.conf.js';

const webBrowser = process.env.BROWSER || process.env.DEFAULT_BROWSER
const debug = process.env.DEBUG
const retries = process.env.RETRIES || process.env.DEFAULT_RETRIES;

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
    specs: ['../tests/specs/web/**/*.ts'],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
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
        timeout: debug ? 3 * 60 * 1000 : 5 * 1000, // debug 30min, run 3min
        retries: Number(retries),
    },
};
