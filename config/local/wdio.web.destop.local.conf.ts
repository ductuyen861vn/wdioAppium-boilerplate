import {config as baseConfig} from '../wdio.web.shared.conf.ts';
import process from "node:process";
import {fileURLToPath} from "url";
import path from "path";
import {getSpecsByConfigFileName} from "../../tests/helpers//CommonUtils.ts";

const webBrowser = process.env.BROWSER;
const retries = process.env.RETRIES;
const sessionTimeout = process.env.SESSION_TIMEOUT_WEB;
const debug = process.env.DEBUG

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
    capabilities: [
        {
            browserName: webBrowser,
        }
    ],

    mochaOpts: {
        ui: 'bdd',
        /**
         * NOTE: This has been increased for more stable Appium Native app
         * tests because they can take a bit longer.
         */
        execArgv: debug ? ['--inspect'] : [],
        timeout: Number(sessionTimeout) * 1000, // debug 30min, run 3min
        retries: Number(retries),
    },
};
