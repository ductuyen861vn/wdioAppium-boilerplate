import {join} from 'node:path';
import {config as baseConfig} from './wdio.mobile.app.shared.conf.js';

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
    specs: [
        '../tests/specs/mobile/android/**/*.ts',
    ],

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
            // NOTE: Config for device on Kobiton Server
            // Change deviceName, udid, platformVersion to map to specific device
            // Change 'appium:app':'id (cloud)' / 'local path' to install whatever application package on cloud/local server (For service, you have to upload file to their repository before installing)
            platformName: 'Android',
            'appium:deviceName': 'GalaxyA03s',
            'appium:platformVersion': '11',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'UiAutomator2',
            'appium:autoGrantPermissions': true,

            // The path to the app
            'appium:app': join(
                process.cwd(),
                'apps',
                //
                // NOTE: Change this name according to the app version you downloaded
                'ThreadAndroidV0.apk',
            ),

            //Other configs
            'appium:newCommandTimeout': 3000,

            // Change appActivity, appPackage to start existing application on device without reinstall
            // You have to disable 'appium:app' to use this one
            // To get appActivity, appPackage, please contact app dev or use tools to inspect app information
            // 'appium:appActivity': "appActivity",
            // 'appium:appPackage': "appPackage",
        },
    ],
};
