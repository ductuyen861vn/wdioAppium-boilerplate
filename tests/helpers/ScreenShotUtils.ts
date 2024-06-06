import {DateTimeUtils} from "./DateTimeUtils.js";
import {join} from "node:path";
import process from "node:process";
// @ts-ignore
import type {Test, TestResult} from "@wdio/types/build/Frameworks.js";
import {Constants} from "./Constants.js";

export class ScreenShotUtils {

    static async getScreenShotAsFailed(test: Test, context: any, error: TestResult) {
        let fileName = test.title + await DateTimeUtils.getRandomFormattedDateTime(DateTimeUtils.DATE_PATTERN_2)
        let path: string = join(process.cwd(), Constants.DEFAULT_SCREENSHOT_PATH ,fileName + Constants.PNG_EXTENSION)
        if (error) {
            await driver.saveScreenshot(path);
        }
    }
}