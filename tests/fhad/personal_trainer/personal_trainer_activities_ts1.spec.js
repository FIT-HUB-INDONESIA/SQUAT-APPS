import Cleanup from "../../../handlers/sessions_cleanup";
import allureReporter from "@wdio/allure-reporter";
import { dotenvConf } from "../../../config/dotenv";
import login from "../../../pages/fhad/page_login/login";
import main from "../../../pages/fhad/main";
import navigation from "../../../pages/fhad/navigation";
import pt from "../../../pages/fhad/page_pt/pt";

describe("Mobile Site Create Personal Trainer Activities", () => {
    afterEach(async () => {
        await Cleanup.perform_logout();
    });

    //NOTE - delete me
    // it("Test case title @regression", async () => {
    //     allureReporter.addParentSuite("Regression");
    //     allureReporter.addParentSuite("Smoke");
    //     allureReporter.addSeverity("critical");

    //     const user_email = dotenvConf.fhadAdminEmail;
    //     const user_password = dotenvConf.fhadAdminPassword;
    //     const preferred_club = "FIT HUB Bendungan Hilir (Benhil)";
    //     const preferred_pt_name = "Fira";
    //     const preferred_activity_type = "PT Session";
    //     const preferred_date = "27";
    //     const preferred_hour = "18";
    //     const preferred_minutes = "30";
    //     const preferred_client = "+62 817 3459 58";

    //     await navigation.navigate_to_fithub_dashboard();
    //     await login.addValue_login_email_field(user_email);
    //     await login.addValue_login_password_field(user_password);
    //     await login.click_login_sign_in_button();

    //     await login.skip_google_password_manager_popup();

    //     await pt.click_pt_club_select_dropdown();
    //     await pt.click_pt_club_select_list_target(preferred_club);
    //     await pt.click_pt_pt_name_select_dropdown();
    //     await pt.click_pt_pt_name_select_list_target(preferred_pt_name);
    //     await pt.click_pt_buat_jadwal_button();
    //     await pt.click_pt_activity_type_dropdown();
    //     await pt.click_pt_activity_type_list_target(preferred_activity_type);
    //     await pt.click_pt_date_picker_button();
    //     await pt.click_pt_date_picker_list_target(preferred_date);
    //     await pt.click_pt_started_at_button();
    //     await pt.select_time_picker_hour(preferred_hour);
    //     await pt.select_time_picker_minutes(preferred_minutes);
    //     await pt.click_pt_time_picker_select_button();
    //     await pt.click_pt_client_dropdown();
    //     await pt.addValue_pt_client_search_field(preferred_client);
    //     await pt.click_pt_client_list();
    //     await pt.addValue_pt_notes_field();
    //     await main.hide_keyboard();
    //     await pt.click_pt_save_button();
    //     await pt.click_pt_confirmation_button();
    // });

    it("Should successfully create paid PT session activity for PT role @regression @pt-activities @sample", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = dotenvConf.ptActivityClubName;
        const preferred_pt_name = dotenvConf.ptActivityTrainerName;
        const preferred_activity_type = "PT Session";
        const preferred_date = dotenvConf.paidPtSessionPreferredDate;
        const preferred_hour = dotenvConf.paidPtSessionPreferredHour;
        const preferred_minutes = dotenvConf.paidPtSessionPreferredMinutes;
        const preferred_client = dotenvConf.paidPtSessionMemberPhone;

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
        await pt.select_time_picker_hour(preferred_hour);
        await pt.select_time_picker_minutes(preferred_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.click_pt_client_dropdown();
        await pt.addValue_pt_client_search_field(preferred_client);
        await pt.click_pt_client_list();
        await pt.addValue_pt_notes_field();
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        // await pt.click_pt_confirmation_button();
    });

    it("Should successfully create fit start PT session activity for PT role @regression @pt-activities @sample", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = dotenvConf.ptActivityClubName;
        const preferred_pt_name = dotenvConf.ptActivityTrainerName;
        const preferred_activity_type = "PT Session";
        const preferred_date = dotenvConf.fitStartPtSessionPreferredDate;
        const preferred_hour = dotenvConf.fitStartPtSessionPreferredHour;
        const preferred_minutes = dotenvConf.fitStartPtSessionPreferredMinutes;
        const preferred_client = dotenvConf.fitStartPtSessionMemberPhone;

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
        await pt.select_time_picker_hour(preferred_hour);
        await pt.select_time_picker_minutes(preferred_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.click_pt_client_dropdown();
        await pt.addValue_pt_client_search_field(preferred_client);
        await pt.click_pt_client_list();
        await pt.addValue_pt_notes_field();
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        // await pt.click_pt_confirmation_button();
    });

    it("Should successfully create PT class activity for PT role @regression @pt-activities @sample", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = dotenvConf.ptActivityClubName;
        const preferred_pt_name = dotenvConf.ptActivityTrainerName;
        const preferred_activity_type = "PT Class";
        const preferred_date = dotenvConf.ptClassPreferredDate;
        const preferred_start_hour = dotenvConf.ptClassPreferredStartHour;
        const preferred_start_minutes = dotenvConf.ptClassPreferredStartMinutes;
        const preferred_finish_hour = dotenvConf.ptClassPreferredFinishHour;
        const preferred_finish_minutes =
            dotenvConf.ptClassPreferredFinishMinutes;

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
        await pt.select_time_picker_hour(preferred_start_hour);
        await pt.select_time_picker_minutes(preferred_start_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.click_pt_finished_at_button();
        await pt.select_time_picker_hour_finish(
            preferred_finish_hour,
            preferred_start_hour
        );
        await pt.select_time_picker_minutes(preferred_finish_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.addValue_pt_notes_field();
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        // await pt.click_pt_confirmation_button();
    });

    it("Should successfully create reassessment activity for PT role @regression @pt-activities @sample", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = dotenvConf.ptActivityClubName;
        const preferred_pt_name = dotenvConf.ptActivityTrainerName;
        const preferred_activity_type = "Reassessment";
        const preferred_date = dotenvConf.reasementPreferredDate;
        const preferred_start_hour = dotenvConf.reasementPreferredStartHour;
        const preferred_start_minutes =
            dotenvConf.reasementPreferredStartMinutes;
        const preferred_finish_hour = dotenvConf.reasementPreferredFinishHour;
        const preferred_finish_minutes =
            dotenvConf.reasementPreferredFinishMinutes;

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
        await pt.select_time_picker_hour(preferred_start_hour);
        await pt.select_time_picker_minutes(preferred_start_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.click_pt_finished_at_button();
        await pt.select_time_picker_hour_finish(
            preferred_finish_hour,
            preferred_start_hour
        );
        await pt.select_time_picker_minutes(preferred_finish_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.addValue_pt_notes_field();
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        // await pt.click_pt_confirmation_button();
    });

    it("Should successfully create fitness welcome activity for PT role @regression @pt-activities @sample", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = dotenvConf.ptActivityClubName;
        const preferred_pt_name = dotenvConf.ptActivityTrainerName;
        const preferred_activity_type = "Fitness Welcome";
        const preferred_date = dotenvConf.fitnessWelcomePreferredDate;
        const preferred_start_hour =
            dotenvConf.fitnessWelcomePreferredStartHour;
        const preferred_start_minutes =
            dotenvConf.fitnessWelcomePreferredStartMinutes;
        const preferred_finish_hour =
            dotenvConf.fitnessWelcomePreferredFinishHour;
        const preferred_finish_minutes =
            dotenvConf.fitnessWelcomePreferredFinishMinutes;

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
        await pt.select_time_picker_hour(preferred_start_hour);
        await pt.select_time_picker_minutes(preferred_start_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.click_pt_finished_at_button();
        await pt.select_time_picker_hour_finish(
            preferred_finish_hour,
            preferred_start_hour
        );
        await pt.select_time_picker_minutes(preferred_finish_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.addValue_pt_notes_field();
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        // await pt.click_pt_confirmation_button();
    });

    it("Should successfully create gym patrol activity for PT role @regression @pt-activities @sample", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = dotenvConf.ptActivityClubName;
        const preferred_pt_name = dotenvConf.ptActivityTrainerName;
        const preferred_activity_type = "Gym Patrol";
        const preferred_date = dotenvConf.gymPatrolPreferredDate;
        const preferred_start_hour = dotenvConf.gymPatrolPreferredStartHour;
        const preferred_start_minutes =
            dotenvConf.gymPatrolPreferredStartMinutes;
        const preferred_finish_hour = dotenvConf.gymPatrolPreferredFinishHour;
        const preferred_finish_minutes =
            dotenvConf.gymPatrolPreferredFinishMinutes;

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
        await pt.select_time_picker_hour(preferred_start_hour);
        await pt.select_time_picker_minutes(preferred_start_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.click_pt_finished_at_button();
        await pt.select_time_picker_hour_finish(
            preferred_finish_hour,
            preferred_start_hour
        );
        await pt.select_time_picker_minutes(preferred_finish_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.addValue_pt_notes_field();
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        // await pt.click_pt_confirmation_button();
    });

    it("Should successfully create training internal activity for PT role @regression @pt-activities @sample", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = dotenvConf.ptActivityClubName;
        const preferred_pt_name = dotenvConf.ptActivityTrainerName;
        const preferred_activity_type = "Training Internal";
        const preferred_date = dotenvConf.trainingInternalPreferredDate;
        const preferred_start_hour =
            dotenvConf.trainingInternalPreferredStartHour;
        const preferred_start_minutes =
            dotenvConf.trainingInternalPreferredStartMinutes;
        const preferred_finish_hour =
            dotenvConf.trainingInternalPreferredFinishHour;
        const preferred_finish_minutes =
            dotenvConf.trainingInternalPreferredFinishMinutes;

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
        await pt.select_time_picker_hour(preferred_start_hour);
        await pt.select_time_picker_minutes(preferred_start_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.click_pt_finished_at_button();
        await pt.select_time_picker_hour_finish(
            preferred_finish_hour,
            preferred_start_hour
        );
        await pt.select_time_picker_minutes(preferred_finish_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.addValue_pt_notes_field();
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        // await pt.click_pt_confirmation_button();
    });

    it("Should successfully create training external activity for PT role @regression @pt-activities @sample", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = dotenvConf.ptActivityClubName;
        const preferred_pt_name = dotenvConf.ptActivityTrainerName;
        const preferred_activity_type = "Training External";
        const preferred_date = dotenvConf.trainingExternalPreferredDate;
        const preferred_start_hour =
            dotenvConf.trainingExternalPreferredStartHour;
        const preferred_start_minutes =
            dotenvConf.trainingExternalPreferredStartMinutes;
        const preferred_finish_hour =
            dotenvConf.trainingExternalPreferredFinishHour;
        const preferred_finish_minutes =
            dotenvConf.trainingExternalPreferredFinishMinutes;

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
        await pt.select_time_picker_hour(preferred_start_hour);
        await pt.select_time_picker_minutes(preferred_start_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.click_pt_finished_at_button();
        await pt.select_time_picker_hour_finish(
            preferred_finish_hour,
            preferred_start_hour
        );
        await pt.select_time_picker_minutes(preferred_finish_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.addValue_pt_notes_field();
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        // await pt.click_pt_confirmation_button();
    });

    it("Should successfully create exercise activity for PT role @regression @pt-activities @sample", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = dotenvConf.ptActivityClubName;
        const preferred_pt_name = dotenvConf.ptActivityTrainerName;
        const preferred_activity_type = "Exercise";
        const preferred_date = dotenvConf.exercisePreferredDate;
        const preferred_start_hour = dotenvConf.exercisePreferredStartHour;
        const preferred_start_minutes =
            dotenvConf.exercisePreferredStartMinutes;
        const preferred_finish_hour = dotenvConf.exercisePreferredFinishHour;
        const preferred_finish_minutes =
            dotenvConf.exercisePreferredFinishMinutes;

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
        await pt.select_time_picker_hour(preferred_start_hour);
        await pt.select_time_picker_minutes(preferred_start_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.click_pt_finished_at_button();
        await pt.select_time_picker_hour_finish(
            preferred_finish_hour,
            preferred_start_hour
        );
        await pt.select_time_picker_minutes(preferred_finish_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.addValue_pt_notes_field();
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        // await pt.click_pt_confirmation_button();
    });

    it("Should successfully create break activity for PT role @regression @pt-activities @sample", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = dotenvConf.ptActivityClubName;
        const preferred_pt_name = dotenvConf.ptActivityTrainerName;
        const preferred_activity_type = "Break";
        const preferred_date = dotenvConf.breakPreferredDate;
        const preferred_start_hour = dotenvConf.breakPreferredStartHour;
        const preferred_start_minutes = dotenvConf.breakPreferredStartMinutes;
        const preferred_finish_hour = dotenvConf.breakPreferredFinishHour;
        const preferred_finish_minutes = dotenvConf.breakPreferredFinishMinutes;

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
        await pt.select_time_picker_hour(preferred_start_hour);
        await pt.select_time_picker_minutes(preferred_start_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.click_pt_finished_at_button();
        await pt.select_time_picker_hour_finish(
            preferred_finish_hour,
            preferred_start_hour
        );
        await pt.select_time_picker_minutes(preferred_finish_minutes);
        await pt.click_pt_time_picker_select_button();
        await pt.addValue_pt_notes_field();
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        // await pt.click_pt_confirmation_button();
    });

    it("Should successfully create libur (day off) activity for PT role @regression @pt-activities @sample", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_email = dotenvConf.fhadAdminEmail;
        const user_password = dotenvConf.fhadAdminPassword;
        const preferred_club = dotenvConf.ptActivityClubName;
        const preferred_pt_name = dotenvConf.ptActivityTrainerName;
        const preferred_activity_type = "Day Off";
        const preferred_date = dotenvConf.dayOffPreferredDate;

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
        await pt.addValue_pt_notes_field();
        await main.hide_keyboard();
        await pt.click_pt_save_button();
        // await pt.click_pt_confirmation_button();
    });

    // it("Should successfully create PT session activity for CM role @regression @pt-activities", async () => {
    //     allureReporter.addParentSuite("Regression");
    //     allureReporter.addSeverity("normal");

    //     const user_email = dotenvConf.fhadCmEmail;
    //     const user_password = dotenvConf.fhadCmPassword;
    //     const preferred_club = dotenvConf.ptActivityClubName;
    //     const preferred_pt_name = dotenvConf.ptActivityTrainerName;
    //     const preferred_activity_type = "PT Session";
    //     const preferred_date = dotenvConf.paidPtSessionPreferredDate;
    //     const preferred_hour = dotenvConf.paidPtSessionPreferredHour;
    //     const preferred_minutes = dotenvConf.paidPtSessionPreferredMinutes;
    //     const preferred_client = dotenvConf.paidPtSessionMemberPhone;

    //     await navigation.navigate_to_fithub_dashboard();
    //     await login.addValue_login_email_field(user_email);
    //     await login.addValue_login_password_field(user_password);
    //     await login.click_login_sign_in_button();

    //     await login.skip_google_password_manager_popup();

    //     await pt.click_pt_club_select_dropdown();
    //     await pt.click_pt_club_select_list_target(preferred_club);
    //     await pt.click_pt_pt_name_select_dropdown();
    //     await pt.click_pt_pt_name_select_list_target(preferred_pt_name);
    //     await pt.click_pt_buat_jadwal_button();
    //     await pt.click_pt_activity_type_dropdown();
    //     await pt.click_pt_activity_type_list_target(preferred_activity_type);
    //     await pt.click_pt_date_picker_button();
    //     await pt.click_pt_date_picker_list_target(preferred_date);
    //     await pt.click_pt_started_at_button();
    //     await pt.select_time_picker_hour(preferred_hour);
    //     await pt.select_time_picker_minutes(preferred_minutes);
    //     await pt.click_pt_time_picker_select_button();
    //     await pt.click_pt_client_dropdown();
    //     await pt.addValue_pt_client_search_field(preferred_client);
    //     await pt.click_pt_client_list();
    //     await pt.addValue_pt_notes_field();
    //     await main.hide_keyboard();
    //     await pt.click_pt_save_button();
    //     // await pt.click_pt_confirmation_button();
    // });

    // it("Should successfully create PT session activity for FM role @regression @pt-activities", async () => {
    //     allureReporter.addParentSuite("Regression");
    //     allureReporter.addSeverity("normal");

    //     const user_email = dotenvConf.fhadFmEmail;
    //     const user_password = dotenvConf.fhadFmPassword;
    //     const preferred_club = dotenvConf.ptActivityClubName;
    //     const preferred_pt_name = dotenvConf.ptActivityTrainerName;
    //     const preferred_activity_type = "PT Session";
    //     const preferred_date = dotenvConf.paidPtSessionPreferredDate;
    //     const preferred_hour = dotenvConf.paidPtSessionPreferredHour;
    //     const preferred_minutes = dotenvConf.paidPtSessionPreferredMinutes;
    //     const preferred_client = dotenvConf.paidPtSessionMemberPhone;

    //     await navigation.navigate_to_fithub_dashboard();
    //     await login.addValue_login_email_field(user_email);
    //     await login.addValue_login_password_field(user_password);
    //     await login.click_login_sign_in_button();

    //     await login.skip_google_password_manager_popup();

    //     await pt.click_pt_club_select_dropdown();
    //     await pt.click_pt_club_select_list_target(preferred_club);
    //     await pt.click_pt_pt_name_select_dropdown();
    //     await pt.click_pt_pt_name_select_list_target(preferred_pt_name);
    //     await pt.click_pt_buat_jadwal_button();
    //     await pt.click_pt_activity_type_dropdown();
    //     await pt.click_pt_activity_type_list_target(preferred_activity_type);
    //     await pt.click_pt_date_picker_button();
    //     await pt.click_pt_date_picker_list_target(preferred_date);
    //     await pt.click_pt_started_at_button();
    //     await pt.select_time_picker_hour(preferred_hour);
    //     await pt.select_time_picker_minutes(preferred_minutes);
    //     await pt.click_pt_time_picker_select_button();
    //     await pt.click_pt_client_dropdown();
    //     await pt.addValue_pt_client_search_field(preferred_client);
    //     await pt.click_pt_client_list();
    //     await pt.addValue_pt_notes_field();
    //     await main.hide_keyboard();
    //     await pt.click_pt_save_button();
    //     // await pt.click_pt_confirmation_button();
    // });

    // it("Should successfully create PT session activity for Admin role @regression @pt-activities", async () => {
    //     allureReporter.addParentSuite("Regression");
    //     allureReporter.addSeverity("normal");

    //     const user_email = dotenvConf.fhadAdminEmail;
    //     const user_password = dotenvConf.fhadAdminPassword;
    //     const preferred_club = dotenvConf.ptActivityClubName;
    //     const preferred_pt_name = dotenvConf.ptActivityTrainerName;
    //     const preferred_activity_type = "PT Session";
    //     const preferred_date = dotenvConf.paidPtSessionPreferredDate;
    //     const preferred_hour = dotenvConf.paidPtSessionPreferredHour;
    //     const preferred_minutes = dotenvConf.paidPtSessionPreferredMinutes;
    //     const preferred_client = dotenvConf.paidPtSessionMemberPhone;

    //     await navigation.navigate_to_fithub_dashboard();
    //     await login.addValue_login_email_field(user_email);
    //     await login.addValue_login_password_field(user_password);
    //     await login.click_login_sign_in_button();

    //     await login.skip_google_password_manager_popup();

    //     await pt.click_pt_club_select_dropdown();
    //     await pt.click_pt_club_select_list_target(preferred_club);
    //     await pt.click_pt_pt_name_select_dropdown();
    //     await pt.click_pt_pt_name_select_list_target(preferred_pt_name);
    //     await pt.click_pt_buat_jadwal_button();
    //     await pt.click_pt_activity_type_dropdown();
    //     await pt.click_pt_activity_type_list_target(preferred_activity_type);
    //     await pt.click_pt_date_picker_button();
    //     await pt.click_pt_date_picker_list_target(preferred_date);
    //     await pt.click_pt_started_at_button();
    //     await pt.select_time_picker_hour(preferred_hour);
    //     await pt.select_time_picker_minutes(preferred_minutes);
    //     await pt.click_pt_time_picker_select_button();
    //     await pt.click_pt_client_dropdown();
    //     await pt.addValue_pt_client_search_field(preferred_client);
    //     await pt.click_pt_client_list();
    //     await pt.addValue_pt_notes_field();
    //     await main.hide_keyboard();
    //     await pt.click_pt_save_button();
    //     // await pt.click_pt_confirmation_button();
    // });
});
