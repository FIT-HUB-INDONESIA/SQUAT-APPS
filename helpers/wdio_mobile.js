import { browser, driver } from "@wdio/globals";
import { Key } from "webdriverio";
import Logger from "./qmetry_logger.js";
import allureReporter from "@wdio/allure-reporter";
import elementHelper from "./wdio_element";

const logger = new Logger();

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
     * @param {string} expectedResult - The expected result of the action
     * @returns {Promise<void>}
     */
    async tap(element, elementName, coordinates, expectedResult) {
        const errors = [];
        const { ios, android } = coordinates;

        console.log(`Action tap: ${elementName}`);

        let status = "passed";

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
                    const step = `Tap ${elementName}`;
                    const expected = `${expectedResult}`;

                    allureReporter.addStep(`Tap ${elementName}`, [{}], status);

                    logger.log(step, expected);

                    return true;
                } catch (err) {
                    status = "failed";
                    allureReporter.addStep(
                        `Failed to tap ${elementName}`,
                        [{}],
                        status
                    );
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
                    const step = `Tap ${elementName}`;
                    const expected = `${expectedResult}`;

                    allureReporter.addStep(`Tap ${elementName}`, [{}], status);

                    logger.log(step, expected);

                    return true;
                } catch (err) {
                    status = "failed";

                    allureReporter.addStep(
                        `Failed to tap ${elementName}`,
                        [{}],
                        status
                    );
                    errors.push(`Android tap gesture failed: ${err.message}`);
                }
            }
        } catch (err) {
            status = "failed";

            allureReporter.addStep(
                `Failed to tap ${elementName}`,
                [{}],
                status
            );
            errors.push(`Tap action failed: ${err.message}`);
        }

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }

    /**
     * Performs a drag gesture on a mobile element.
     * Supports iOS (`mobile: dragFromToForDuration`) and Android (`mobile: dragGesture`).
     * @param {Object} coordinates - The start and end coordinates for the drag action.
     * @param {Object} coordinates.ios - The iOS-specific coordinates.
     * @param {number} coordinates.ios.startX - The starting X coordinate for iOS.
     * @param {number} coordinates.ios.startY - The starting Y coordinate for iOS.
     * @param {number} coordinates.ios.endX - The ending X coordinate for iOS.
     * @param {number} coordinates.ios.endY - The ending Y coordinate for iOS.
     * @param {Object} coordinates.android - The Android-specific coordinates.
     * @param {number} coordinates.android.startX - The starting X coordinate for Android.
     * @param {number} coordinates.android.startY - The starting Y coordinate for Android.
     * @param {number} coordinates.android.endX - The ending X coordinate for Android.
     * @param {number} coordinates.android.endY - The ending Y coordinate for Android.
     */
    async dragSilent(coordinates) {
        const errors = [];
        const { ios, android } = coordinates;

        try {
            if (browser.capabilities.platformName === "iOS") {
                try {
                    await driver.executeScript(
                        "mobile: dragFromToForDuration",
                        [
                            {
                                duration: 1.0,
                                fromX: ios.startX,
                                fromY: ios.startY,
                                toX: ios.endX,
                                toY: ios.endY
                            }
                        ]
                    );
                } catch (err) {
                    errors.push(`iOS drag gesture failed: ${err.message}`);
                }
            } else {
                try {
                    await driver.executeScript("mobile: dragGesture", [
                        {
                            speed: 2500,
                            startX: android.startX,
                            startY: android.startY,
                            endX: android.endX,
                            endY: android.endY
                        }
                    ]);
                } catch (err) {
                    errors.push(`Android drag gesture failed: ${err.message}`);
                }
            }
        } catch (err) {
            errors.push(`Drag action failed: ${err.message}`);
        }

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }

    /**
     * Simulates keyboard input with an optional modifier key and logs the action.
     * If a modifier key is provided, it presses the modifier along with the value.
     * If no modifier key is provided, it simply presses the value.
     * @param {keyof typeof Key | null} modifierKey - The name of the modifier key (e.g., "Shift", "Control", "Alt", "Command").
     * @param {string} value - The value to be sent as keyboard input.
     * @param {string} elementName - The name of the element being interacted with.
     * @param {string} expectedResult - The expected outcome of the action.
     */
    async keys(modifierKey, value, elementName, expectedResult) {
        const errors = [];

        console.log(`Action fill: ${elementName}`);

        let status = "passed";

        try {
            const actions = [];

            if (modifierKey) {
                actions.push({ type: "keyDown", value: Key[modifierKey] });
            }

            for (const char of value) {
                actions.push({ type: "keyDown", value: char });
                actions.push({ type: "keyUp", value: char });
            }

            if (modifierKey) {
                actions.push({ type: "keyUp", value: Key[modifierKey] });
            }

            await browser.performActions([
                {
                    type: "key",
                    id: "keyboard",
                    actions: actions
                }
            ]);

            const step = `Fill ${elementName} "${value}"`;
            const expected = `${expectedResult}`;

            allureReporter.addStep(step, [{}], status);
            logger.log(step, expected);

            return true;
        } catch (err) {
            status = "failed";

            const errorMsg = `Failed to fill ${elementName} "${value}": ${err.message}`;

            allureReporter.addStep(
                `Failed to fill ${elementName}`,
                [{}],
                status
            );
            errors.push(errorMsg);
        }

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }

    /**
     * Performs a tap (silent) gesture based on the platform (iOS or Android)
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @param {Object} coordinates - Coordinates object containing x,y for both platforms
     * @param {Object} coordinates.ios - iOS coordinates {x: number, y: number}
     * @param {Object} coordinates.android - Android coordinates {x: number, y: number}
     * @returns {Promise<void>}
     */
    async tapSilent(coordinates) {
        const errors = [];
        const { ios, android } = coordinates;

        try {
            if (browser.capabilities.platformName === "iOS") {
                try {
                    await driver.executeScript("mobile: tap", [
                        {
                            x: ios.x,
                            y: ios.y
                        }
                    ]);
                } catch (err) {
                    errors.push(`iOS tap gesture failed: ${err.message}`);
                }
            } else {
                try {
                    await driver.executeScript("mobile: clickGesture", [
                        {
                            x: android.x,
                            y: android.y
                        }
                    ]);
                } catch (err) {
                    errors.push(`Android tap gesture failed: ${err.message}`);
                }
            }
        } catch (err) {
            errors.push(`Tap action failed: ${err.message}`);
        }

        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
    }
}

export default new mobileHelper();
