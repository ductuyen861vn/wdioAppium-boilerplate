import {join} from 'node:path';
import {config as baseConfig} from './wdio.mobile.web.shared.conf.js';

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
    specs: ['../tests/specs/web/**/*.ts'],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-uiautomator2-driver
    // To run multiple devices, please add multiple capabilities
    capabilities: [
        {
            // The defaults you need to have in your config
            // For W3C the appium capabilities need to have an extension prefix
            // This is `appium:` for all Appium Capabilities which can be found here
            // NOTE: Config for device on Kobiton Server
            // Change deviceName, udid, platformVersion to map to specific device
            platformName: 'Android',
            'appium:deviceName': 'Pixel 5',
            "appium:udid": '0A291FDD4001KN',
            'appium:platformVersion': '12',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'UiAutomator2',
            'appium:autoGrantPermissions': true,
            'appium:browserName': 'chrome',

            //Other configs
            'appium:newCommandTimeout': 3000,
        }
    ],
};
