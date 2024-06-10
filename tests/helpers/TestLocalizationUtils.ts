import {join} from "node:path";
import process from "node:process";
import {Constants} from "./Constants.js";
import {JsonUtils} from "./JsonUtils.js";
import {languageSettings} from "./LanguageSettings.js";

export class TestLocalizationUtils {

    static async readLOCFile(): Promise<string> {
        const filePath = join(process.cwd(), Constants.DEFAULT_TEST_LOCALIZATION_PATH, process.env.TEST_ENVIRONMENT + Constants.JSON_EXTENSION);
        return await JsonUtils.readJsonFile(filePath);
    }

    static async parseLOCFileWithLanguageSetting() {
        const loc = await JSON.parse(await this.readLOCFile())
        const language = languageSettings.getLanguage()
        switch (language) {
            case 'en':
                return loc.en;
            case 'fr':
                return loc.fr;
            default:
                return 'Language not supported';
        }
    }
}