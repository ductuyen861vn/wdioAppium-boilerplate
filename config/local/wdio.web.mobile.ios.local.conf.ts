import {config as baseConfig} from '../wdio.web.shared.conf.ts';
import {fileURLToPath} from "url";
import path from "path";
import {getSpecsByConfigFileName} from "../../tests/helpers/CommonUtils.ts";
const configFilePath = fileURLToPath(import.meta.url);
const configFileName = path.basename(configFilePath);
const specs = await getSpecsByConfigFileName(configFileName);

export const config: WebdriverIO.Config = {
    ...baseConfig,

    port: 4723,
    hostname: 'localhost',
    path: '/wd/hub',
    protocol: 'http',

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
