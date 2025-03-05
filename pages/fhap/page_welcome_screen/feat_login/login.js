import elementHelper from "../../../../helpers/wdio_element";
import expectHelper from "../../../../helpers/wdio_expect";
import mobileHelper from "../../../../helpers/wdio_mobile";

/**
 * Base class containing common selectors
 */
class LoginSelectors {
    get login_lanjutkan_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Lanjutkan")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Lanjutkan"\`]`
              );
    }
    get login_ya_lanjut_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Ya, Lanjut")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Ya, Lanjut"\`]`
              );
    }
}

/**
 * Class containing validation methods
 */
class LoginValidation extends LoginSelectors {
    async login_lanjutkan_button_disabled() {
        return await expectHelper.toBeDisabled(
            this.login_lanjutkan_button,
            "login_lanjutkan_button"
        );
    }
    async login_lanjutkan_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.login_lanjutkan_button,
            "login_lanjutkan_button"
        );
    }
    async login_lanjutkan_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.login_lanjutkan_button,
            "login_lanjutkan_button",
            "label",
            "content-desc",
            "Lanjutkan"
        );
    }
    async login_ya_lanjut_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.login_ya_lanjut_button,
            "login_ya_lanjut_button"
        );
    }
    async login_ya_lanjut_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.login_ya_lanjut_button,
            "login_ya_lanjut_button",
            "label",
            "content-desc",
            "Ya, Lanjut"
        );
    }
}

/**
 * Class containing action methods
 */
class LoginAction extends LoginValidation {
    async click_login_lanjutkan_button() {
        await elementHelper.click(
            this.login_lanjutkan_button,
            "login_lanjutkan_button",
            "Successfully redirected to otp form page or showing login confirmation on new device bottom sheet"
        );
    }
    async click_login_ya_lanjut_button() {
        await elementHelper.click(
            this.login_ya_lanjut_button,
            "login_ya_lanjut_button",
            "Successfully redirected to otp form page"
        );
    }
    async fill_login_user_phone_number_field(user_phone_number) {
        await mobileHelper.tapSilent({
            ios: { x: 228, y: 219 },
            android: { x: 623, y: 549 }
        });
        await mobileHelper.keys(
            null,
            user_phone_number,
            "login_user_phone_number_field",
            "Successfully fill phone number field"
        );
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Login extends LoginAction {
    async login_lanjutkan_button_disabled_validation() {
        await this.login_lanjutkan_button_disabled();
        await this.login_lanjutkan_button_wording();
    }
    async login_lanjutkan_button_enabled_validation() {
        await this.login_lanjutkan_button_enabled();
        await this.login_lanjutkan_button_wording();
    }
    async login_ya_lanjut_button_validation() {
        await this.login_ya_lanjut_button_enabled();
        await this.login_ya_lanjut_button_wording();
    }
    async login_on_new_device_validation() {
        await browser.pause(1000);

        return await this.login_ya_lanjut_button.isDisplayed();
    }
}

export default new Login();
