// import Auth from "../pages/auth.js";
// import Main from "../pages/main.js";
// import Profiling from "../pages/profiling.js";
// import Register from "../pages/register.js";
import WelcomeScreen from "../pages/welcome_screen.js";
// import { dotenvConf } from "../config/dotenv.js";
// import { faker } from "@faker-js/faker";
// import { generatePhoneNumber } from "../helpers/faker.js";
import allureReporter from "@wdio/allure-reporter";

/**
 * Write feature name in "describe" block.
 * Write test-case title in "it" block.
 */
describe("Register", function () {
    it("Should successfully register as a new member @register @regression @smoke", async function () {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        // const user_name = faker.person.fullName();
        // const user_phone_number = generatePhoneNumber();
        // const user_email = dotenvConf.registerUserEmail;
        // const otp_number = dotenvConf.registerOtpNumber;
        // const pin_creation_number = dotenvConf.registerPinNumber;
        // const pin_confirmation_number = dotenvConf.registerPinNumber;

        await WelcomeScreen.welcome_screen_buat_akun_button_validation();
        await WelcomeScreen.click_welcome_screen_buat_akun_button();
        // await Register.fill_name_field(user_name);
        // await Register.fill_phone_number_field(user_phone_number);
        // await Register.fill_email_field(user_email);
        // await Register.click_tnc_checkbox();
        // await Register.click_send_otp_button();
        // await Auth.fill_otp_number_field(otp_number);
        // await Auth.fill_pin_creation_number_field(pin_creation_number);
        // await Auth.fill_pin_confirmation_number_field(pin_confirmation_number);
        // await Profiling.click_profiling_lewati_dulu_button();
        // await Profiling.click_profiling_ya_lewati_button();
        // await Main.click_main_profile_button();
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
