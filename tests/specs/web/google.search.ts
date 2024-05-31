import {browser} from "@wdio/globals";
import HomePage from "../../pageobjects/pages/HomePage.ts";
import homePage from "../../pageobjects/pages/HomePage.ts";
import HomePageObjects from "../../pageobjects/objects/HomePageObjects.js";

describe('WebdriverIO and Appium research', () => {
    it('should be open web successfully - Test 1', async () => {
        console.log("waiting for 5 seconds")
        await HomePage.openHomePage()
        await HomePage.enterValueToSearchBox("WebdriverIO")
        await HomePageObjects.txtSearch.clearValue()
        await HomePageObjects.txtSearch.setValue("WebdriverIO V8")
        await expect($("//ToBeFailed")).toBeDisplayed()
    });

    it('should be open web successfully - Test 2', async () => {
        console.log("waiting for 5 seconds")
        await HomePage.openHomePage()
        await HomePage.enterValueToSearchBox("WebdriverIO")
        await HomePageObjects.txtSearch.clearValue()
        await HomePageObjects.txtSearch.setValue("WebdriverIO V8")
    });
});