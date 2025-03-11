// import Cleanup from "../../../handlers/sessions_cleanup";
import allureReporter from "@wdio/allure-reporter";
import { dotenvConf } from "../../../config/dotenv";
import login from "../../../pages/fhad/page_login/login";
import main from "../../../pages/fhad/main";
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

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = "FIT HUB Bendungan Hilir (Benhil)";
        const preferred_pt_name = "Fira";
        const preferred_activity_type = "PT Session";
        const preferred_date = "27";
        const preferred_hour = "18";
        const preferred_minutes = "30";
        const preferred_client = "+62 817 3459 58";
        const preferred_notes = `QA UI Real device automation test: ${browser.capabilities.platformName}`;

        await navigation.navigate_to_fithub_dashboard();
        await login.addValue_login_email_field(user_email);
        await login.addValue_login_password_field(user_password);
        await login.click_login_sign_in_button();

        await login.skip_google_password_manager_popup();

        await pt.click_pt_club_select_dropdown();
        await pt.click_pt_club_select_list_target(preferred_club);
        await pt.click_pt_pt_name_select_dropdown();
        await pt.click_pt_pt_name_select_list_target(preferred_pt_name);
        await pt.click_pt_buat_jadwal_button();
        await pt.click_pt_activity_type_dropdown();
        await pt.click_pt_activity_type_list_target(preferred_activity_type);
        await pt.click_pt_date_picker_button();
        await pt.click_pt_date_picker_list_target(preferred_date);
        await pt.click_pt_started_at_button();
        await browser.pause(1000);
        await pt.select_time_picker_hour(preferred_hour);
        await pt.select_time_picker_minutes(preferred_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.click_pt_client_dropdown();
        await pt.addValue_pt_client_search_field(preferred_client);
        await browser.pause(1000);
        await pt.click_pt_client_list();
        await browser.pause(2000);
        await pt.addValue_pt_notes_field(preferred_notes);
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        await pt.click_pt_confirmation_button();
    });
});
