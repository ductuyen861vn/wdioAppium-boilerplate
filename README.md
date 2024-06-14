# Thread Automation Project

**NOTE:** This project is for Webdriver V8 where the tests are written with `async`/`await` and TypeScript.

Project to run Appium tests together with WebdriverIO for:

- iOS/Android Native Apps ([check here](./README.md#native-app-tests))
- Android Chrome and iOS Safari browser ([check here](./README.md#automating-chrome-or-safari))

> [!IMPORTANT]
> This Project uses the WebdriverIO native app which can be found in folder root/app/

## Based on

This project is currently based on:

- **WebdriverIO:** `8.x`
- **Appium Local:** `2.4.1`, also pair well with Appium Browser Stack 2.4.1

## Installation

You have to go through all setups to the end if working on test script, stop after **'Install NodeJ and NPM'** if you're
executor

### Setup for Execution

> [!NOTE]
> You don't need Appium installed on you local machine when running test in a cloud (BrowserStack), You HAVE to install
> Appium on you local machine when running test locally

1. Install NodeJ and NPM
2. Clone this project by running

```sh
git clone TBD
```

3. Install all dependencies

```sh
npm install
```

### Setup for Implementation

4. Install Appium and every dependency locally
5. Install Appium Doctor to check your appium server really or not
6. Install driver Uiautomator2 & XCUITest
7. Install Android Studio
8. Install Xcode
9. Config setup to run on IOS real device, see
   at https://appium.github.io/appium-xcuitest-driver/latest/preparation/real-device-config/
10. Install Appium Inspector

Choose one of the following options to run & debug test script

* WebStorm

```
Config: NodeJS
Node parameters: -r ts-node/register
Javascript file: node_modules/@wdio/cli/bin/wdio.js
Application parameters: <config files> ex: config/local/wdio.web.destop.local.conf.ts
Environment variables: <See section Environment Variables>
```

* VSCode

```
TBD
```

## Project Structure (Design pattern = Page Object Model (POM))

* [Configs](./config) : Set devices, browser, map test suite, setup capability, setup hooks , setup services (Appium,
  BS, Allure Reportetc)etc
* [Specs](./tests/specs) : Test case package
* [Resource](./resource) : Test environment, test data, test localization file,screenshot
* [PageObjects](./tests/pageobjects) : POM - Web
* [ScreenObjects](./tests/screenobjects) : POM - Mobile
* [Widgets](./tests/widgets) : Custom mobile widgets/ web components/ controllers
* [API](./tests/api) : App participant API , admin portal API
* [Helpers](./tests/helpers) : Utilities
* [App](./apps) : App package (apk, ipa)

## Configuration files

This project uses a specific config for iOS and Android, see [configs](./config). The configs are based on a shared
config
[`wdio.shared.conf.ts`](./config/wdio.shared.conf.ts).
This shared config holds **all the defaults** so the iOS and Android configs only need to hold the capabilities and
specs that are needed for running on iOS and or Android (app or browser).

Please check the [`wdio.shared.conf.ts`](./config/wdio.shared.conf.ts)-file for the minimal configuration options. Notes
are added for why a different value has been selected in comparison to the default values WebdriverIO provides.

Currently, the configs support to run Local Devices and BrowserStack devices, they are groups under package 'local' and
browserstack. While BS, you don't need setup anything beside BS account, for Local, you have to setup a lot of things to
make it run

## Multi environment, test data and API keywords

Based on the last agreement of design concept, the automation will be implemented and executed on 'Auto' environment,
where we set everything fit to run automation,
with this enhancement, for future, if we have any changes, we can move further outside of scope to support running on
multiple environment beside 'Automation'. To achievement this target we need:

* Cross environment config files
* Strongly support of API keywords
* Cross environment test data files

By default, the environment will be 'Automation'. According to the value of TEST_ENVIRONMENT, 'Automation.json', '
QA.json', 'Staging.json' will be loaded corresponding

Environment & Testdata data will be loaded one and only one at base pages like

* BaseTest (test cases extend BaseTest)
* BaseScreen (mobile screens extend BaseScreen)
* BasePage (web pages extend BasePage)

### How to set:

Use environment variable **'process.env.TEST_ENVIRONMENT'**

On ['.env' file](./.env): this file basically load every default value to environment variables, you can find it at root
folder of project,
you can change value of TEST_ENVIRONMENT on file

Or

If you run test by CLI, you can change TEST_ENVIRONMENT directly on CLI as well, sample:

`TEST_ENVIRONMENT=QA npm run ...`

### Environment config file

* [Location](./resource/environment)

### TestData

* [Location](./resource/testdata)

Please follows concept below to manage test data

* Use API to generate dynamic test data, data will be generated in precondition step before moving to main test, the API
  will be managed at [API package](./tests/api/)

* Use TestData file to manage Read-Only test data, [file](./resource/testdata)

### API

Using API Factory pattern, the supper class **ParticipantApiService.ts** and **PortalApiService.ts** handle all logic of
login, get cookies, every request POST/GET/PUT/DELETE etc... and share to sup classes which override endpoint and
payload to use

## PageObjects and ScreenObjects

* ScreenObjects: package POM for Mobile
* PageObjects : package POM for Web

### ScreenObjects

Every mobile screen will extend from [BaseScreen](./tests/screenobjects/BaseScreen.ts).
This super class will share every config to any subclass like loading test data file, test localization file,
environment file etc... in setup()
It also shares setup on hooks and common keyword that we don't need to define again on every test class

### PageObjects

Share the same concept with ScreenObjects, every web page will extend from [BasePage](./tests/pageobjects/BasePage.ts)

## Multilingual

We support multilingual testing but only to a certain extent; we do not provide full support because multilingual
testing is not the main focus of the work, investing too much effort for relatively small results would not be
justified.

To achieve your have to define localization text on [localization file](./resource/loc)
And localize your page object with the language you have to run , for example Android:

* [EN](./tests/screenobjects/android/objects/en)
* [FR](./tests/screenobjects/android/objects/fr)

By the concept, EN is always super class while the other languages are sup class which extended from EN, if you need
localize your element on sup class, override it, if not leave it to use super class

Localization file + localized objects will be efficiently when working on IOS where element is not always got by static
ID but dynamic name, value

### How to define localized pages

Use reflection to import pageObjects

See example at android [Homepage](./tests/screenobjects/android/screens/HomeScreen.ts)

```
class HomeScreen extends BaseScreen {
private homeScreenObjects: typeof HomeScreenObjects;
private loginScreenObjects: typeof LoginScreenObjects;
private joinStudyScreenObjects: typeof JoinStudyScreenObjects;

    constructor () {
        super(SELECTORS.SCREEN);
    }

    async initialize() {
        const language = languageSettings.getLanguage();
        try {
            this.homeScreenObjects = (await import(`../objects/${language}/HomeScreenObjects.js`)).default;
            this.loginScreenObjects = (await import(`../objects/${language}/LoginScreenObjects.js`)).default;
            this.joinStudyScreenObjects = (await import(`../objects/${language}/JoinStudyScreenObjects.js`)).default;
        } catch (error) {
            throw new Error(`Failed to load element container for language: ${language}`);
        }
    }

    get screen () {return $(SELECTORS.SCREEN);}

    async clickOnButtonJoinStudy(){
        log.info("Click on button Join Study");
       await this.homeScreenObjects.btnJoinStudy.click()
        await expect(this.joinStudyScreenObjects.lblQuestion).toBeDisplayed()
    }

    async clickOnButtonSignIn(){
        log.info("Click on button SignIn");
        await this.homeScreenObjects.btnSignIn.click()
        await expect(this.loginScreenObjects.txtPassword).toBeDisplayed()
    }

}

export default new HomeScreen();
```

### Test localization file

Define localized text at [localization file](./resource/loc) for text which your want to check on application

Last but not least, define supported language at [LanguageSettings](./tests/helpers/LanguageSettings.ts)

### How to apply

If only 1 language is used throughout of test run

* Set via env variable **process.env.LANGUAGE** or ['.env' file](./.env)

If using multiple languages in non-DataDriven test case

* Use languageSettings.setLanguage(), Page.initialize() and recall **BaseTest.setup()**

```
it('should return error message if login by invalid user ' + run.userName, async () => {
      await languageSettings.setLanguage("fr")
      await HomeScreen.initialize()
      await this.setup()
      
      await HomeScreen.clickOnButtonSignIn()
      await LoginScreen.submitLogin(run.participant.username, run.participant.password)
      await expect($('[label="Username not found."]')).toBeDisplayed({ wait: 10 * 1000 })
});
```

If using multiple languages in DataDriven test case

* Use languageSettings.setLanguage(), Page.initialize() and recall **every keyword used inside BaseTest.setup()**

```
const runs = [
    {userName: testData.TC_0001.participant1.username, participant:testData.TC_0001.participant1},
    {userName: testData.TC_0001.participant2.username, participant:testData.TC_0001.participant2},
];

runs.forEach(function (run) {
    it('should return error message if login by invalid user ' + run.userName, async () => {
        await languageSettings.setLanguage("fr")
        await HomeScreen.initialize()
        const testData = await JSON.parse(await TestDataUtils.readTestDataFile());
        const loc = await TestLocalizationUtils.parseLOCFileWithLanguageSetting();
        const environment = await JSON.parse(await TestEnvironmentUtils.readEnvironmentFile())
        
        await HomeScreen.clickOnButtonSignIn()
        await LoginScreen.submitLogin(run.participant.username, run.participant.password)
        const errorMessage = loc.TC_0001.loginScreen.txtForgotPassword
        await expect($('[label="Username not found."]')).toBeDisplayed({ wait: 10 * 1000 })
        await expect($('[label="Username not found."]')).toBeDisplayed({ wait: 10 * 1000 })
    });
})
```

## Specs

Share concept with [ScreenObjects and page Objects](./README.md#pageobjects-and-screenobjects)

BaseTest is super class and every test class should be extended from this one to share configs and common keywords

> [!NOTE]
> There is an exception that the test case using Data-Driven won't share config in BaseTest.setup(),
> since the data use in driven will be initialized very firstly before any hooks while BaseTest.setup() to be called in
> hooks 'before()', means data driven > hooks, so when you call data in data driven keyword, it will
> throw Undefined exception.
> We need to make 'Setup test data ' > data driven, and we can make it by doing just simple 1 step: call 'testData =
> await JSON.parse(await TestDataUtils.readTestDataFile());' before running data driven and
> everything will be OK

## Reports

Cloud Service: BrowserStack report (built-in service)

Local: Allure

Log will log every keyword on your test script automatically, to log more test description on report (both Allure and
BS), please use keyword ['logStep'](./tests/helpers/ReportUtils.ts)

> [!NOTE]
> If you run test locally and case get failed, screenshot will be attached into Allure report or can be found
> at [savescreenshot folder](./resource/savescreenshot)

## Native App Tests

### Drag And Drop

TBD: Implement Phase

### Login with Biometric support

TBD: Implement Phase

### Swiping

TBD: Implement Phase

### Custom Widgets/Components/Controllers

Beside WebElement, we support custom widgets/components/controllers where you define controllers like Button, Table,
DropdownList etc, . It all based on which is controller used on your project and define keywords based on your purpose.
All controllers should be extended from BaseController and stored on seperated folder base on its platform

* [Android](./tests/widgets/android)
* [IOS](./tests/widgets/ios)
* [Web](./tests/widgets/web)

### Locator strategy for native apps

No matter what the UI/UX of app consistent cross-platform,
the app render on Android, IOS, Web will still be significant different on pageSource where the automation script works
so don't force your element to support
cross-platform, or try to use strategy to locate element consistently, it's nearly impossible (at least, wdio is not
friendly to do it).

Instead, we will store elements separately

* [Android](./tests/screenobjects/android/objects)
* [IOS](./tests/screenobjects/ios/objects)
* [Web](./tests/pageobjects/objects)

And suggest you to use various strategies to identify elements flexibly.

## Automating Chrome or Safari

Mobile web automation is almost the same as writing tests for desktop browsers. The only difference can be found in the
configuration that needs to be used.
For Android be sure that the latest version of Chrome is installed, there are several ways to install chrome driver.

1. You can install it to your node with npm
1. You can download it manually on website (https://googlechromelabs.github.io/chrome-for-testing/)
1. Or uses the `relaxedSecurity: true` argument from Appium which will allow Appium to automatically download the latest
   ChromeDriver.

## Cloud vendors

### BrowserStack

This project provides a setup for testing with BrowserStack. Please check the [BrowserStack](./config/browserstack)
folder to see the setup for iOS and Android.

Make sure you install the latest version of the `@wdio/browserstack-service` with:

```shell
npm install --save-dev @wdio/browserstack-service
```

Make sure you set secret Access Token and clean up any hard code Token before upload code to repository

The token can be set via environment variable: **BS_USERNAME** and **BS_ACCESS_KEY**

## Environment Variables

Project support to set and call Environment Variables follow CLI, purpose of this setting is to run test strategy
variety, flexibly when we integrate with CI/CD system, you can config:

* process.env.TEST_ENVIRONMENT - Test environment like QA, DEV, Auto, Staging etc
* process.env.SPECS - Test specs
* process.env.RETRIES - Retry once failed
* process.env.BS_USERNAME - BrowserStack username
* process.env.BS_ACCESS_KEY - BrowserStack access key
* process.env.BS_APP_NAME - BrowserStack Application ID
* or even process.env.DEVICE_NAME & process.env.PLATFORM_VERSION to select BS devices

## FAQ

See [FAQ](./docs/FAQ.md)

## Tips and Tricks

Resolve provisioning
profile, [link](https://appium.github.io/appium-xcuitest-driver/latest/preparation/prov-profile-full-manual/)

## Limitations

Not support path alias since wdioV8 , wdio [ticket](https://github.com/webdriverio/webdriverio/issues/10191)

Wdio + Mocha DOES NOT HAVE built in function to customize test case relationship or dependOn, you can only control your
flow by manage the order of testcase/testsuite

## DEVICE LIST

TBD