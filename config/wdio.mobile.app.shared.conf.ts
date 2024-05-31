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

    beforeTest: async ()=> {
        if (driver.isAndroid){
            await driver.launchApp()
        }else if (driver.isIOS){
            const appPackage:string = process.env.IOS_PACKAGE ?? "com.thread.utt92fbce95";
            await driver.execute('mobile: activateApp', { bundleId: appPackage });
        } else {
            log.info("Driver is not IOS | Android, do nothing on afterTest")
        }
    },

    /**
     * await driver.execute('mobile: terminateApp', { appId: appPackage });//Work on Appium 2x, not work with Appium 1.22 (max version on Browserstack)
     * await driver.execute('mobile: activateApp', { appId: appPackage });//Work on Appium 2x, not work with Appium 1.22 (max version on Browserstack)
     */
    afterTest: async ()=> {
        if (driver.isAndroid){
            const appPackage:string = process.env.ANDROID_PACKAGE ?? "com.thread.t92fbce9";
            log.info("Reset Android Application with appPackage: " + appPackage)
            await driver.closeApp()
        }else if (driver.isIOS){
            const appPackage:string = process.env.IOS_PACKAGE ?? "com.thread.utt92fbce95";
            log.info("Reset IOS Application with appPackage: " + appPackage)
            await driver.execute('mobile: terminateApp', { bundleId: appPackage });
        } else {
            log.info("Driver is not IOS | Android, do nothing on afterTest")
        }
    }
};
