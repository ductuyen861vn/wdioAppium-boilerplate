import {config as baseConfig} from '../wdio.app.mobile.shared.conf.js';
import {fileURLToPath} from "url";
import path from "path";
import {getSpecsByConfigFileName} from "../../tests/helpers/CommonUtils.js";

const configFilePath = fileURLToPath(import.meta.url);
const configFileName = path.basename(configFilePath);
const specs = await getSpecsByConfigFileName(configFileName);

export const config: WebdriverIO.Config = {
    ...baseConfig,

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
                browserstackLocal: true,
            },
        ]
    ],
};
