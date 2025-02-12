import elementHelper from "../helpers/wdio_element.js";
import expectHelper from "../helpers/wdio_expect.js";

/**
 * Base class containing common selectors
 */
class MainSelectors {
    get main_profile_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Profile")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeImage[\`name == "Profile"\`]`
              );
    }
}

/**
 * Class containing validation methods
 */
class MainValidation extends MainSelectors {
    async main_profile_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.main_profile_button,
            "main_profile_button"
        );
    }
    async main_profile_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.main_profile_button,
            "main_profile_button",
            "label",
            "content-desc",
            "Profile"
        );
    }
}

/**
 * Class containing action methods
 */
class MainAction extends MainValidation {
    async click_main_profile_button() {
        await elementHelper.click(
            this.main_profile_button,
            "main_profile_button",
            "Successfully redirected to profile page"
        );
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Main extends MainAction {
    async main_profile_button_validation() {
        await this.main_profile_button_enabled();
        await this.main_profile_button_wording();
    }
}

export default new Main();
