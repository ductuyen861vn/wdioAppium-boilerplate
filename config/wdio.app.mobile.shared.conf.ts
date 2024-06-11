import {config as baseConfig} from './wdio.shared.conf.ts';
import logger from '@wdio/logger'
import {ScreenShotUtils} from "../tests/helpers//ScreenShotUtils.ts";
import {TestEnvironmentUtils} from "../tests/helpers/TestEnvironmentUtils.js";

const log = logger('wdio.mobile-shared.conf');


export const config: WebdriverIO.Config = {
    ...baseConfig,

    /**
     * Start Application before every test case
     */
    beforeTest: async () => {
        if (driver.isAndroid) {
            const appPackage = await TestEnvironmentUtils.getAppIDByStudyName()
            log.info(`Start Android Application has app package:${appPackage}`)
            await driver.execute('mobile: activateApp', {appId: appPackage});
        } else if (driver.isIOS) {
            const bundleId = await TestEnvironmentUtils.getBundleIDByStudyName()
            log.info(`Start IOS Application has app bundleID: ${bundleId}`)
            await driver.execute('mobile: activateApp', {bundleId: bundleId});
        } else {
            log.info("Driver is not IOS | Android, do nothing on beforeTest")
        }
    },

    /**
     * Kill Application after every test case
     */
    afterTest: async function (test, context, {error, result, duration, passed, retries}) {
        await ScreenShotUtils.getScreenShotAsFailed(test, context, error);
        if (driver.isAndroid) {
            const appPackage = await TestEnvironmentUtils.getAppIDByStudyName()
            log.info(`Reset Android Application has app package : ${appPackage}`)
            await driver.execute('mobile: terminateApp', {appId: appPackage});
        } else if (driver.isIOS) {
            const bundleId = await TestEnvironmentUtils.getBundleIDByStudyName()
            log.info(`Reset IOS Application has app bundleID: ${bundleId}`)
            await driver.execute('mobile: terminateApp', {bundleId: bundleId});
        } else {
            log.info("Driver is not IOS | Android, do nothing on afterTest")
        }
    }
};
