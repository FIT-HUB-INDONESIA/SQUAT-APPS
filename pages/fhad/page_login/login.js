import elementHelper from "../../../helpers/wdio_element";
import expectHelper from "../../../helpers/wdio_expect";
import mobileHelper from "../../../helpers/wdio_mobile";

/**
 * Base class containing common selectors
 */
class LoginSelectors {
    get login_email_field() {
        return $('//input[@data-testid="login_email-textfield"]');
    }
    get login_password_field() {
        return $('//input[@data-testid="login_password-textfield"]');
    }
    get login_sign_in_button() {
        return $('//button[@data-testid="login_signin-button"]');
    }
    get chrome_google_password_manager_ok_button() {
        return driver.capabilities.platformName === "Android"
            ? $(
                  `android=new UiSelector().resourceId("com.android.chrome:id/positive_button")`
              )
            : null;
    }
}

/**
 * Class containing validation methods
 */
class LoginValidation extends LoginSelectors {
    async toBeDisplayed_login_sign_in_button() {
        await expectHelper.toBeDisplayed(
            this.login_sign_in_button,
            `login_sign_in_button`
        );
    }
}

/**
 * Class containing action methods
 */
class LoginAction extends LoginValidation {
    async addValue_login_email_field(user_email) {
        await elementHelper.addValue(
            this.login_email_field,
            `login_email_field`,
            user_email,
            `Successfully fill email field`
        );
    }
    async addValue_login_password_field(user_password) {
        await elementHelper.addValue(
            this.login_password_field,
            `login_password_field`,
            user_password,
            `Successfully fill password field`
        );
    }
    async click_login_sign_in_button() {
        await elementHelper.click(
            this.login_sign_in_button,
            `login_sign_in_button`,
            `Successfully login and redirected to dashboard page`
        );
    }
    async click_chrome_google_password_manager_ok_button() {
        await elementHelper.click(
            this.chrome_google_password_manager_ok_button,
            `chrome_google_password_manager_ok_button`,
            `Successfully skip google password manager recommendation`
        );
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Login extends LoginAction {
    async skip_google_password_manager_popup() {
        try {
            if (driver.capabilities.platformName === "Android") {
                await mobileHelper.switchContext("NATIVE_APP");
                await browser.pause(5000);

                if (
                    await this.chrome_google_password_manager_ok_button?.isExisting()
                ) {
                    await this.click_chrome_google_password_manager_ok_button();
                }
            } else {
                return false;
            }
        } catch {
            return false;
        } finally {
            if (driver.capabilities.platformName === "Android") {
                await mobileHelper.switchContext("CHROMIUM");
            }
        }
    }
}

export default new Login();
