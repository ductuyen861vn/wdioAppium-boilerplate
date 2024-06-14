import {HomeScreenObjectsEN} from "../en/HomeScreenObjects.js";
import Button from "../../../../widgets/Button.js";

export class HomeScreenObjectsFR extends HomeScreenObjectsEN{
    /**
     * define elements
     */
    // get btnJoinStudy () { return $('[name="Join Study"]'); }
    // get btnSignIn () { return $('[name="Sign In"]'); }
    get joinStudyElement() { return $('[label = "Join Study FR"]'); }
    get signInElement() { return $('[label = "Sign In FR"]'); }

    get btnJoinStudy() { return new Button(this.joinStudyElement); }
    get btnSignIn() { return new Button(this.signInElement); }
}
export default new HomeScreenObjectsFR();
