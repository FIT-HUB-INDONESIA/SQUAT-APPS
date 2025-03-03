import Logger from "../../../../helpers/qmetry_logger";
import allureReporter from "@wdio/allure-reporter";
import axios from "axios";
import { dotenvConf } from "../../../../config/dotenv";

const logger = new Logger();

/**
 * Base class containing API collections
 */
class PersonalTrainerApiCollections {
    /**
     * Fetches the trainer schedule types from the v2 API.
     * @async
     * @param {string} token - The authorization token for API access.
     * @returns {Promise<Object>} A mapping of schedule type names to IDs.
     * @throws {Error} Throws an error if the request fails.
     */
    async get_v2_trainer_schedule_types(token) {
        const get_v2_trainer_schedule_types =
            dotenvConf.hostnameFhad + "/v2/trainer-schedule-types";

        let status = "passed";

        try {
            const res = await axios.get(get_v2_trainer_schedule_types, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const apiData = res.data?.data || [];
            const nameToIdMap = apiData.reduce((map, item) => {
                map[item.name] = item.id;

                return map;
            }, {});

            console.log(
                `\nHit API GET: ${get_v2_trainer_schedule_types}\nResponse: ${JSON.stringify(res.data, null, 2)}`
            );

            const step = `Hit API GET ${get_v2_trainer_schedule_types}`;
            const expected = `Successfully hit API get_v2_trainer_schedule_types`;

            allureReporter.addStep(step, [{}], status);
            logger.log(step, expected);

            return nameToIdMap;
        } catch (error) {
            status = "failed";

            allureReporter.addStep(
                `Failed to hit API ${get_v2_trainer_schedule_types}`,
                [{}],
                status
            );
            console.error(`Request Error: ${error.message}`);

            if (error.response) {
                console.error(
                    `> Axios get_v2_trainer_schedule_types: ${error.response.status}\nPath: ${error.config?.get_v2_trainer_schedule_types}\nResponse: ${JSON.stringify(error.response.data, null, 2)}`
                );
            }

            throw new Error(
                `Failed to hit API ${get_v2_trainer_schedule_types}: ${error.message}`
            );
        }
    }

    /**
     * Creates a new trainer schedule
     * @async
     * @param {string} token - The authorization token.
     * @param {number} type_id - The schedule type ID.
     * @returns {Promise<Object>} Response from API.
     * @throws {Error} Throws an error if the request fails.
     */
    async post_v2_trainer_schedules(token, type_id) {
        const post_v2_trainer_schedules =
            dotenvConf.hostnameFhad + "/v2/trainer-schedules";

        let status = "passed";

        try {
            const requestBody = {
                type_id,
                started_at: 1740560848,
                finished_at: 1740564448,
                remarks: `QA BE Automation Test. Type ID: ${type_id}`
            };

            const res = await axios.post(
                post_v2_trainer_schedules,
                requestBody,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log(
                `\nHit API POST: ${post_v2_trainer_schedules}\nResponse: ${JSON.stringify(res.data, null, 2)}`
            );

            const step = `Hit API POST ${post_v2_trainer_schedules}. Type ID: ${type_id}`;
            const expected = `Successfully hit API post_v2_trainer_schedules`;

            allureReporter.addStep(step, [{}], status);
            logger.log(step, expected);

            return res.data;
        } catch (error) {
            status = "failed";

            allureReporter.addStep(
                `Failed to hit API ${post_v2_trainer_schedules}`,
                [{}],
                status
            );
            console.error(`Request Error: ${error.message}`);

            if (error.response) {
                console.error(
                    `> Axios post_v2_trainer_schedules: ${error.response.status}\nPath: ${error.config?.post_v2_trainer_schedules}\nResponse: ${JSON.stringify(error.response.data, null, 2)}`
                );
            }

            throw new Error(
                `Failed to hit API ${post_v2_trainer_schedules}: ${error.message}`
            );
        }
    }
}

/**
 * Class containing use case methods.
 * Uses methods from PersonalTrainerApiCollections.
 */
class PersonalTrainerApi extends PersonalTrainerApiCollections {
    /**
     * Maps schedule type name to its ID
     * @async
     * @param {string} token - The authorization token.
     * @param {string} type_name - The schedule type name.
     * @returns {Promise<number>} The type ID corresponding to the name.
     * @throws {Error} Throws an error if the type name is not found.
     */
    async map_get_v2_trainer_schedule_types(token, type_name) {
        const scheduleTypeMap = await this.get_v2_trainer_schedule_types(token);
        const type_id = scheduleTypeMap[type_name];

        if (!type_id) {
            throw new Error(
                `Schedule type "${type_name}" not found in API response.`
            );
        }

        return type_id;
    }
}

export default new PersonalTrainerApi();
