import allureReporter from "@wdio/allure-reporter";
import { driver } from "@wdio/globals";
import stripAnsi from "strip-ansi";

/**
 * Singleton helper class for common WebdriverIO expect interactions.
 * Element matchers WebdriverIO expect interactions.
 * Use this class to validate expected results only.
 */
class expectHelper {
    /**
     * Checks if an element is enabled
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @param {string} elementName - The name of the element to interact with
     * @returns {Promise<boolean>}
     */
    async toBeEnabled(element, elementName) {
        let status = "passed";

        try {
            await element.waitForExist();
            await expect(element).toBeEnabled();
            allureReporter.addStep(
                `Validation passed: ${elementName} is enabled`,
                [{}],
                status
            );

            return true;
        } catch (error) {
            const cleanMessage = stripAnsi(error.message);

            status = "failed";

            allureReporter.addAttachment(
                `Defect trace: ${elementName} is not enabled`,
                cleanMessage,
                "text/plain"
            );

            allureReporter.addStep(
                `Validation failed: ${elementName} is not enabled`,
                [{}],
                status
            );

            return false;
        }
    }

    /**
     * Checks if an element is disabled
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @param {string} elementName - The name of the element to interact with
     * @returns {Promise<boolean>}
     */
    async toBeDisabled(element, elementName) {
        let status = "passed";

        try {
            await element.waitForExist();
            await expect(element).toBeDisabled();
            allureReporter.addStep(
                `Validation passed: ${elementName} is disabled`,
                [{}],
                status
            );

            return true;
        } catch (error) {
            const cleanMessage = stripAnsi(error.message);

            status = "failed";

            allureReporter.addAttachment(
                `Defect trace: ${elementName} is not disabled`,
                cleanMessage,
                "text/plain"
            );

            allureReporter.addStep(
                `Validation failed: ${elementName} is not disabled`,
                [{}],
                status
            );

            return false;
        }
    }

    /**
     * Checks if an element has a specific attribute containing a value.
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with.
     * @param {string} elementName - The name of the element to interact with.
     * @param {string} attributeIos - The attribute to check on iOS.
     * @param {string} attributeAndroid - The attribute to check on Android.
     * @param {string} expectedValue - The expected value (or substring) within the attribute.
     * @returns {Promise<boolean>}
     */
    async toHaveAttribute(
        element,
        elementName,
        attributeIos,
        attributeAndroid,
        expectedValue
    ) {
        let attribute;
        let status = "passed";

        try {
            const { platformName } = driver.capabilities || {};

            attribute =
                platformName === "Android" ? attributeAndroid : attributeIos;

            await element.waitForExist();
            await expect(element).toHaveAttribute(attribute, expectedValue);

            allureReporter.addStep(
                `Validation passed: ${elementName} to have attribute "${attribute}" and contain "${expectedValue}"`,
                [{}],
                status
            );

            return true;
        } catch (error) {
            const cleanMessage = stripAnsi(error.message);

            status = "failed";

            allureReporter.addAttachment(
                `Defect trace: ${elementName} to have attribute "${attribute}" and not contain "${expectedValue}"`,
                cleanMessage,
                "text/plain"
            );

            allureReporter.addStep(
                `Validation failed: ${elementName} to have attribute "${attribute}" and not contain "${expectedValue}"`,
                [{}],
                status
            );

            return false;
        }
    }
}

export default new expectHelper();
