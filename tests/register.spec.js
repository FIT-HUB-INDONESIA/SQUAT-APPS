import Register from "../pages/register.js";
import WelcomeScreen from "../pages/welcome_screen.js";
import { faker } from "@faker-js/faker";
import { generatePhoneNumber } from "../helpers/faker.js";

describe("Register test: Happy flow", () => {
    it("Should successfully register to as a new member", async () => {
        const user_name = faker.person.fullName();
        const user_phone_number = generatePhoneNumber();
        const user_email = "test@test.id";

        await WelcomeScreen.goto_register_page();
        await Register.fill_name_field(user_name);
        await Register.fill_phone_number_field(user_phone_number);
        await Register.fill_email_field(user_email);
        await Register.click_tnc_checkbox();
        await Register.click_send_otp_button();
    });
});
