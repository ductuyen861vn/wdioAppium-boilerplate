import { config as baseConfig } from './wdio.shared.conf.js';
import logger from '@wdio/logger'
const log = logger('wdio.mobile-shared.conf');


export const config: WebdriverIO.Config = {
    ...baseConfig,

    //
    // ======
    // Appium
    // Issue 1: https://github.com/webdriverio/webdriverio/issues/12227 Can not run debugger with service 'appium' -> start Appium manually
    // ======
    //
    // services: [
    //     ...baseConfig.services || [],
    //     [
    //         'appium',
    //         {
    //             // This will use the globally installed version of Appium
    //             // command: 'appium',
    //             args: {
    //                 // This is needed to tell Appium that we can execute local ADB commands
    //                 // and to automatically download the latest version of ChromeDriver
    //                 relaxedSecurity: true,
    //                 // Write the Appium logs to a file in the root of the directory
    //                 log: './logs/appium.log',
    //             },
    //         },
    //     ],
    // ],

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
