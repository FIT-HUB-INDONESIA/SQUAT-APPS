import allureReporter from "@wdio/allure-reporter";
import navigation from "../../../pages/fhad/navigation";

describe("Feature Name", () => {
    it("Test case title @regression @smoke", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        // Define test paramaters here

        await navigation.navigate_to_fithub_dashboard();
    });
});
