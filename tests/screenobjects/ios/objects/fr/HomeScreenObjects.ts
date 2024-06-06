import {HomeScreenObjectsEN} from "../en/HomeScreenObjects.js";

export class HomeScreenObjectsFR extends HomeScreenObjectsEN{
    /**
     * define elements
     */
    // get btnJoinStudy () { return $('[name="Join Study"]'); }
    // get btnSignIn () { return $('[name="Sign In"]'); }
    get btnJoinStudy () { return $('[label = "Join Study FR"]'); }
    get btnSignIn () { return $('[label = "Sign In FR"]'); }
}
export default new HomeScreenObjectsFR();
