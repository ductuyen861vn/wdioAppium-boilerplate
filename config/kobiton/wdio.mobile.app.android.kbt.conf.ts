import {config as baseConfig} from '../wdio.mobile.app.shared.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // ============
    // Connection server
    // ============
    hostname: 'hoang.tran:9830807a-109a-4b7b-a545-8f1e5a05d7ab@api.kobiton.com',
    path: '/wd/hub',
    protocol: 'https',
    port: 443,

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
    // NOTE: Config for device on Kobiton Server
    // Please use capability generator on Kobiton website
    capabilities: [
        {
            platformName: 'Android',
            'appium:deviceName': 'Pixel 5',
            "appium:udid": '0A291FDD4001KN',
            'appium:platformVersion': '12',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'UiAutomator2',
            'appium:autoGrantPermissions': true,

            // The path to the app or ID of app on cloud service
            'appium:app': "kobiton-store:v673891",

            //Other configs
            'appium:newCommandTimeout': 3000,
        },
        {
            platformName: 'Android',
            'appium:deviceName': 'Pixel 4a',
            "appium:udid": '0A011JEC206089',
            'appium:platformVersion': '13',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'UiAutomator2',
            'appium:autoGrantPermissions': true,

            // The path to the app or ID of app on cloud service
            'appium:app': "kobiton-store:v673891",

            //Other configs
            'appium:newCommandTimeout': 3000,
        },
    ],
};
