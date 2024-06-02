import {format, parseISO} from 'date-fns';
import DateTimeUti from "./DateTimeUti.js";
import {join} from "node:path";
import process from "node:process";
import type {Test, TestResult} from "@wdio/types/build/Frameworks.js";

class ScreenShotUti {

    async getScreenShotAsFailed(test: Test, context: any, error: TestResult) {
        let fileName = test.title + await DateTimeUti.getRandomFormattedDateTime(DateTimeUti.DATE_PATTERN_2)
        let path: string = join(process.cwd(), process.env.DEFAULT_SCREENSHOT_PATH + "",fileName + process.env.DEFAULT_SCREENSHOT_EXTENSION)
        if (error) {
            await driver.saveScreenshot(path);
        }
    }
}

export default new ScreenShotUti();