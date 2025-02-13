import AturAkun from "../pages/page_profile/feat_atur_akun/atur_akun.js";
import Auth from "../pages/page_welcome_screen/feat_auth/auth.js";
import Cleanup from "../handlers/sessions_cleanup.js";
import Login from "../pages/page_welcome_screen/feat_login/login.js";
import Main from "../pages/main.js";
import Profile from "../pages/page_profile/profile.js";
import Profiling from "../pages/page_welcome_screen/feat_profiling/profiling.js";
import Register from "../pages/page_welcome_screen/feat_register/register.js";
import WelcomeScreen from "../pages/page_welcome_screen/welcome_screen.js";
import allureReporter from "@wdio/allure-reporter";
import { dotenvConf } from "../config/dotenv.js";
import { faker } from "@faker-js/faker";
import { generatePhoneNumber } from "../helpers/faker.js";

/**
 * Write feature name in "describe" block.
 * Write test-case title in "it" block.
 */
describe("Register", () => {
    afterEach(async () => {
        await Cleanup.relaunch_app(
            browser.capabilities.platformName,
            dotenvConf.wdioAppId
        );
    });

    it("Should successfully register as a new member @register @regression @smoke", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        const user_name = faker.person.fullName();
        const user_phone_number = generatePhoneNumber();
        const user_email = dotenvConf.userEmail;
        const otp_number = dotenvConf.otpNumber;
        const pin_creation_number = dotenvConf.pinNumber;
        const pin_confirmation_number = dotenvConf.pinNumber;

        await WelcomeScreen.welcome_screen_buat_akun_button_validation();
        await WelcomeScreen.click_welcome_screen_buat_akun_button();
        await Register.register_kirimkan_kode_otp_button_disabled_validation();
        await Register.fill_register_nama_field(user_name);
        await Register.fill_register_phone_number_field(user_phone_number);
        await Register.fill_register_email_field(user_email);
        await Register.click_register_tnc_checkbox();
        await Register.click_register_kirimkan_kode_otp_button();
        await Auth.fill_auth_otp_number_field(otp_number);
        await Auth.fill_auth_pin_on_click_number_field(pin_creation_number);
        await Auth.fill_auth_pin_off_click_number_field(
            pin_confirmation_number
        );
        await Profiling.profiling_lewati_dulu_button_validation();
        await Profiling.click_profiling_lewati_dulu_button();
        await Profiling.profiling_ya_lewati_button_validation();
        await Profiling.click_profiling_ya_lewati_button();
    });
});

describe("Login", () => {
    afterEach(async () => {
        await Cleanup.relaunch_app(
            browser.capabilities.platformName,
            dotenvConf.wdioAppId
        );
    });

    it("Should successfully login as a existing member @login @regression @smoke", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        const user_phone_number = dotenvConf.loginNonActiveMembership;
        const otp_number = dotenvConf.otpNumber;
        const pin_number = dotenvConf.pinNumber;

        await WelcomeScreen.welcome_screen_masuk_button_validation();
        await WelcomeScreen.click_welcome_screen_masuk_button();
        await Login.login_lanjutkan_button_disabled_validation();
        await Login.fill_login_user_phone_number_field(user_phone_number);
        await Login.login_lanjutkan_button_enabled_validation();
        await Login.click_login_lanjutkan_button();

        if (await Login.login_on_new_device_validation()) {
            await Login.login_ya_lanjut_button_validation();
            await Login.click_login_ya_lanjut_button();
            await Auth.fill_auth_otp_number_field(otp_number);
        }

        await Auth.fill_auth_pin_on_click_number_field(pin_number);

        if (!(await Profiling.complete_profiling_validation())) {
            await Profiling.click_profiling_lewati_dulu_button();
            await Profiling.click_profiling_ya_lewati_button();
        }
    });
});

describe("Logout", () => {
    afterEach(async () => {
        await Cleanup.relaunch_app(
            browser.capabilities.platformName,
            dotenvConf.wdioAppId
        );
    });

    it("Should successfully logout after register @logout @regression", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_name = faker.person.fullName();
        const user_phone_number = generatePhoneNumber();
        const user_email = dotenvConf.userEmail;
        const otp_number = dotenvConf.otpNumber;
        const pin_creation_number = dotenvConf.pinNumber;
        const pin_confirmation_number = dotenvConf.pinNumber;

        await WelcomeScreen.click_welcome_screen_buat_akun_button();
        await Register.fill_register_nama_field(user_name);
        await Register.fill_register_phone_number_field(user_phone_number);
        await Register.fill_register_email_field(user_email);
        await Register.click_register_tnc_checkbox();
        await Register.click_register_kirimkan_kode_otp_button();
        await Auth.fill_auth_otp_number_field(otp_number);
        await Auth.fill_auth_pin_on_click_number_field(pin_creation_number);
        await Auth.fill_auth_pin_off_click_number_field(
            pin_confirmation_number
        );
        await Profiling.click_profiling_lewati_dulu_button();
        await Profiling.click_profiling_ya_lewati_button();

        await Main.main_profile_button_validation();
        await Main.click_main_profile_button();
        await Profile.profile_atur_akun_button_validation();
        await AturAkun.atur_akun_keluar_akun_button_validation();
        await AturAkun.click_atur_akun_keluar_akun_button();
        await AturAkun.atur_akun_keluar_akun_confirm_button_validation();
        await AturAkun.click_atur_akun_keluar_akun_confirm_button();
    });

    it("Should successfully logout after login @logout @regression", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const user_phone_number = dotenvConf.loginNonActiveMembership;
        const otp_number = dotenvConf.otpNumber;
        const pin_number = dotenvConf.pinNumber;

        await WelcomeScreen.click_welcome_screen_masuk_button();
        await Login.fill_login_user_phone_number_field(user_phone_number);
        await Login.click_login_lanjutkan_button();

        if (await Login.login_on_new_device_validation()) {
            await Login.login_ya_lanjut_button_validation();
            await Login.click_login_ya_lanjut_button();
            await Auth.fill_auth_otp_number_field(otp_number);
        }

        await Auth.fill_auth_pin_on_click_number_field(pin_number);

        if (!(await Profiling.complete_profiling_validation())) {
            await Profiling.click_profiling_lewati_dulu_button();
            await Profiling.click_profiling_ya_lewati_button();
        }

        await Main.click_main_profile_button();
        await Profile.click_profile_atur_akun_button();
        await AturAkun.click_atur_akun_keluar_akun_button();
        await AturAkun.click_atur_akun_keluar_akun_confirm_button();
    });
});
