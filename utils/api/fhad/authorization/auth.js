import Logger from "../../../../helpers/qmetry_logger";
import allureReporter from "@wdio/allure-reporter";
import axios from "axios";
import { dotenvConf } from "../../../../config/dotenv";

const logger = new Logger();

/**
 * Base class containing api collections
 */
class AuthApiCollections {
    /**
     * Authenticates the user by sending a login request to the `/v1/auth/login` endpoint.
     * @async
     * @function post_v1_auth_login
     * @returns {Promise<Object>} The response object from the login request.
     * @throws {Error} Throws an error if the request fails.
     */
    async post_v1_auth_login(email, password) {
        const post_v1_auth_login = dotenvConf.hostnameFhad + "/v1/auth/login";

        let status = "passed";

        try {
            const requestBody = {
                email: email,
                password: password
            };

            const res = await axios.post(post_v1_auth_login, requestBody);

            this.token = res.data.data.token;

            console.log(
                `Hit API POST: ${post_v1_auth_login}\nRequest: ${JSON.stringify(requestBody, null, 2)}\nToken: ${this.token}`
            );

            const step = `Hit API POST ${post_v1_auth_login}`;
            const expected = `Successfully hit API post_v1_auth_login`;

            allureReporter.addStep(step, [{}], status);

            logger.log(step, expected);

            return res;
        } catch (error) {
            status = "failed";

            allureReporter.addStep(
                `Failed to hit API ${post_v1_auth_login}`,
                [{}],
                status
            );
            console.error(
                `Failed to hit API ${post_v1_auth_login}: ${error.message}`
            );

            if (error.response) {
                console.error(
                    `> Axios post_v1_auth_login: ${error.response.status}\nPath: ${error.config?.url}\nResponse: ${JSON.stringify(error.response.data)}`
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
class AuthApi extends AuthApiCollections {}

export default new AuthApi();
