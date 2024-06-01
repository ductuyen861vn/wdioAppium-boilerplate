import {config as baseConfig} from './wdio.shared.conf.js';
import logger from '@wdio/logger'

const log = logger('wdio.mobile-shared.conf');


export const config: WebdriverIO.Config = {
    ...baseConfig,

    before: async ()=> {
        // Only update the setting for Android, this is needed to reduce the timeout for the UiSelector locator strategy,
        // which is also used in certain tests, so it will not wait for 10 seconds if it can't find an element
        if (driver.isAndroid){
            await driver.updateSettings({
                waitForSelectorTimeout: 5 * 1000
            });
        }
    },

    afterTest: async ()=> {
        if (driver.isAndroid){
            //Todo: nothing
        }else if (driver.isIOS){
            //Todo: nothing
        } else {
            log.info("Driver is not IOS | Android, do nothing on afterTest")
        }
    }
};
