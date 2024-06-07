class JoinStudyScreenObjects {
    /**
     * define elements
     */
    // get lblQuestion () { return $('[id="questionTV"]'); }
    // get btnYes () { return $('[id="nextBtn"]'); }
    // get btnNo () { return $('[id="skipBtn"]'); }

    get lblQuestion () { return $('//*[contains(@resource-id,\'questionTV\')]'); }
    get btnYes () { return $('//*[contains(@resource-id,\'nextBtn\')]'); }
    get btnNo () { return $('//*[contains(@resource-id,\'skipBtn\')]'); }

}
export default new JoinStudyScreenObjects();
