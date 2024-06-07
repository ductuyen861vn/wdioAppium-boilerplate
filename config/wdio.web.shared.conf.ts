import {config as baseConfig} from './wdio.shared.conf.ts';
import logger from '@wdio/logger'

const log = logger('wdio.mobile-shared.conf');

export const config: WebdriverIO.Config = {
    ...baseConfig,
};
