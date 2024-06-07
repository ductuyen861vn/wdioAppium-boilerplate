import {config as baseConfig} from './wdio.app.mobile.shared.local.conf.ts';
import {fileURLToPath} from "url";
import path from "path";
import {getSpecsByConfigFileName} from "../../tests/helpers/CommonUtils.ts";

const configFilePath = fileURLToPath(import.meta.url);
const configFileName = path.basename(configFilePath);
const specs = await getSpecsByConfigFileName(configFileName);

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // ==================
    // Specify Test Files
    // ==================
    specs: specs,

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
    maxInstances: 1
};
