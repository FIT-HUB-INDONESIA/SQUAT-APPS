import allureReporter from "@wdio/allure-reporter";

/**
 * Singleton helper class for common WebdriverIO element interactions
 */
class elementHelper {
    /**
     * Waits for element to be interactable
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @returns {Promise<void>}
     */
    async waitForInteractable(element) {
        const errors = [];

        await element.waitForExist().catch((err) => {
            errors.push(`Element wait for exist failed: ${err.message}`);
        });

        await element.waitForEnabled().catch((err) => {
            errors.push(`Element wait for enabled failed: ${err.message}`);
        });

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }

    /**
     * Clicks an element with proper wait
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @param {string} elementName - The name of the element to interact with
     * @returns {Promise<void>}
     */
    async click(element, elementName) {
        const errors = [];

        await this.waitForInteractable(element);

        console.log(`Action click: ${elementName}`);

        try {
            await element.click();
            allureReporter.addStep(`Click ${elementName}`, {
                status: "passed"
            });
        } catch (err) {
            allureReporter.addStep(`Failed to click ${elementName}`, {
                status: "failed",
                error: err.toString()
            });
            errors.push(`Element click action failed: ${err.message}`);
        }

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }

    /**
     * Clicks (silent) an element with proper wait and without allure report
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @returns {Promise<void>}
     */
    async clickSilent(element) {
        const errors = [];

        await this.waitForInteractable(element);

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
     * @param {string} elementName - The name of the element to interact with
     * @param {string} value - The value to set
     * @returns {Promise<void>}
     */
    async addValue(element, elementName, value) {
        const errors = [];

        await this.waitForInteractable(element);

        console.log(`Action fill: ${elementName}`);

        try {
            await element.addValue(value);
            allureReporter.addStep(`Fill ${elementName}: ${value}`, {
                status: "passed"
            });
        } catch (err) {
            allureReporter.addStep(`Failed to fill ${elementName}`, {
                status: "failed",
                error: err.toString()
            });
            errors.push(`Element fill action failed`);
        }

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }
}

export default new elementHelper();
