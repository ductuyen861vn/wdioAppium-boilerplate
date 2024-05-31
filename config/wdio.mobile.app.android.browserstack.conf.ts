import {join} from 'node:path';
import {config as baseConfig} from './wdio.mobile.app.shared.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // ============
    // Connection server
    // ============
    user: process.env.BROWSERSTACK_USERNAME || 'phamductuyen_4GCKg5',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'zQBqj5Es5ZtWxLjey9Y1',
    hostname: 'hub.browserstack.com',

    // ============
    // Specs
    // ============
    specs: [
        '../tests/specs/mobile/android/**/*.ts',
    ],

    capabilities: [
        {
            // The defaults you need to have in your config
            // For W3C the appium capabilities need to have an extension prefix
            // This is `appium:` for all Appium Capabilities which can be found here
            // NOTE: Config for device on Kobiton Server
            // Change deviceName, udid, platformVersion to map to specific device
            // Change 'appium:app':'id (cloud)' / 'local path' to install whatever application package on cloud/local server (For service, you have to upload file to their repository before installing)
            platformName: 'Android',
            'appium:deviceName': 'Google Pixel 8',
            'appium:platformVersion': '14.0',
            'appium:orientation': 'PORTRAIT',

            // The path to the app or ID of app on cloud service
            'appium:app': "bs://ae672b0aa206a83a4b5186cefff0483c006cd37b",

            //Other configs
            'appium:browserstack.appium_version': "1.22.0",
            'appium:newCommandTimeout': 3000,
            'appium:autoGrantPermissions': true,
            // Change appActivity, appPackage to start existing application on device without reinstall
            // You have to disable 'appium:app' to use this one
            // To get appActivity, appPackage, please contact app dev or use tools to inspect app information
            // 'appium:appActivity': "appActivity",
            // 'appium:appPackage': "appPackage",
        }
    ],

    maxInstances: 1,
};
