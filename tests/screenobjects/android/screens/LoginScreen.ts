import BaseScreen from "../../BaseScreen.js";
import LoginScreenObjects from "../objects/en/LoginScreenObjects.js";
import logger from "@wdio/logger";
import {languageSettings} from "../../../helpers/LanguageSettings.js";

const log = logger('LoginScreen');

const SELECTORS = {
    SCREEN: '~Login-screen',
};

export class LoginScreen extends BaseScreen {
    // @ts-ignore
    private loginScreenObjects: typeof LoginScreenObjects;
    constructor () {
        super(SELECTORS.SCREEN);
    }

    async initialize() {
        const language = languageSettings.getLanguage();
        try {
            this.loginScreenObjects = (await import(`../objects/${language}/LoginScreenObjects.js`)).default;
        } catch (error) {
            throw new Error(`Failed to load element container for language: ${language}`);
        }
    }

    get screen () {return $(SELECTORS.SCREEN);}

    async submitLogin(username:string, password:string){
        log.info("Submit login with username:" + username + " and password:" + password);
        await this.loginScreenObjects.txtUsername.setValue(username)
        await this.loginScreenObjects.txtPassword.setValue(password)
        await this.loginScreenObjects.btnLogin.click()
    }

}
