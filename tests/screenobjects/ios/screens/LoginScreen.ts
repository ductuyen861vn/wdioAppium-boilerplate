import BaseScreen from "../../BaseScreen.js";
import logger from "@wdio/logger";
import LoginScreenObjects from "../objects/en/LoginScreenObjects.js";
import {languageSettings} from "../../../helpers/LanguageSettings.js";

const log = logger('LoginScreen');

const SELECTORS = {
    SCREEN: '~Login-screen',
};

class LoginScreen extends BaseScreen {
    // @ts-ignore
    private loginScreenObjects: typeof LoginScreenObjects;
    constructor () {
        super(SELECTORS.SCREEN);
        this.initialize()
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
        await this.closeIOSKeyboardIfExist()
        await this.loginScreenObjects.txtPassword.setValue(password)
        await this.closeIOSKeyboardIfExist()
        await this.loginScreenObjects.btnLogin.click()
    }
}

export default new LoginScreen();
