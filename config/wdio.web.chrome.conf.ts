import { config as baseConfig } from './wdio.shared.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,

    //
    // ====================
    // Runner Configuration
    // ====================
    //
    runner: 'browser',

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
            browserName: 'chrome',
        }
    ]
};
