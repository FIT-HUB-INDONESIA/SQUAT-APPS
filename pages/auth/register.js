import elementHelper from "../../helpers/wdio_element.js";
import expectHelper from "../../helpers/wdio_expect.js";

/**
 * Base class containing common selectors
 */
class RegisterSelectors {
    get register_nama_field() {
        return browser.capabilities.platformName === "Android"
            ? $(
                  `android=new UiSelector().className("android.widget.EditText").instance(0)`
              )
            : $(
                  `-ios class chain:**/XCUIElementTypeTextField[\`name == "Nama"\`]`
              );
    }
    get register_phone_number_field() {
        return browser.capabilities.platformName === "Android"
            ? $(
                  `android=new UiSelector().className("android.widget.EditText").instance(1)`
              )
            : $(
                  `-ios class chain:**/XCUIElementTypeTextField[\`name == "contoh: 81234567890"\`]`
              );
    }
    get register_email_field() {
        return browser.capabilities.platformName === "Android"
            ? $(
                  `android=new UiSelector().className("android.widget.EditText").instance(2)`
              )
            : $(
                  `-ios class chain:**/XCUIElementTypeTextField[\`name == "yourname@mail.com"\`]`
              );
    }
    get register_referral_field() {
        return browser.capabilities.platformName === "Android"
            ? $(
                  `android=new UiSelector().className("android.widget.EditText").instance(3)`
              )
            : $(
                  `-ios class chain:**/XCUIElementTypeTextField[\`name == "Masukkan kode referral dari teman"\`]`
              );
    }
    get register_tnc_checkbox() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().className("android.widget.CheckBox")`)
            : $(`-ios class chain:**/XCUIElementTypeSwitch[\`value == "0"\`]`);
    }
    get register_kirimkan_kode_otp_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Kirimkan Kode OTP")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Kirimkan Kode OTP"\`]`
              );
    }
}

/**
 * Class containing validation methods
 */
class RegisterValidation extends RegisterSelectors {
    async register_tnc_checkbox_enabled() {
        return await expectHelper.toBeEnabled(
            this.register_tnc_checkbox,
            "register_tnc_checkbox"
        );
    }
    async register_kirimkan_kode_otp_button_disabled() {
        return await expectHelper.toBeDisabled(
            this.register_kirimkan_kode_otp_button,
            "register_kirimkan_kode_otp_button"
        );
    }
    async register_kirimkan_kode_otp_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.register_kirimkan_kode_otp_button,
            "register_kirimkan_kode_otp_button"
        );
    }
    async register_kirimkan_kode_otp_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.register_kirimkan_kode_otp_button,
            "register_kirimkan_kode_otp_button",
            "label",
            "content-desc",
            "Kirimkan Kode OTP"
        );
    }
}

/**
 * Class containing action methods
 */
class RegisterAction extends RegisterValidation {
    async fill_register_nama_field(user_name) {
        await elementHelper.clickSilent(this.register_nama_field);
        await elementHelper.addValue(
            this.register_nama_field,
            "register_nama_field",
            user_name,
            "Successfully fill nama field"
        );
    }
    async fill_register_phone_number_field(user_phone_number) {
        await elementHelper.clickSilent(this.register_phone_number_field);
        await elementHelper.addValue(
            this.register_phone_number_field,
            "register_phone_number_field",
            user_phone_number,
            "Successfully fill phone number field"
        );
    }
    async fill_register_email_field(user_email) {
        await elementHelper.clickSilent(this.register_email_field);
        await elementHelper.addValue(
            this.register_email_field,
            "register_email_field",
            user_email,
            "Successfully fill email field"
        );
    }
    async click_register_tnc_checkbox() {
        await elementHelper.click(
            this.register_tnc_checkbox,
            "register_tnc_checkbox",
            "Successfully check tnc checkbox"
        );
    }
    async click_register_kirimkan_kode_otp_button() {
        await elementHelper.click(
            this.register_kirimkan_kode_otp_button,
            "register_kirimkan_kode_otp_button",
            "Successfully redirected to otp form page"
        );
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Register extends RegisterAction {
    async register_kirimkan_kode_otp_button_disabled_validation() {
        await this.register_kirimkan_kode_otp_button_disabled();
        await this.register_kirimkan_kode_otp_button_wording();
    }
}

export default new Register();
