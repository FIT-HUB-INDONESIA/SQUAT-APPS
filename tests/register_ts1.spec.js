// import Auth from "../pages/auth.js";
// import Main from "../pages/main.js";
// import Profiling from "../pages/profiling.js";
// import Register from "../pages/register.js";
import Logger from "../helpers/qmetry_logger.js";
import WelcomeScreen from "../pages/welcome_screen.js";
// import { dotenvConf } from "../config/dotenv.js";
// import { faker } from "@faker-js/faker";
// import { generatePhoneNumber } from "../helpers/faker.js";
import allureReporter from "@wdio/allure-reporter";
import fs from "fs";

let logger;

/**
 * Write feature name in "describe" block.
 * Write test-case title in "it" block.
 */
describe("Register", function () {
    const testCaseIDMapping = JSON.parse(
        fs.readFileSync("../data/tc_qmetry_id.json", "utf8")
    );

    beforeEach(function () {
        if (!this.currentTest) {
            console.warn("No current test found in beforeEach");

            return;
        }

        const testTitle = this.currentTest.title;

        this.currentTest.ctx.annotations =
            this.currentTest.ctx.annotations || [];

        const testCaseID =
            testCaseIDMapping[testTitle] || "Unknown Test Case ID";

        this.currentTest.ctx.annotations.push({
            description: testCaseID,
            type: "Issue Key"
        });

        process.env.TEST_CASE_TITLE = testTitle;
        process.env.TEST_CASE_ID = testCaseID;

        console.log("TEST CASE TITLE: ", process.env.TEST_CASE_TITLE);
        console.log("TEST CASE ID: ", process.env.TEST_CASE_ID);

        logger = new Logger();
        logger.log("Starting automation testing", testTitle);
    });

    after(async function () {
        logger = new Logger();
        await logger.saveLogs();
    });

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
