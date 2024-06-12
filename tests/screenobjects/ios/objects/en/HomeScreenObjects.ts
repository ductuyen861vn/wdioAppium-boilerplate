import Button from "../../../../widgets/Button.js";

export class HomeScreenObjectsEN {
    /**
     * define elements
     */
    // get btnJoinStudy () { return $('[name="Join Study"]'); }
    // get btnSignIn () { return $('[name="Sign In"]'); }
    get joinStudyElement() { return $('[label = "Join Study"]'); }
    get signInElement() { return $('[label = "Sign In"]'); }

    get btnJoinStudy() { return new Button(this.joinStudyElement); }
    get btnSignIn() { return new Button(this.signInElement); }
}
export default new HomeScreenObjectsEN();
