import elementHelper from "../../../helpers/wdio_element.js";
import expectHelper from "../../../helpers/wdio_expect.js";

/**
 * Base class containing common selectors
 */
class AturAkunSelectors {
    get atur_akun_keluar_akun_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Keluar akun")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeStaticText[\`name == "Keluar akun"\`]`
              );
    }
    get atur_akun_keluar_akun_confirm_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Keluar")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Keluar"\`]`
              );
    }
}

/**
 * Class containing validation methods
 */
class AturAkunValidation extends AturAkunSelectors {
    async atur_akun_keluar_akun_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.atur_akun_keluar_akun_button,
            "atur_akun_keluar_akun_button"
        );
    }
    async atur_akun_keluar_akun_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.atur_akun_keluar_akun_button,
            "atur_akun_keluar_akun_button",
            "label",
            "content-desc",
            "Keluar akun"
        );
    }
    async atur_akun_keluar_akun_confirm_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.atur_akun_keluar_akun_confirm_button,
            "atur_akun_keluar_akun_confirm_button"
        );
    }
    async atur_akun_keluar_akun_confirm_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.atur_akun_keluar_akun_confirm_button,
            "atur_akun_keluar_akun_confirm_button",
            "label",
            "content-desc",
            "Keluar"
        );
    }
}

/**
 * Class containing action methods
 */
class AturAkunAction extends AturAkunValidation {
    async click_atur_akun_keluar_akun_button() {
        await elementHelper.click(
            this.atur_akun_keluar_akun_button,
            "atur_akun_keluar_akun_button",
            "Successfully showing bottom sheet logout confirmation"
        );
    }
    async click_atur_akun_keluar_akun_confirm_button() {
        await elementHelper.click(
            this.atur_akun_keluar_akun_confirm_button,
            "atur_akun_keluar_akun_confirm_button",
            "Successfully logout"
        );
        await browser.pause(1000);
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class AturAkun extends AturAkunAction {
    async atur_akun_keluar_akun_button_validation() {
        await this.atur_akun_keluar_akun_button_enabled();
        await this.atur_akun_keluar_akun_button_wording();
    }
    async atur_akun_keluar_akun_confirm_button_validation() {
        await this.atur_akun_keluar_akun_confirm_button_enabled();
        await this.atur_akun_keluar_akun_confirm_button_wording();
    }
}

export default new AturAkun();
