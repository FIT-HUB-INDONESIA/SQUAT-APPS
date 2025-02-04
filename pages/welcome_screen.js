import elementHelper from "../helpers/wdio_element.js";

/**
 * Page object class for the welcome screen page
 */
class WelcomeScreen {
    /**
     * Define selectors using getter methods
     */
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

    /**
     * Method to encapsulate enter the register page
     * @returns {Promise<void>}
     */
    async goto_register_page() {
        await elementHelper.click(
            this.welcome_screen_buat_akun_button,
            "welcome_screen_buat_akun_button"
        );
    }

    /**
     * Method to encapsulate enter the login page
     * @returns {Promise<void>}
     */
    async goto_login_page() {
        await elementHelper.click(
            this.welcome_screen_masuk_button,
            "welcome_screen_masuk_button"
        );
    }

    /**
     * Method to encapsulate skip the welcome screen
     * @returns {Promise<void>}
     */
    async skip_welcome_screen() {
        await elementHelper.click(
            this.welcome_screen_lewati_button,
            "welcome_screen_lewati_button"
        );
    }
}

export default new WelcomeScreen();
