import {config as baseConfig} from '../wdio.app.mobile.shared.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // ============
    // Connection server
    // ============
    hostname: 'hoang.tran:9830807a-109a-4b7b-a545-8f1e5a05d7ab@api.kobiton.com',
    path:'/wd/hub',
    protocol:'https',
    port:443,

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
    // https://github.com/appium/appium-xcuitest-driver
    // NOTE: Config for device on Kobiton Server
    // Please use capability generator on Kobiton website
    capabilities: [
        {
            // The defaults you need to have in your config
            // For W3C the appium capabilities need to have an extension prefix
            // This is `appium:` for all Appium Capabilities which can be found here
            // NOTE: Config for device on Kobiton Server
            // Change deviceName, udid, platformVersion to map to specific device
            // Change 'appium:app':'id (cloud)' / 'local path' to install whatever application package on cloud/local server (For service, you have to upload file to their repository before installing)
            platformName: 'iOS',
            'appium:deviceName': 'iPhone 11',
            "appium:udid":'00008030-001578D23C23402E',
            'appium:platformVersion': '17.0',
            'appium:orientation': 'PORTRAIT',
            // 'appium:automationName': 'UiAutomator2',
            'appium:autoGrantPermissions':true,


            // The path to the app or ID of app on cloud service
            'appium:app': "kobiton-store:v655419",

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
