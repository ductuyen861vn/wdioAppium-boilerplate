export class HomeScreenObjectsEN {
    /**
     * define elements
     */
    // get btnJoinStudy () { return $('[name="Join Study"]'); }
    // get btnSignIn () { return $('[name="Sign In"]'); }
    get btnJoinStudy () { return $('[label = "Join Study"]'); }
    get btnSignIn () { return $('[label = "Sign In"]'); }
}
export default new HomeScreenObjectsEN();
