import {join} from "node:path";
import process from "node:process";
import {Constants} from "./Constants.js";
import {JsonUtils} from "./JsonUtils.js";

export class TestDataUtils {

    static async readTestDataFile(): Promise<string> {
        const filePath = join(process.cwd(), Constants.DEFAULT_TEST_DATA_PATH, process.env.TEST_ENVIRONMENT + Constants.JSON_EXTENSION);
        return await JsonUtils.readJsonFile(filePath);
    }
}