import Auth from "../pages/auth/auth.js";
import Profiling from "../pages/onboarding/profiling.js";
import Register from "../pages/auth/register.js";
import WelcomeScreen from "../pages/auth/welcome_screen.js";
import allureReporter from "@wdio/allure-reporter";
import { dotenvConf } from "../config/dotenv.js";
import { faker } from "@faker-js/faker";
import { generatePhoneNumber } from "../helpers/faker.js";

/**
 * Write feature name in "describe" block.
 * Write test-case title in "it" block.
 */
describe("Register", () => {
    it("Should successfully register as a new member @register @regression @smoke", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        const user_name = faker.person.fullName();
        const user_phone_number = generatePhoneNumber();
        const user_email = dotenvConf.registerUserEmail;
        const otp_number = dotenvConf.registerOtpNumber;
        const pin_creation_and_confirmation_number =
            dotenvConf.registerPinNumber;

        await WelcomeScreen.welcome_screen_buat_akun_button_validation();
        await WelcomeScreen.click_welcome_screen_buat_akun_button();
        await Register.register_kirimkan_kode_otp_button_disabled_validation();
        await Register.fill_register_nama_field(user_name);
        await Register.fill_register_phone_number_field(user_phone_number);
        await Register.fill_register_email_field(user_email);
        await Register.click_register_tnc_checkbox();
        await Register.click_register_kirimkan_kode_otp_button();
        await Auth.otp_lanjutkan_button_validation();
        await Auth.fill_otp_number_field(otp_number);
        await Auth.fill_create_pin_on_click_number_field(
            pin_creation_and_confirmation_number
        );
        await Auth.fill_confirmation_pin_on_click_number_field(
            pin_creation_and_confirmation_number
        );
        await Profiling.profiling_lewati_dulu_button_validation();
        await Profiling.click_profiling_lewati_dulu_button();
        await Profiling.profiling_ya_lewati_button_validation();
        await Profiling.click_profiling_ya_lewati_button();
    });
});

describe("Login", () => {
    it("Should successfully login as a existing member @login @regression @smoke", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");
    });
});

describe("Logout", () => {
    it("Should successfully logout after register @logout @regression", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");
    });
    it("Should successfully logout after login @logout @regression", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");
    });
});
