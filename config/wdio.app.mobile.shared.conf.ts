import {config as baseConfig} from './wdio.shared.conf.ts';
import logger from '@wdio/logger'
import {ScreenShotUtils} from "../tests/helpers//ScreenShotUtils.ts";
import process from "node:process";
import {Constants} from "../tests/helpers//Constants.ts";

const log = logger('wdio.mobile-shared.conf');


export const config: WebdriverIO.Config = {
    ...baseConfig,

    /**
     * await driver.execute('mobile: activateApp', { appId: appPackage });//Work on Appium 2x, not work with Appium 1.22 (max version on Browserstack)
     */
    beforeTest: async ()=> {
        if (driver.isAndroid){
            log.info("Start Android Application")
            await driver.launchApp()
        }else if (driver.isIOS){
            log.info("Start IOS Application has app bundleID: " + Constants.DEFAULT_BUNDLE_ID)
            await driver.execute('mobile: activateApp', { bundleId: Constants.DEFAULT_BUNDLE_ID });
        } else {
            log.info("Driver is not IOS | Android, do nothing on beforeTest")
        }
    },

    /**
     * await driver.execute('mobile: terminateApp', { appId: appPackage });//Work on Appium 2x, not work with Appium 1.22 (max version on Browserstack)
     */
    afterTest: async function (test, context, {error, result, duration, passed, retries}) {
        await ScreenShotUtils.getScreenShotAsFailed(test,context, error);
        if (driver.isAndroid){
            log.info("Reset Android Application")
            await driver.closeApp()
        }else if (driver.isIOS){
            log.info("Reset IOS Application has app bundleID: " + Constants.DEFAULT_BUNDLE_ID)
            await driver.execute('mobile: terminateApp', { bundleId: Constants.DEFAULT_BUNDLE_ID });
        } else {
            log.info("Driver is not IOS | Android, do nothing on afterTest")
        }
    }
};
