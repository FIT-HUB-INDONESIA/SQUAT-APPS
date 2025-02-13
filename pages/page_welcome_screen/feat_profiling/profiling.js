import elementHelper from "../../../helpers/wdio_element.js";
import expectHelper from "../../../helpers/wdio_expect.js";
import mobileHelper from "../../../helpers/wdio_mobile.js";

/**
 * Base class containing common selectors
 */
class ProfilingSelectors {
    get profiling_lewati_dulu_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Lewati Dulu")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Lewati Dulu"\`]`
              );
    }
    get profiling_ya_lewati_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Ya, Lewati")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Ya, Lewati"\`]`
              );
    }
}

/**
 * Class containing validation methods
 */
class ProfilingValidation extends ProfilingSelectors {
    async profiling_lewati_dulu_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.profiling_lewati_dulu_button,
            "profiling_lewati_dulu_button"
        );
    }
    async profiling_lewati_dulu_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.profiling_lewati_dulu_button,
            "profiling_lewati_dulu_button",
            "label",
            "content-desc",
            "Lewati Dulu"
        );
    }
    async profiling_ya_lewati_button_enabled() {
        return await expectHelper.toBeEnabled(
            this.profiling_ya_lewati_button,
            "profiling_ya_lewati_button"
        );
    }
    async profiling_ya_lewati_button_wording() {
        return await expectHelper.toHaveAttribute(
            this.profiling_ya_lewati_button,
            "profiling_ya_lewati_button",
            "label",
            "content-desc",
            "Ya, Lewati"
        );
    }
}

/**
 * Class containing action methods
 */
class ProfilingAction extends ProfilingValidation {
    async click_profiling_lewati_dulu_button() {
        await mobileHelper.tap(
            this.profiling_lewati_dulu_button,
            "profiling_lewati_dulu_button",
            { ios: { x: 374, y: 76 }, android: { x: 1028, y: 160 } },
            "Skip profiling confirmation bottom sheet is shown"
        );
    }
    async click_profiling_ya_lewati_button() {
        await elementHelper.click(
            this.profiling_ya_lewati_button,
            "profiling_ya_lewati_button",
            "Successfully redirected to home page"
        );
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Profiling extends ProfilingAction {
    async profiling_lewati_dulu_button_validation() {
        await this.profiling_lewati_dulu_button_enabled();
        await this.profiling_lewati_dulu_button_wording();
    }
    async profiling_ya_lewati_button_validation() {
        await this.profiling_ya_lewati_button_enabled();
        await this.profiling_ya_lewati_button_wording();
    }
    async complete_profiling_validation() {
        return await this.profiling_lewati_dulu_button.isDisplayed();
    }
}

export default new Profiling();
