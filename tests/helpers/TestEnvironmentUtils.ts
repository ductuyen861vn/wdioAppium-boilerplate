import {join} from "node:path";
import process from "node:process";
import {Constants} from "./Constants.js";
import {JsonUtils} from "./JsonUtils.js";

export class TestEnvironmentUtils {

    static async readEnvironmentFile(): Promise<string> {
        const filePath = join(process.cwd(), Constants.DEFAULT_ENVIRONMENT_PATH, process.env.TEST_ENVIRONMENT + Constants.JSON_EXTENSION);
        return await JsonUtils.readJsonFile(filePath);
    }

    /**
     * Study name is set via process.env.STUDY_NAME, load by default at .env file
     */
    static async getBundleIDByStudyName(): Promise<string> {
        const studyData = await this.getStudyByName()
        return studyData.bundleId
    }

    /**
     * Study name is set via process.env.STUDY_NAME, load by default at .env file
     */
    static async getAppIDByStudyName(): Promise<string> {
        const studyData = await this.getStudyByName()
        return studyData.appPackage
    }

    /**
     * Study name is set via process.env.STUDY_NAME, load by default at .env file
     */
    static async getStudyByName() {
        const env = await JSON.parse(await this.readEnvironmentFile())
        const language = process.env.STUDY_NAME
        switch (language) {
            case 'PRG002':
                return env.environment.prg002;
            case 'MARLIN':
                return env.environment.marlin;
            default:
                return 'Study not supported';
        }
    }
}