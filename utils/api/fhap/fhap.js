import axios from "axios";
import { dotenvConf } from "../../../config/dotenv.js";

/**
 * Base class containing api collections
 */
class FhapApiCollections {
    /**
     * Performs a login authentication using a passcode based on the platform (iOS or Android)
     * @param {string} user_phone_number - The phone number for authentication
     * @param {string} pin_number - The passcode for authentication
     * @returns {Promise<Object>} - The response from the login API
     */
    async post_v2_auth_login_auth_user_passcode(user_phone_number, pin_number) {
        const path_post_v2_login = dotenvConf.hostnameFhap + "/v2/auth/login";
        const platform = browser.capabilities.platformName;
        const deviceId =
            platform === "iOS"
                ? dotenvConf.deviceIdIos
                : dotenvConf.deviceIdAndroid;

        try {
            const res = await axios.post(path_post_v2_login, {
                loginType: "authenticate_user_passcode",
                phoneNumber: user_phone_number,
                passcode: pin_number,
                deviceId,
                changeDevice: false
            });

            console.log(
                `> Axios post_v2_auth_login_auth_user_passcode (${platform}): ${JSON.stringify(res.data.meta.statusCode)}`
            );

            this.authToken = res.data.data.authToken;

            return res;
        } catch (error) {
            if (error.response) {
                console.error(
                    `> Axios post_v2_auth_login_auth_user_passcode (${platform}): ${error.response.status}\nPath: ${error.config?.url}\nResponse: ${JSON.stringify(error.response.data)}`
                );
            } else {
                console.error(`Request Error: ${error.message}`);
            }
            throw error;
        }
    }

    /**
     * Logs out an authenticated user by sending a logout request.
     * This function invalidates the current authentication session.
     * @returns {Promise<Object>} - The API response confirming logout status.
     * @throws {Error} - Throws an error if the request fails.
     */
    async delete_v1_auth_logout() {
        const path_delete_v1_auth_logout =
            dotenvConf.hostnameFhap + "/v1/auth/logout";

        try {
            const res = await axios.delete(path_delete_v1_auth_logout, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }
            });

            console.log(
                `> Axios delete_v1_auth_logout: ${JSON.stringify(res.data.meta.statusCode)}`
            );

            return res;
        } catch (error) {
            if (error.response) {
                console.error(
                    `> Axios delete_v1_auth_logout: ${error.response.status}\nPath: ${error.config?.url}\nResponse: ${JSON.stringify(error.response.data)}`
                );
            } else {
                console.error(`Request Error: ${error.message}`);
            }
            throw error;
        }
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from fhapApiCollections class only
 */
class FhapApi extends FhapApiCollections {
    async perform_session_logout(user_phone_number, pin_number) {
        await this.post_v2_auth_login_auth_user_passcode(
            user_phone_number,
            pin_number
        );
        await this.delete_v1_auth_logout();
    }
}

export default new FhapApi();
