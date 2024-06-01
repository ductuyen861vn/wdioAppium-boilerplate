import {config as baseConfig} from '../wdio.mobile.app.shared.conf.js';

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
                app: 'bs://e14f211fb60fcab39bcbe21e8c2e08956aded5d9',
                buildIdentifier: "${BUILD_NUMBER}",
                browserstackLocal: true,
            },
        ]
    ],

    // ============
    // Specs
    // ============
    specs: [
        '../../tests/specs/mobile/ios/**/*.ts',
    ],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-xcuitest-driver
    // NOTE: Config for device on BS Server
    // Check BS capability for app mobile at : https://www.browserstack.com/app-automate/capabilities#appium-capabilities
    // Use BS capability generator to generate device & browser
    capabilities: [{
        'bstack:options': {
            deviceName: 'iPhone 12 Pro',
            platformVersion: '17',
            platformName: 'ios',
            projectName: "ThreadResearch",
        },

        //Other configs
        'appium:browserstack.appium_version': "1.22.0",
        'appium:browserstack.enablePasscode': true,
        'appium:newCommandTimeout': 3000,
        'appium:autoGrantPermissions': true,
    }],

    maxInstances: 1,
};
