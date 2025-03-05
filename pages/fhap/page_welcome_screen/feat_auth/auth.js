import elementHelper from "../../../../helpers/wdio_element.js";

/**
 * Base class containing common selectors
 */
class AuthSelectors {
    get auth_otp_number_field() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().className("android.widget.EditText")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeTextField`
              );
    }
    get auth_pin_off_click_number_field() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().className("android.widget.EditText")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTextField`
              );
    }
    get auth_pin_on_click_number_field() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().className("android.widget.EditText")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeSecureTextField`
              );
    }
}

/**
 * Class containing validation methods
 */
class AuthValidation extends AuthSelectors {}

/**
 * Class containing action methods
 */
class AuthAction extends AuthValidation {
    async fill_auth_otp_number_field(otp_number) {
        await elementHelper.clickSilent(this.auth_otp_number_field);
        await elementHelper.addValue(
            this.auth_otp_number_field,
            "auth_otp_number_field",
            otp_number,
            "Successfully fill otp field"
        );
    }
    async fill_auth_pin_on_click_number_field(pin_creation_number) {
        // await elementHelper.clickSilent(this.auth_pin_on_click_number_field);
        await elementHelper.addValue(
            this.auth_pin_on_click_number_field,
            "auth_pin_on_click_number_field",
            pin_creation_number,
            "Successfully fill pin creation form field"
        );
    }
    async fill_auth_pin_off_click_number_field(pin_confirmation_number) {
        await elementHelper.clickSilent(this.auth_pin_off_click_number_field);
        await elementHelper.addValue(
            this.auth_pin_on_click_number_field,
            "auth_pin_on_click_number_field",
            pin_confirmation_number,
            "Successfully create pin & redirected to profiling form page"
        );
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Auth extends AuthAction {}

export default new Auth();
