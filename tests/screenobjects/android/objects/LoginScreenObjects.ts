class LoginScreenObjects {
    /**
     * define elements
     */
    // get txtUsername () { return $('[id="et_userName"]'); }
    // get txtPassword () { return $('[id="et_pswd"]'); }
    // get btnLogin () { return $('[id="bt_next"]'); }
    // get btnForgotPassword () { return $('[id="tv_forgotpswd"]'); }
    // get btnForgotUserName () { return $('[id="tv_forgotUsername"]'); }

    get txtUsername () { return $('//*[contains(@resource-id,\'et_userName\')]'); }
    get txtPassword () { return $('//*[contains(@resource-id,\'et_pswd\')]'); }
    get btnLogin () { return $('//*[contains(@resource-id,\'bt_next\')]'); }
    get btnForgotPassword () { return $('//*[contains(@resource-id,\'tv_forgotpswd\')]'); }
    get btnForgotUserName () { return $('//*[contains(@resource-id,\'tv_forgotUsername\')]'); }
}
export default new LoginScreenObjects();
