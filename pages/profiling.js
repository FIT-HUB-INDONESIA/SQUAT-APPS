import elementHelper from "../helpers/wdio_element.js";
import mobileHelper from "../helpers/wdio_mobile.js";
/**
 * Page object class for the profiling page
 */
class Profiling {
    /**
     * Define selectors using getter methods
     */
    get profiling_mulai_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Mulai")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Mulai"\`]`
              );
    }
    get profiling_lewati_dulu_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Lewati Dulu")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Lewati Dulu"\`]`
              );
    }
    get profiling_laki_laki_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Laki-laki")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Laki-laki"\`]`
              );
    }
    get profiling_perempuan_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Perempuan")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Perempuan"\`]`
              );
    }
    get profiling_kembali_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Kembali")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Kembali"\`]`
              );
    }
    get profiling_ya_lewati_button() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Ya, Lewati")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Ya, Lewati"\`]`
              );
    }

    /**
     * Method to encapsulate click profiling mulai button
     * @returns {Promise<void>}
     */
    async click_profiling_mulai_button() {
        await elementHelper.click(
            this.profiling_mulai_button,
            "profiling_mulai_button"
        );
    }

    /**
     * Method to encapsulate click profiling lewati dulu button
     * @returns {Promise<void>}
     */
    async click_profiling_lewati_dulu_button() {
        //NOTE - Temporary disabled, because blocked by chucker logo
        // await elementHelper.click(this.profiling_lewati_dulu_button);

        await mobileHelper.tap(
            this.profiling_lewati_dulu_button,
            "profiling_lewati_dulu_button",
            {
                ios: { x: 374, y: 76 },
                android: { x: 1028, y: 160 }
            }
        );
    }

    /**
     * Method to encapsulate click profiling kembali button
     * @returns {Promise<void>}
     */
    async click_profiling_kembali_button() {
        await elementHelper.click(
            this.profiling_kembali_button,
            "profiling_kembali_button"
        );
    }

    /**
     * Method to encapsulate click profiling ya lewati button
     * @returns {Promise<void>}
     */
    async click_profiling_ya_lewati_button() {
        await elementHelper.click(
            this.profiling_ya_lewati_button,
            "profiling_ya_lewati_button"
        );
    }

    /**
     * Method to encapsulate click profiling laki laki button
     * @returns {Promise<void>}
     */
    async click_profiling_laki_laki_button() {
        await elementHelper.click(
            this.profiling_laki_laki_button,
            "profiling_laki_laki_button"
        );
    }

    /**
     * Method to encapsulate click profiling perempuan button
     * @returns {Promise<void>}
     */
    async click_profiling_perempuan_button() {
        await elementHelper.click(
            this.profiling_perempuan_button,
            "profiling_perempuan_button"
        );
    }
}

export default new Profiling();
