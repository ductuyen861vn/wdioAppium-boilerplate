import {config as baseConfig} from '../wdio.app.mobile.shared.conf.js';
import {fileURLToPath} from "url";
import path from "path";
import {getAppByConfigFileName, getSpecsByConfigFileName} from "@helpers/CommonUtils.js";
const configFilePath = fileURLToPath(import.meta.url);
const configFileName = path.basename(configFilePath);
const specs = await getSpecsByConfigFileName(configFileName);
const bsApp = await getAppByConfigFileName(configFileName);

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // ==================
    // Specify Test Files
    // ==================
    specs: specs,

    // ============
    // Connection server
    // ============
    user: process.env.BS_USERNAME,
    key: process.env.BS_ACCESS_KEY,
    hostname: process.env.BS_HOSTNAME,
    services: [
        [
            'browserstack',
            {
                app: bsApp,
                browserstackLocal: true,
            },
        ]
    ],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-xcuitest-driver
    // NOTE: Config for device on BS Server
    // Check BS capability for app mobile at : https://www.browserstack.com/app-automate/capabilities#appium-capabilities
    // Use BS capability generator to generate device & browser
    capabilities: [{
        'bstack:options': {
            // @ts-ignore
            deviceName: 'iPhone 12 Pro',
            platformVersion: '17',
            platformName: 'ios',
            projectName: "ThreadResearch",
            appiumVersion: "2.4.1"
        },

        //Other configs
        // @ts-ignore
        'appium:browserstack.enablePasscode': true,
        // @ts-ignore
        'appium:newCommandTimeout': 3000,
        // @ts-ignore
        'appium:autoGrantPermissions': true,
    }],

    maxInstances: 1,
};
