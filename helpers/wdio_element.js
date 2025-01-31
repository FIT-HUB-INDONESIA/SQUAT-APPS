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
        const errors = [];

        await element.waitForExist().catch((err) => {
            errors.push(`Element wait for exist failed: ${err.message}`);
        });

        await element.waitForEnabled().catch((err) => {
            errors.push(`Element wait for enabled failed: ${err.message}`);
        });

        await element.click().catch((err) => {
            errors.push(`Element click action failed: ${err.message}`);
        });

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }

    /**
     * Adds a value in an input field with proper waits and clearing
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @param {string} value - The value to set
     * @returns {Promise<void>}
     */
    async addValue(element, value) {
        const errors = [];

        await element.waitForExist().catch((err) => {
            errors.push(`Element wait for exist failed: ${err.message}`);
        });

        await element.waitForEnabled().catch((err) => {
            errors.push(`Element wait for enabled failed: ${err.message}`);
        });

        await element.addValue(value).catch((err) => {
            errors.push(`Element add value action failed: ${err.message}`);
        });

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }

    /**
     * NOTE: Still need to be tested
     * Validates the value of an input field using UI text
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @param {string} value - The value to validate
     * @returns {Promise<void>}
     */
    async uiValueValidation(element, value) {
        const errors = [];

        await element.waitForExist().catch((err) => {
            errors.push(`Element wait for exist failed: ${err.message}`);
        });

        try {
            const actualValue =
                browser.capabilities.platformName === "Android"
                    ? await element.getText()
                    : await element.getValue();

            if (actualValue !== value) {
                errors.push(
                    `Value validation failed: Expected "${value}" but got "${actualValue}"`
                );
            }
        } catch (err) {
            errors.push(`Value validation failed: ${err.message}`);
        }

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }
}

export default new elementHelper();
