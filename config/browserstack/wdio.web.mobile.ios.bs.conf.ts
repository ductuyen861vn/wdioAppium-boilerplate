import {config as baseConfig} from './wdio.web.mobile.shared.bs.conf.js';
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
    // NOTE: Config for device on BS Server
    // Use BS capability generator to generate device & browser
    capabilities: [
        {
            browserName:'safari',
            'bstack:options': {
                deviceOrientation: 'portrait',
                deviceName: 'iPad Air 4',
                osVersion: '14',
                projectName: "ThreadResearch",
            },
        },
    ],

    maxInstances : 1
};
