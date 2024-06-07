import {config as baseConfig} from './wdio.web.mobile.shared.bs.conf.js';
import {fileURLToPath} from "url";
import path from "path";
import {getSpecsByConfigFileName} from "@helpers/CommonUtils.js";
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
    // NOTE: Config for device on BS Server
    // Use BS capability generator to generate device & browser
    capabilities: [
        {
            browserName: 'chrome',
            'bstack:options': {
                deviceName: 'Google Pixel 5',
                osVersion: '12.0',
                deviceOrientation: 'portrait',
                projectName: "ThreadResearch",
                buildName: 'ThreadResearch',
                sessionName: 'ThreadResearch',
                debug: true,
                networkLogs: true
            },
        }
    ],
    maxInstances : 1
};
