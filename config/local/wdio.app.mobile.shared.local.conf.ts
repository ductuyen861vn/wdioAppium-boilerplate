import {config as baseConfig} from '../wdio.app.mobile.shared.conf.js';
import logger from '@wdio/logger'
const log = logger('wdio.mobile-shared.conf');

export const config: WebdriverIO.Config = {
    ...baseConfig,
    // ============
    // Connection server
    // ============
    port: 4723,
    hostname: 'localhost',
    path: '/wd/hub',
    protocol: 'http',
};
