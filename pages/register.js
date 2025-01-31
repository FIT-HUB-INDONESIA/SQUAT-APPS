import elementHelper from "../helpers/wdio_element.js";

/**
 * Page object class for the register page
 */
class Register {
    /**
     * Define selectors using getter methods
     */
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

    /**
     * Method to encapsulate fill name field
     * @param {string} user_name - The user's name
     * @returns {Promise<void>}
     */
    async fill_name_field(user_name) {
        await elementHelper.click(this.register_nama_field);
        await elementHelper.addValue(this.register_nama_field, user_name);
    }

    /**
     * Method to encapsulate fill phone number field
     * @param {string} user_phone_number - The user's phone number
     * @returns {Promise<void>}
     */
    async fill_phone_number_field(user_phone_number) {
        await elementHelper.click(this.register_phone_number_field);
        await elementHelper.addValue(
            this.register_phone_number_field,
            user_phone_number
        );
    }

    /**
     * Method to encapsulate fill email field
     * @param {string} user_email - The user's email
     * @returns {Promise<void>}
     */
    async fill_email_field(user_email) {
        await elementHelper.click(this.register_email_field);
        await elementHelper.addValue(this.register_email_field, user_email);
    }

    /**
     * Method to encapsulate fill referral field
     * @param {string} user_referral_code - The user's referral code
     * @returns {Promise<void>}
     */
    async fill_referral_field(user_referral_code) {
        await elementHelper.click(this.register_referral_field);
        await elementHelper.addValue(
            this.register_referral_field,
            user_referral_code
        );
    }

    /**
     * Method to encapsulate click tnc checkbox
     * @returns {Promise<void>}
     */
    async click_tnc_checkbox() {
        await elementHelper.click(this.register_tnc_checkbox);
    }

    /**
     * Method to encapsulate click send otp button
     * @returns {Promise<void>}
     */
    async click_send_otp_button() {
        await elementHelper.click(this.register_kirimkan_kode_otp_button);
    }
}

export default new Register();
