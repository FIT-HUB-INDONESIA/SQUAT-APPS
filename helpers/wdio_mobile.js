import { browser, driver } from "@wdio/globals";
import allureReporter from "@wdio/allure-reporter";
import elementHelper from "./wdio_element";
/**
 * Singleton helper class for common WebdriverIO mobile interactions
 */
class mobileHelper {
    /**
     * Performs a tap gesture based on the platform (iOS or Android)
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @param {string} elementName - The name of the element to interact with
     * @param {Object} coordinates - Coordinates object containing x,y for both platforms
     * @param {Object} coordinates.ios - iOS coordinates {x: number, y: number}
     * @param {Object} coordinates.android - Android coordinates {x: number, y: number}
     * @returns {Promise<void>}
     */
    async tap(element, elementName, coordinates) {
        const errors = [];
        const { ios, android } = coordinates;

        try {
            if (browser.capabilities.platformName === "iOS") {
                await elementHelper.waitForInteractable(element);

                try {
                    await driver.executeScript("mobile: tap", [
                        {
                            x: ios.x,
                            y: ios.y
                        }
                    ]);
                    allureReporter.addStep(`Tap ${elementName}`, {
                        status: "passed"
                    });
                } catch (err) {
                    allureReporter.addStep(`Failed to tap ${elementName}`, {
                        status: "failed",
                        error: err.toString()
                    });
                    errors.push(`iOS tap gesture failed: ${err.message}`);
                }
            } else {
                await elementHelper.waitForInteractable(element);

                try {
                    await driver.executeScript("mobile: clickGesture", [
                        {
                            x: android.x,
                            y: android.y
                        }
                    ]);
                } catch (err) {
                    allureReporter.addStep(`Failed to tap ${elementName}`, {
                        status: "failed",
                        error: err.toString()
                    });
                    errors.push(`Android tap gesture failed: ${err.message}`);
                }
            }
        } catch (err) {
            allureReporter.addStep(`Failed to tap ${elementName}`, {
                status: "failed",
                error: err.toString()
            });
            errors.push(`Tap action failed: ${err.message}`);
        }

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }
}

export default new mobileHelper();
