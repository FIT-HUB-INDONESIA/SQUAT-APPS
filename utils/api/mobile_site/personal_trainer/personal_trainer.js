import Logger from "../../../../helpers/qmetry_logger";
import allureReporter from "@wdio/allure-reporter";
import axios from "axios";
import { dotenvConf } from "../../../../config/dotenv";

const logger = new Logger();

/**
 * Base class containing api collections
 */
class PersonalTrainerApiCollections {
    /**
     * Fetches the trainer schedule types from the v2 API.
     * @async
     * @param {string} token - The authorization token for API access.
     * @returns {Promise<Object>} The API response.
     * @throws {Error} Throws an error if the request fails.
     */
    async get_v2_trainer_schedule_types(token) {
        const get_v2_trainer_schedule_types =
            dotenvConf.hostnameFhad + "/v2/trainer-schedule-types";

        let status = "passed";

        try {
            const res = await axios.get(get_v2_trainer_schedule_types, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(
                `Hit API: ${get_v2_trainer_schedule_types}\nResponse: ${JSON.stringify(res.data)}`
            );

            const step = `Hit API ${get_v2_trainer_schedule_types}`;
            const expected = `Successfully hit API get_v2_trainer_schedule_types`;

            allureReporter.addStep(
                `Hit API ${get_v2_trainer_schedule_types}`,
                [{}],
                status
            );

            logger.log(step, expected);

            return res;
        } catch (error) {
            status = "failed";

            allureReporter.addStep(
                `Failed to hit API ${get_v2_trainer_schedule_types}`,
                [{}],
                status
            );

            const errorMessage = `Failed to hit API ${get_v2_trainer_schedule_types}: ${error.message}`;

            if (error.response) {
                console.error(
                    `> Axios get_v2_trainer_schedule_types: ${error.response.status}\nPath: ${error.config?.url}\nResponse: ${JSON.stringify(error.response.data)}`
                );
            } else {
                console.error(`Request Error: ${error.message}`);
            }
            throw new Error(errorMessage);
        }
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from fhapApiCollections class only
 */
class PersonalTrainerApi extends PersonalTrainerApiCollections {}

export default new PersonalTrainerApi();
