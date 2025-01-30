import elementHelper from "../helpers/wdio_element.js";

/**
 * Page object class for the main page
 */
class Main {
    /**
     * Define selectors using getter methods
     */
    get main_home_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Home")`)
            : $(`-ios class chain:**/XCUIElementTypeImage[\`name == "Home"\`]`);
    }
    get main_class_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Class")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeImage[\`name == "Class"\`]`
              );
    }
    get main_join_now_button() {
        return browser.capabilities.platformName === "Android"
            ? $(
                  `android=new UiSelector().className("android.widget.ImageView").instance(17)`
              )
            : $(
                  `-ios class chain:**/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeButton`
              );
    }
    get main_trainer_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Trainer")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeImage[\`name == "Trainer"\`]`
              );
    }
    get main_profile_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Profile")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeImage[\`name == "Profile"\`]`
              );
    }

    /**
     * Method to encapsulate click main home button
     * @returns {Promise<void>}
     */
    async click_main_home_button() {
        try {
            await elementHelper.click(this.main_home_button);
        } catch (error) {
            console.error("Failed to click main home button:", error.message);
            throw error;
        }
    }

    /**
     * Method to encapsulate click main class button
     * @returns {Promise<void>}
     */
    async click_main_class_button() {
        try {
            await elementHelper.click(this.main_class_button);
        } catch (error) {
            console.error("Failed to click main class button:", error.message);
            throw error;
        }
    }

    /**
     * Method to encapsulate click main join now button
     * @returns {Promise<void>}
     */
    async click_main_join_now_button() {
        try {
            await elementHelper.click(this.main_join_now_button);
        } catch (error) {
            console.error(
                "Failed to click main join now button:",
                error.message
            );
            throw error;
        }
    }

    /**
     * Method to encapsulate click main trainer button
     * @returns {Promise<void>}
     */
    async click_main_trainer_button() {
        try {
            await elementHelper.click(this.main_trainer_button);
        } catch (error) {
            console.error(
                "Failed to click main trainer button:",
                error.message
            );
            throw error;
        }
    }

    /**
     * Method to encapsulate click main profile button
     * @returns {Promise<void>}
     */
    async click_main_profile_button() {
        try {
            await elementHelper.click(this.main_profile_button);
        } catch (error) {
            console.error(
                "Failed to click main profile button:",
                error.message
            );
            throw error;
        }
    }
}

export default new Main();
