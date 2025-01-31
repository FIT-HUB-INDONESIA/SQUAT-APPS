import { browser, driver } from "@wdio/globals";

/**
 * Singleton helper class for common WebdriverIO mobile interactions
 */
class mobileHelper {
    /**
     * Performs a tap gesture based on the platform (iOS or Android)
     * @param {WebdriverIO.Element} element - The WebdriverIO element to interact with
     * @param {Object} coordinates - Coordinates object containing x,y for both platforms
     * @param {Object} coordinates.ios - iOS coordinates {x: number, y: number}
     * @param {Object} coordinates.android - Android coordinates {x: number, y: number}
     * @returns {Promise<void>}
     */
    async tap(element, coordinates) {
        const errors = [];
        const { ios, android } = coordinates;

        try {
            if (browser.capabilities.platformName === "iOS") {
                await element.waitForExist().catch((err) => {
                    errors.push(
                        `Element wait for exist failed: ${err.message}`
                    );
                });

                await element.waitForEnabled().catch((err) => {
                    errors.push(
                        `Element wait for enabled failed: ${err.message}`
                    );
                });

                await driver
                    .executeScript("mobile: tap", [
                        {
                            x: ios.x,
                            y: ios.y
                        }
                    ])
                    .catch((err) => {
                        errors.push(`iOS tap gesture failed: ${err.message}`);
                    });
            } else {
                await element.waitForExist().catch((err) => {
                    errors.push(
                        `Element wait for exist failed: ${err.message}`
                    );
                });

                await element.waitForEnabled().catch((err) => {
                    errors.push(
                        `Element wait for enabled failed: ${err.message}`
                    );
                });

                await driver
                    .executeScript("mobile: clickGesture", [
                        {
                            x: android.x,
                            y: android.y
                        }
                    ])
                    .catch((err) => {
                        errors.push(
                            `Android click gesture failed: ${err.message}`
                        );
                    });
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
