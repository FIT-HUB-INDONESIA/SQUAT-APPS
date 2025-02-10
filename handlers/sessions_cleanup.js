class CleanupCollections {
    /**
     * Terminates a mobile application on the specified platform.
     * @param {string} platform - The platform type, either "iOS" or "Android".
     * @param {string} appId - The application identifier (bundleId for iOS, appId for Android).
     * @returns {Promise<void>} - A promise that resolves when the app is terminated.
     */
    async terminate_app(platform, appId) {
        try {
            console.log("> Terminate app");
            if (platform === "iOS") {
                await driver.executeScript("mobile: terminateApp", [
                    {
                        bundleId: appId
                    }
                ]);
            } else if (platform === "Android") {
                await driver.executeScript("mobile: terminateApp", [
                    {
                        appId: appId
                    }
                ]);
            }
        } catch (error) {
            console.error("Error - terminate_app:", error);
            throw error;
        }
    }

    /**
     * Launches a mobile application on the specified platform.
     * @param {string} platform - The platform type, either "iOS" or "Android".
     * @param {string} appId - The application identifier (bundleId for iOS, intent for Android).
     * @returns {Promise<void>} - A promise that resolves when the app is launched.
     */
    async launch_app(platform, appId) {
        try {
            console.log("> Launch app");
            if (platform === "iOS") {
                await driver.executeScript("mobile: launchApp", [
                    {
                        bundleId: appId
                    }
                ]);
            } else if (platform === "Android") {
                await driver.executeScript("mobile: startActivity", [
                    {
                        intent: appId + "/com.thehub.apps.MainActivity"
                    }
                ]);
            }
        } catch (error) {
            console.error("Error - launch_app:", error);
            throw error;
        }
    }
}

class Cleanup extends CleanupCollections {
    async relaunch_app(platform, appId) {
        await this.terminate_app(platform, appId);
        await this.launch_app(platform, appId);
    }
}
export default new Cleanup();
