import elementHelper from "../../helpers/wdio_element.js";
import expectHelper from "../../helpers/wdio_expect.js";

/**
 * Base class containing common selectors
 */
class AuthSelectors {
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
}

/**
 * Class containing validation methods
 */
class AuthValidation extends AuthSelectors {
    async otp_lanjutkan_button_disabled() {
        return await expectHelper.toBeDisabled(
            this.otp_lanjutkan_button,
            "otp_lanjutkan_button"
        );
    }
    async otp_lanjutkan_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.otp_lanjutkan_button,
            "otp_lanjutkan_button",
            "label",
            "content-desc",
            "Lanjutkan"
        );
    }
}

/**
 * Class containing action methods
 */
class AuthAction extends AuthValidation {
    async fill_otp_number_field(otp_number) {
        await elementHelper.clickSilent(this.otp_number_field);
        await elementHelper.addValue(
            this.otp_number_field,
            "otp_number_field",
            otp_number,
            "Successfully fill otp field"
        );
    }
    async fill_create_pin_on_click_number_field(
        pin_creation_and_confirmation_number
    ) {
        // await elementHelper.clickSilent(this.pin_off_click_number_field);
        await elementHelper.addValue(
            this.pin_on_click_number_field,
            "pin_on_click_number_field",
            pin_creation_and_confirmation_number,
            "Successfully fill pin creation form field"
        );
    }
    async fill_confirmation_pin_on_click_number_field(
        pin_creation_and_confirmation_number
    ) {
        await elementHelper.clickSilent(this.pin_off_click_number_field);
        await elementHelper.addValue(
            this.pin_on_click_number_field,
            "pin_on_click_number_field",
            pin_creation_and_confirmation_number,
            "Successfully create pin & redirected to profiling form page"
        );
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Auth extends AuthAction {
    async otp_lanjutkan_button_validation() {
        await this.otp_lanjutkan_button_disabled();
        await this.otp_lanjutkan_button_wording();
    }
}

export default new Auth();
