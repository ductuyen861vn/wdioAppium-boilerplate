class HomeScreenObjects {
    /**
     * define elements
     */
    // get btnJoinStudy () { return $('[id="btJoinStudy"]'); }
    // get btnSignIn () { return $('[id="tvSignIn"]'); }
    get btnJoinStudy () { return $('//*[contains(@resource-id,\'btJoinStudy\')]'); }
    get btnSignIn () { return $('//*[contains(@resource-id,\'tvSignIn\')]'); }
}
export default new HomeScreenObjects();
