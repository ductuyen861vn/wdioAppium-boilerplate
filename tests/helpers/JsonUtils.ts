import jsonfile from 'jsonfile';
import {join} from "node:path";
import process from "node:process";
import {Constants} from "./Constants.js";

export class JsonUtils {

    static async readJsonFile(filePath : string): Promise<string> {
        console.log('Reading file :' + filePath)
        try {
            // Read and parse the JSON file
            const data = await new Promise((resolve, reject) => {
                jsonfile.readFile(filePath, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });

            // Convert the parsed data to a string
            const jsonData = JSON.stringify(data);
            return jsonData;

        } catch (err) {
            console.error('Error reading JSON file:', err);
            throw err;
        }
    }

    static async readTestDataFile(): Promise<string> {
        const filePath = join(process.cwd(), Constants.DEFAULT_TEST_DATA_PATH, process.env.TEST_ENVIRONMENT + Constants.JSON_EXTENSION);
        return await this.readJsonFile(filePath);
    }

    static async readLOCFile(): Promise<string> {
        const filePath = join(process.cwd(), Constants.DEFAULT_TEST_LOCALIZATION_PATH, process.env.TEST_ENVIRONMENT + Constants.JSON_EXTENSION);
        return await this.readJsonFile(filePath);
    }

    static async readEnvironmentFile(): Promise<string> {
        const filePath = join(process.cwd(), Constants.DEFAULT_ENVIRONMENT_PATH, process.env.TEST_ENVIRONMENT + Constants.JSON_EXTENSION);
        return await this.readJsonFile(filePath);
    }
}