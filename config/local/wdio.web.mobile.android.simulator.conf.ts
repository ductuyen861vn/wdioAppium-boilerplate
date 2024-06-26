import {join} from 'node:path';
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
            'appium:browserName': 'Chrome',
            'appium:deviceName': 'emulator-5556',
            'appium:platformVersion': '12',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'UiAutomator2',
            'appium:autoGrantPermissions': true,

            //Other configs
            'appium:newCommandTimeout': 3000,

            // The path of chromeDriver, if npm does not download latest chromedriver, please overwrite it by downloading latest version yourself
            'appium:chromedriverExecutable':join(
                process.cwd(),
                'node_modules','chromedriver','bin',
                'chromedriver',
            ),
        },
    ],
};
