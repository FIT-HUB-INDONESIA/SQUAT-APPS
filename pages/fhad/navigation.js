import { browser } from "@wdio/globals";
import { dotenvConf } from "../../config/dotenv";

/**
 * Navigation class to handle all navigation-related actions
 */
class Navigation {
    /**
     * Gets the base URL based on current environment
     * @private Encapsulation or preventing outside code from calling it directly
     * @returns {string} Base URL for the current environment
     * @throws {Error} If environment URL is not configured
     */
    #get_base_url() {
        const baseUrl = dotenvConf.baseUrlFhad;

        if (!baseUrl) {
            throw new Error(
                `Dashboard URL is not defined in environment variables for ${dotenvConf.environment} environment`
            );
        }

        return baseUrl;
    }

    /**
     * Opens the Fithub dashboard URL based on environment
     * @returns {Promise<void>}
     */
    async navigate_to_fithub_dashboard() {
        try {
            const baseUrl = this.#get_base_url();

            await browser.url(baseUrl);
            await browser.pause(2000);
        } catch (error) {
            console.error("Failed to open Fithub dashboard:", error.message);
            throw error;
        }
    }
}

export default new Navigation();
