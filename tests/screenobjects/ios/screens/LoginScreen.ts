import AppScreen from "../../AppScreen.js";
import Gestures from "../../../helpers/Gestures.js";
import logger from "@wdio/logger";
import LoginScreenObjects from "../objects/LoginScreenObjects.js";

const log = logger('LoginScreen');

const SELECTORS = {
    SCREEN: '~Login-screen',
};

class LoginScreen extends AppScreen {
    constructor () {
        super(SELECTORS.SCREEN);
    }

    get screen () {return $(SELECTORS.SCREEN);}

    async submitLogin(username:string, password:string){
        log.info("Submit login with username:" + username + " and password:" + password);
        await LoginScreenObjects.txtUsername.setValue(username)
        await this.closeIOSKeyboardIfExist()
        await LoginScreenObjects.txtPassword.setValue(password)
        await this.closeIOSKeyboardIfExist()
        await LoginScreenObjects.btnLogin.click()
    }
}

export default new LoginScreen();
