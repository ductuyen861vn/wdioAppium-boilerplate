import BaseScreen from './BaseScreen.js';
const SWIPE_SCREEN_SELECTOR = '~Swipe-screen';

class SwipeScreen extends BaseScreen {
    constructor () {
        super(SWIPE_SCREEN_SELECTOR);
    }

    get screen () {return $(SWIPE_SCREEN_SELECTOR);}
    get logo () {return $('~WebdriverIO logo');}

}

export default new SwipeScreen();
