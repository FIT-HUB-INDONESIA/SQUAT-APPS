import allureReporter from "@wdio/allure-reporter";
import { dotenvConf } from "../../../config/dotenv";
import login from "../../../pages/fhad/page_login/login";
import navigation from "../../../pages/fhad/navigation";

describe("Feature Name", () => {
    it("Test case title @regression @coba", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;

        await navigation.navigate_to_fithub_dashboard();
        await login.addValue_login_email_field(user_email);
        await login.addValue_login_password_field(user_password);
        await login.click_login_sign_in_button();
    });
});
