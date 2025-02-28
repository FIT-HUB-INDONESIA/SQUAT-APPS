import AuthApiCollections from "../../../../utils/api/mobile_site/authorization/auth";
import allureReporter from "@wdio/allure-reporter";
import { dotenvConf } from "../../../../config/dotenv";
/**
 * Write feature name in "describe" block.
 * Write test-case title in "it" block.
 */
//TODO - lanjutkan dari sini
describe("Test", () => {
    it("Test case @api", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;

        await AuthApiCollections.post_v1_auth_login(email, password);
    });
});
