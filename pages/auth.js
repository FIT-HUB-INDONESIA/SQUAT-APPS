import elementHelper from "../helpers/wdio_element.js";

/**
 * Page object class for the authentication page
 */
class Auth {
    /**
     * Define selectors using getter methods
     */
    get otp_number_field() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().className("android.widget.EditText")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeTextField`
              );
    }
    get otp_lanjutkan_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Lanjutkan")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Lanjutkan"\`]`
              );
    }
    get pin_off_click_number_field() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().className("android.widget.EditText")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTextField`
              );
    }
    get pin_on_click_number_field() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().className("android.widget.EditText")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeSecureTextField`
              );
    }

    /**
     * Method to encapsulate fill otp number field
     * @param {string} otp_number - The otp number
     * @returns {Promise<void>}
     */
    async fill_otp_number_field(otp_number) {
        await elementHelper.click(this.otp_number_field);
        await elementHelper.addValue(this.otp_number_field, otp_number);
    }

    /**
     * Method to encapsulate fill pin creation number field
     * @param {string} pin_creation_number - The pin creation number
     * @returns {Promise<void>}
     */
    async fill_pin_creation_number_field(pin_creation_number) {
        await elementHelper.addValue(
            this.pin_on_click_number_field,
            pin_creation_number
        );
    }

    /**
     * Method to encapsulate fill pin confirmation number field
     * @param {string} pin_confirmation_number - The pin confirmation number
     * @returns {Promise<void>}
     */
    async fill_pin_confirmation_number_field(pin_confirmation_number) {
        await elementHelper.click(this.pin_off_click_number_field);
        await elementHelper.addValue(
            this.pin_on_click_number_field,
            pin_confirmation_number
        );
    }
}

export default new Auth();
