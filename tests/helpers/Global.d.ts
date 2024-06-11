declare namespace WebdriverIO {
    interface Element {
        waitForElementToDisappear(timeout?: number): Promise<void>;
        waitForElementToBeClickable(timeout?: number): Promise<void>;
        waitForText(text: string, timeout?: number): Promise<void>;
    }
}

declare module 'webdriverio' {
    interface Element {
        waitForElementToDisappear(timeout?: number): Promise<void>;
        waitForElementToBeClickable(timeout?: number): Promise<void>;
        waitForText(text: string, timeout?: number): Promise<void>;
    }
}