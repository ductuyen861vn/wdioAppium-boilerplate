import {config as baseConfig} from '../wdio.mobile.web.shared.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // ============
    // Connection server
    // ============
    user: process.env.BROWSERSTACK_USERNAME || 'phamductuyen_4GCKg5',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'zQBqj5Es5ZtWxLjey9Y1',
    hostname: 'hub.browserstack.com',
    services: [
        [
            'browserstack',
            {
                buildIdentifier: "${BUILD_NUMBER}",
                browserstackLocal: true,
            },
        ]
    ],

    // ============
    // Specs
    // ============
    specs: ['../../tests/specs/web/**/*.ts'],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-xcuitest-driver
    // NOTE: Config for device on BS Server
    // Use BS capability generator to generate device & browser
    capabilities: [
        {
            browserName:'safari',
            'bstack:options': {
                deviceOrientation: 'portrait',
                deviceName: 'iPad Air 4',
                osVersion: '14',
                projectName: "ThreadResearch",
            },
        },
    ],
};
