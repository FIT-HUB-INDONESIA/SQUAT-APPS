// import Cleanup from "../../../handlers/sessions_cleanup";
import allureReporter from "@wdio/allure-reporter";
// import { dotenvConf } from "../../../config/dotenv";
import login from "../../../pages/fhad/page_login/login";
import navigation from "../../../pages/fhad/navigation";
import pt from "../../../pages/fhad/page_pt/pt";

describe("Feature Name", () => {
    // afterEach(async () => {
    //     await Cleanup.perform_logout();
    // });

    //NOTE - delete me
    it("Test case title @regression @coba", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        // const user_email = dotenvConf.fhadAdminEmail;
        // const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = "FIT HUB Bendungan Hilir (Benhil)";
        const preferred_pt_name = "Fira";

        await navigation.navigate_to_fithub_dashboard();
        // await login.addValue_login_email_field(user_email);
        // await login.addValue_login_password_field(user_password);
        // await login.click_login_sign_in_button();

        await login.skip_google_password_manager_popup();

        await pt.click_pt_club_select_dropdown();
        await pt.click_pt_club_select_list_target(preferred_club);
        await pt.click_pt_pt_name_select_dropdown();
        await pt.click_pt_pt_name_select_list_target(preferred_pt_name);
        await pt.click_pt_buat_jadwal_button();
    });
});
