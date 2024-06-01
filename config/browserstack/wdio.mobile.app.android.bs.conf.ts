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
                app: 'bs://ae672b0aa206a83a4b5186cefff0483c006cd37b',
                buildIdentifier: "${BUILD_NUMBER}",
                browserstackLocal: true,
            },
        ]
    ],

    // ============
    // Specs
    // ============
    specs: [
        '../../tests/specs/mobile/android/**/*.ts',
    ],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-uiautomator2-driver
    // NOTE: Config for device on BS Server
    // Check BS capability for app mobile at : https://www.browserstack.com/app-automate/capabilities#appium-capabilities
    // Use BS capability generator to generate device & browser
    capabilities: [{
        'bstack:options': {
            deviceName: 'Google Pixel 7 Pro',
            platformVersion: '13.0',
            platformName: 'android',
            projectName: "ThreadResearch",
        },
        'appium:newCommandTimeout': 3000,
        'appium:autoGrantPermissions': true,
        'appium:browserstack.appium_version': "1.22.0",
    }],

    maxInstances: 10,
};
