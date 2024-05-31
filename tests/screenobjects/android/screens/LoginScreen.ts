import AppScreen from "../../AppScreen.js";
import Gestures from "../../../helpers/Gestures.js";
import LoginPageObjects from "../objects/LoginScreenObjects.js";
import logger from "@wdio/logger";
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
        await LoginPageObjects.txtUsername.setValue(username)
        await LoginPageObjects.txtPassword.setValue(password)
        await LoginPageObjects.btnLogin.click()
    }

}

export default new LoginScreen();
