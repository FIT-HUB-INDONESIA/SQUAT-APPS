/**
 * Singleton helper class for common WebdriverIO element interactions
 */
class elementHelper {
    /**
     * Clicks an element with proper wait
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @returns {Promise<void>}
     */
    async click(element) {
        try {
            await element.waitForExist();
            await element.waitForEnabled();
            await element.click();
        } catch (error) {
            console.error("Failed to click element:", error.message);
            throw error;
        }
    }

    /**
     * Adds a value in an input field with proper waits and clearing
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @param {string} value - The value to set
     * @returns {Promise<void>}
     */
    async addValue(element, value) {
        try {
            await element.waitForExist();
            await element.waitForEnabled();
            await element.click();
            await browser.pause(1000);
            await element.addValue(value);
        } catch (error) {
            console.error("Failed to add value:", error.message);
            throw error;
        }
    }
}

export default new elementHelper();
