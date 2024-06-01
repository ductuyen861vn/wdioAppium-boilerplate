import {browser} from "@wdio/globals";
import HomePage from "../../pageobjects/pages/HomePage.ts";
import homePage from "../../pageobjects/pages/HomePage.ts";
import HomePageObjects from "../../pageobjects/objects/HomePageObjects.js";

describe('WebdriverIO and Appium research', () => {
    it('should be open web successfully - Test 1', async () => {
        console.log("waiting for 5 seconds")
        await HomePage.openHomePage()
        await HomePage.enterValueToSearchBox("WebdriverIO-FailCase-Step1")
        await HomePageObjects.txtSearch.clearValue()
        await HomePageObjects.txtSearch.setValue("WebdriverIO-FailCase-Step2")
        await expect($("//ToBeFailed")).toBeDisplayed({wait:5*1000, message:"Force fail to test"})
    });

    it('should be open web successfully - Test 2', async () => {
        console.log("waiting for 5 seconds")
        await HomePage.openHomePage()
        await HomePage.enterValueToSearchBox("WebdriverIO-PassCase-Step1")
        await HomePageObjects.txtSearch.clearValue()
        await HomePageObjects.txtSearch.setValue("WebdriverIO-PassCase-Step2")
    });
});