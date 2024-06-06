import {JoinStudyScreenObjectsEN} from "../en/JoinStudyScreenObjects.js";

export class JoinStudyScreenObjectsFR extends JoinStudyScreenObjectsEN{
    /**
     * define elements
     */
    // get lblQuestion () { return $('[id="questionTV"]'); }
    // get btnYes () { return $('[id="nextBtn"]'); }
    // get btnNo () { return $('[id="skipBtn"]'); }

    get lblQuestion () { return $('[label = "Do you have a study activation code?"]'); }
    get btnYes () { return $('[label = " Yes"]'); }
    get btnNo () { return $('[label=" No"]'); }

}
export default new JoinStudyScreenObjectsFR();
