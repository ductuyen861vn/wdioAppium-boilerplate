export class LoginScreenObjectsEN {
    /**
     * define elements
     */
    get txtUsername () { return $('//XCUIElementTypeTextField'); }
    get txtPassword () { return $('//XCUIElementTypeSecureTextField'); }
    get btnLogin () { return $('//XCUIElementTypeButton[@name="Sign In"]'); }
    get btnForgotPassword () { return $('//XCUIElementTypeButton[@name="Forgot Password"]'); }
    get btnForgotUserName () { return $('//XCUIElementTypeButton[@name=" Forgot Username"]'); }


    // /**
    //  * GP
    //  */
    // get txtUsername () { return $('//XCUIElementTypeTextField'); }
    // get txtPassword () { return $('//XCUIElementTypeSecureTextField'); }
    // get btnLogin () { return $('//XCUIElementTypeButton[@name="LOGIN"]'); }
}
export default new LoginScreenObjectsEN();
