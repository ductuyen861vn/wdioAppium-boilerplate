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
            // The defaults you need to have in your config
            // For W3C the appium capabilities need to have an extension prefix
            // This is `appium:` for all Appium Capabilities which can be found here
            // Change deviceName, udid, platformVersion to map to specific device
            platformName: 'Android',
            'appium:browserName': 'Chrome',
            'appium:deviceName': 'emulator-5556',
            'appium:platformVersion': '12',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'UiAutomator2',
            'appium:autoGrantPermissions': true,

            //Other configs
            'appium:newCommandTimeout': 3000,

            // Change appActivity, appPackage to start existing application on device without reinstall
            // You have to disable 'appium:app' to use this one
            // To get appActivity, appPackage, please contact app dev or use tools to inspect app information
            // 'appium:appActivity': "appActivity",
            // 'appium:appPackage': "com.android.chrome",

            // The path of chromeDriver, this is required to run browser at local
            'appium:chromedriverExecutable':join(
                process.cwd(),
                'node_modules','chromedriver','bin',
                //
                // NOTE: Change this name according to the app version you downloaded
                'chromedriver',
            ),
        },
    ],
};
