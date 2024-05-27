import {browser} from "@wdio/globals";
import HomePage from "../../pageobjects/pages/HomePage.ts";
import homePage from "../../pageobjects/pages/HomePage.ts";
import HomePageObjects from "../../pageobjects/objects/HomePageObjects.js";

describe('WebdriverIO and Appium research', () => {
    it('should be open web successfully', async () => {
        console.log("waiting for 5 seconds")
        await HomePage.openHomePage()
        await HomePage.enterValueToSearchBox("WebdriverIO")
        await HomePage.pauseSecond(5)
        await HomePageObjects.txtSearch.clearValue()
        await HomePage.pauseSecond(5)
        await HomePageObjects.txtSearch.setValue("WebdriverIO V8")
        await HomePage.pauseSecond(5)
    });
});