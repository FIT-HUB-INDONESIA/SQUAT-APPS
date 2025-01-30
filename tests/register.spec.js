import Auth from "../pages/auth.js";
import Profiling from "../pages/profiling.js";
import Register from "../pages/register.js";
import WelcomeScreen from "../pages/welcome_screen.js";
import { faker } from "@faker-js/faker";
import { generatePhoneNumber } from "../helpers/faker.js";

describe("Register test: Happy flow", () => {
    it("Should successfully register to as a new member", async () => {
        const user_name = faker.person.fullName();
        const user_phone_number = generatePhoneNumber();
        const user_email = "test@test.id";
        const otp_number = "112233";
        const pin_creation_number = "000000";
        const pin_confirmation_number = "000000";

        await WelcomeScreen.goto_register_page();
        await Register.fill_name_field(user_name);
        await Register.fill_phone_number_field(user_phone_number);
        await Register.fill_email_field(user_email);
        await Register.click_tnc_checkbox();
        await Register.click_send_otp_button();
        await Auth.fill_otp_number_field(otp_number);
        await Auth.fill_pin_creation_number_field(pin_creation_number);
        await Auth.fill_pin_confirmation_number_field(pin_confirmation_number);
        await Profiling.click_profiling_lewati_dulu_button();
        await Profiling.click_profiling_ya_lewati_button();
    });
});
