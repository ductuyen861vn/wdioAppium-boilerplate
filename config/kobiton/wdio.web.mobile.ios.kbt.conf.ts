import {config as baseConfig} from '../wdio.web.shared.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // ============
    // Connection server
    // ============
    hostname: 'hoang.tran:9830807a-109a-4b7b-a545-8f1e5a05d7ab@api.kobiton.com',
    path:'/wd/hub',
    protocol:'https',
    port:443,

    // ============
    // Specs
    // ============
    specs: ['../../tests/specs/web/**/*.ts'],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-xcuitest-driver
    // NOTE: Config for device on Kobiton Server
    // Please use capability generator on Kobiton website
    capabilities: [
        {
            'appium:platformName': 'iOS',
            // 'appium:deviceName': 'iPhone 11',
            // "appium:udid":'00008030-001E18300108802E',//11Pro
            "appium:udid":'00008110-000E7CC92EB9401E',//13 Pro
            // 'appium:platformVersion': '17.0',
            'appium:orientation': 'portrait',
            'appium:autoGrantPermissions':true,
            'appium:autoWebview': true,
            'appium:browserName': 'safari',


            //Other configs
            'appium:newCommandTimeout': 3000,
        },
    ],
};
