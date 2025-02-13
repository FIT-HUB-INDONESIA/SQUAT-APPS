import Logger from "./qmetry_logger.js";
import allureReporter from "@wdio/allure-reporter";

const logger = new Logger();

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
     * @param {string} expectedResult - The expected result of the action
     * @returns {Promise<void>}
     */
    async click(element, elementName, expectedResult) {
        const errors = [];

        console.log(`Action click: ${elementName}`);

        let status = "passed";

        try {
            await this.waitForInteractable(element);

            await element.click();
            const step = `Click ${elementName}`;
            const expected = `${expectedResult}`;

            allureReporter.addStep(`Click ${elementName}`, [{}], status);

            logger.log(step, expected);

            return true;
        } catch (err) {
            status = "failed";

            allureReporter.addStep(
                `Failed to click ${elementName}`,
                [{}],
                status
            );
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
     * @param {string} expectedResult - The expected result of the action
     * @returns {Promise<void>}
     */
    async addValue(element, elementName, value, expectedResult) {
        const errors = [];

        console.log(`Action fill: ${elementName}`);

        let status = "passed";

        try {
            await this.waitForInteractable(element);

            await element.addValue(value);

            const step = `Fill ${elementName} "${value}"`;
            const expected = `${expectedResult}`;

            allureReporter.addStep(
                `Fill ${elementName}: ${value}`,
                [{}],
                status
            );

            logger.log(step, expected);

            return true;
        } catch (err) {
            status = "failed";

            allureReporter.addStep(
                `Failed to fill ${elementName}`,
                [{}],
                status
            );
            errors.push(`Element fill action failed: ${err.message}`);
        }

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }
}

export default new elementHelper();
