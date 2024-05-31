import {join} from 'node:path';
import {config as baseConfig} from './wdio.mobile.web.shared.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // ============
    // Connection server
    // ============
    port: 4723,
    hostname: 'localhost',
    path: '/wd/hub',
    protocol: 'http',

    // ============
    // Specs
    // ============
    specs: ['../tests/specs/web/**/*.ts'],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-uiautomator2-driver
    capabilities: [
        {
            // YOU HAVE TO ENABLE Settings → Safari → Advanced → Remote Automation on Iphone
            // The defaults you need to have in your config
            // For W3C the appium capabilities need to have an extension prefix
            // This is `appium:` for all Appium Capabilities which can be found here
            // Change deviceName, udid, platformVersion to map to specific device
            'appium:platformName': 'iOS',
            'appium:browserName': 'safari',
            'appium:deviceName': 'TPPhone',
            'appium:platformVersion': '15.4',
            'appium:udid': '00008030-001A74503468C02E',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'XCuiTest',
            'appium:autoGrantPermissions': true,

            //Other configs
            'appium:newCommandTimeout': 3000,
        },
    ],
};
