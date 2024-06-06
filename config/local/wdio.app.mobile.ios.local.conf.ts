import {config as baseConfig} from './wdio.app.mobile.shared.local.conf.js';
import {fileURLToPath} from "url";
import path from "path";
import {getSpecsByConfigFileName} from "../../tests/helpers/CommonUtils.js";

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
    // https://github.com/appium/appium-xcuitest-driver
    capabilities: [
        {
            platformName: 'iOS',
            'appium:deviceName': "TPPhone",
            'appium:platformVersion': "15.4",
            'appium:udid': '00008030-001A74503468C02E',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'XCuiTest',
            'appium:autoGrantPermissions': true,

            // The path of the app to install new before running,
            // For implement, to open app quickly, you have to install app manually and use next code to open, it's to skip install new app every runs
            // 'appium:app': join(
            //     process.cwd(),
            //     'apps',
            //     //
            //     // NOTE: Change this name according to the app version you downloaded
            //     'ThreadIOSV0.ipa',
            // ),

            // Use bundleId to start existing application on device without reinstall
            // You have to disable 'appium:app' to use this one
            // To get bundleId please contact app dev (Not like Android, there is limited of 3rd app to gather bundleID)
            'appium:bundleId': "com.thread.utt92fbce95",

            //Other configs
            'appium:newCommandTimeout': 3000,
        }
    ],
    maxInstances: 1
};
