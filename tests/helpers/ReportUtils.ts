import allureReporter from "@wdio/allure-reporter";

export class ReportUtils {
    public static async logStep(stepDescription: string) {
        // Log step to Allure report
        allureReporter.addStep(stepDescription);
        // Log step to BrowserStack report
        await driver.execute('browserstack_executor: {"action": "annotate", "arguments": {"data": "' + stepDescription + '", "level": "info"}}');
    }
}