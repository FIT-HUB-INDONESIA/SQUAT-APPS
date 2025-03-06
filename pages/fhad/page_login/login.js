import elementHelper from "../../../helpers/wdio_element";

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
}

/**
 * Class containing validation methods
 */
class LoginValidation extends LoginSelectors {}

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
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Login extends LoginAction {}

export default new Login();
