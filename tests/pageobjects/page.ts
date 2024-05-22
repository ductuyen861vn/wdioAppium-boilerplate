import {browser} from "@wdio/globals";

export default class Page {
    /**
     * Opens a sub page of the page
     */
    async open (path: string):Promise<string> {
        return browser.url(path);
    }

    async pauseSecond(value:number){
        return browser.pause(value * 1000)
    }
}
