import elementHelper from "../../helpers/wdio_element";
import mobileHelper from "../../helpers/wdio_mobile";

/**
 * Base class containing common selectors
 */
class MainSelectors {
    get main_hide_keyboard() {
        return driver.capabilities.platformName === "iOS"
            ? $(`//XCUIElementTypeButton[@name="Done"]`)
            : null;
    }
    get main_avatar_button() {
        return $('//*[@data-testid="generic_navbar_avatar-dropdown"]');
    }
    get main_logout_button() {
        return $('//*[@class="ant-dropdown-menu-item"]');
    }
}

/**
 * Class containing validation methods
 */
class MainValidation extends MainSelectors {}

/**
 * Class containing action methods
 */
class MainAction extends MainValidation {
    async click_main_avatar_button() {
        await elementHelper.click(
            this.main_avatar_button,
            `main_avatar_button`,
            `Logout button is shown`
        );
    }
    async click_main_logout_button() {
        await elementHelper.click(
            this.main_logout_button,
            `main_logout_button`,
            `Successfully logout and redirected to login page`
        );
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Main extends MainAction {
    async hide_keyboard() {
        try {
            if (driver.capabilities.platformName === "iOS") {
                await mobileHelper.switchContext("NATIVE_APP");

                if (!(await this.main_hide_keyboard?.isDisplayed())) {
                    return false;
                }
            } else {
                const isKeyboardVisible = await driver.executeScript(
                    "mobile: isKeyboardShown",
                    []
                );

                if (!isKeyboardVisible) {
                    return false;
                }
            }

            await mobileHelper.hideKeyboard(
                driver.capabilities.platformName === "iOS"
                    ? this.main_hide_keyboard
                    : null
            );
        } catch {
            return false;
        } finally {
            if (driver.capabilities.platformName === "iOS") {
                await mobileHelper.switchContext("WEBVIEW");
            }
        }
    }
}

export default new Main();
