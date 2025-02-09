import elementHelper from "../../helpers/wdio_element.js";
import expectHelper from "../../helpers/wdio_expect.js";

/**
 * Base class containing common selectors
 */
class WelcomeScreenSelectors {
    get welcome_screen_buat_akun_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Buat Akun")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Buat Akun"\`]`
              );
    }
    get welcome_screen_masuk_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Masuk")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Masuk"\`]`
              );
    }
    get welcome_screen_lewati_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Lewati")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Lewati"\`]`
              );
    }
}

/**
 * Class containing validation methods
 */
class WelcomeScreenValidation extends WelcomeScreenSelectors {
    async welcome_screen_buat_akun_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.welcome_screen_buat_akun_button,
            "welcome_screen_buat_akun_button"
        );
    }
    async welcome_screen_buat_akun_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.welcome_screen_buat_akun_button,
            "welcome_screen_buat_akun_button",
            "label",
            "content-desc",
            "Buat Akun"
        );
    }
    async welcome_screen_masuk_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.welcome_screen_masuk_button,
            "welcome_screen_masuk_button"
        );
    }
    async welcome_screen_masuk_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.welcome_screen_masuk_button,
            "welcome_screen_masuk_button",
            "label",
            "content-desc",
            "Masuk"
        );
    }
    async welcome_screen_lewati_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.welcome_screen_lewati_button,
            "welcome_screen_lewati_button"
        );
    }
    async welcome_screen_lewati_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.welcome_screen_lewati_button,
            "welcome_screen_lewati_button",
            "label",
            "content-desc",
            "Lewati"
        );
    }
}

/**
 * Class containing action methods
 */
class WelcomeScreenAction extends WelcomeScreenValidation {
    async click_welcome_screen_buat_akun_button() {
        await elementHelper.click(
            this.welcome_screen_buat_akun_button,
            "welcome_screen_buat_akun_button",
            "Successfully redirected to register form page"
        );
    }
    async click_welcome_screen_masuk_button() {
        await elementHelper.click(
            this.welcome_screen_masuk_button,
            "welcome_screen_masuk_button",
            "Successfully redirected to login page"
        );
    }
    async click_welcome_screen_lewati_button() {
        await elementHelper.click(
            this.welcome_screen_lewati_button,
            "welcome_screen_lewati_button",
            "Successfully redirected to home page"
        );
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class WelcomeScreen extends WelcomeScreenAction {
    async welcome_screen_buat_akun_button_validation() {
        await this.welcome_screen_buat_akun_button_enabled();
        await this.welcome_screen_buat_akun_button_wording();
    }
    async welcome_screen_masuk_button_validation() {
        await this.welcome_screen_masuk_button_enabled();
        await this.welcome_screen_masuk_button_wording();
    }
    async welcome_screen_lewati_button_validation() {
        await this.welcome_screen_lewati_button_enabled();
        await this.welcome_screen_lewati_button_wording();
    }
}

export default new WelcomeScreen();
