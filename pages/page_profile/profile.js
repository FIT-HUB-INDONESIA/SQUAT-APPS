import elementHelper from "../../helpers/wdio_element.js";
import expectHelper from "../../helpers/wdio_expect.js";

/**
 * Base class containing common selectors
 */
class ProfileSelectors {
    get profile_atur_akun_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Atur Akun")`)
            : $(`-ios class chain:`);
    }
}

/**
 * Class containing validation methods
 */
class ProfileValidation extends ProfileSelectors {
    async profile_atur_akun_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.profile_atur_akun_button,
            "profile_atur_akun_button"
        );
    }
    async profile_atur_akun_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.profile_atur_akun_button,
            "profile_atur_akun_button",
            "label",
            "content-desc",
            "Atur Akun"
        );
    }
}

/**
 * Class containing action methods
 */
class ProfileAction extends ProfileValidation {
    async click_profile_atur_akun_button() {
        await elementHelper.click(
            this.profile_atur_akun_button,
            "profile_atur_akun_button",
            "Successfully showing atur akun options"
        );
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Profile extends ProfileAction {
    async profile_atur_akun_button_validation() {
        await this.profile_atur_akun_button_enabled();
        await this.profile_atur_akun_button_wording();
    }
}

export default new Profile();
