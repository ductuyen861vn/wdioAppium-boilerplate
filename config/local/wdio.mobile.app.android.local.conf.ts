import {config as baseConfig} from '../wdio.mobile.app.shared.conf.js';
import {join} from "node:path";

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
        '../../tests/specs/mobile/android/**/*.ts',
    ],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-uiautomator2-driver
    capabilities: [
        {
            platformName: 'Android',
            'appium:deviceName': 'GalaxyA03s',
            'appium:platformVersion': '11',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'UiAutomator2',
            'appium:autoGrantPermissions': true,

            // The path of the app to install new before running,
            // For implement, to open app quickly, you have to install app manually and use next code to open, it's to skip install new app every runs
            // 'appium:app': join(
            //     process.cwd(),
            //     'apps',
            //     'ThreadAndroidV0.apk',
            // ),

            // Change appActivity, appPackage to start existing application on device without reinstall
            // You have to disable 'appium:app' to use this one
            // To get appActivity, appPackage, please contact app dev or use tools to inspect app information
            'appium:appActivity': "com.thread.TURBO.ui.SplashActivity",
            'appium:appPackage': "com.thread.t92fbce9",

            //Other configs
            'appium:newCommandTimeout': 3000,
        },
    ],
};
