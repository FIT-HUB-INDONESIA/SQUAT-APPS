import allureReporter from "@wdio/allure-reporter";

/**
 * Write feature name in "describe" block.
 * Write test-case title in "it" block.
 */
//TODO - lanjutkan dari sini
describe("Test", () => {
    it("Test case title @regression @smoke", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        // Define test paramaters here

        // Write test steps here
    });
});
