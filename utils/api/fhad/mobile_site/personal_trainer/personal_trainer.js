import DateConverter from "../../../../../helpers/date_time_converter";
import Logger from "../../../../../helpers/qmetry_logger";
import allureReporter from "@wdio/allure-reporter";
import axios from "axios";
import { dotenvConf } from "../../../../../config/dotenv";

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
    async post_v2_trainer_schedules(token, type_id, started_at, finished_at) {
        const post_v2_trainer_schedules =
            dotenvConf.hostnameFhad + "/v2/trainer-schedules";

        let status = "passed";

        try {
            const startedAt =
                DateConverter.humanReadableToEpoch(started_at) / 1000;
            const finishedAt =
                DateConverter.humanReadableToEpoch(finished_at) / 1000;

            const requestBody = {
                type_id: type_id,
                started_at: startedAt,
                finished_at: finishedAt,
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
                `\nHit API POST: ${post_v2_trainer_schedules}\nRequest: ${JSON.stringify(requestBody, null, 2)}\nResponse: ${JSON.stringify(res.data, null, 2)}`
            );

            const step = `Hit API POST ${post_v2_trainer_schedules}`;
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

    /**
     * Fetches clubs from the v2 API with is_all=false.
     * @async
     * @param {string} token - The authorization token for API access.
     * @returns {Promise<Object[]>} A list of clubs.
     * @throws {Error} Throws an error if the request fails.
     */
    async get_v2_clubs(token) {
        const get_v2_clubs =
            dotenvConf.hostnameFhad + "/v2/clubs?sort_by=display_name";

        let status = "passed";

        try {
            const res = await axios.get(get_v2_clubs, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const apiData = res.data?.data || [];
            const displayNameToIdMap = apiData.reduce((map, item) => {
                map[item.display_name] = item.id;

                return map;
            }, {});

            console.log(
                `\nHit API GET: ${get_v2_clubs}\nResponse: ${JSON.stringify(res.data, null, 2)}`
            );

            const step = `Hit API GET ${get_v2_clubs}`;
            const expected = `Successfully hit API get_v2_clubs`;

            allureReporter.addStep(step, [{}], status);
            logger.log(step, expected);

            return displayNameToIdMap;
        } catch (error) {
            status = "failed";

            allureReporter.addStep(
                `Failed to hit API ${get_v2_clubs}`,
                [{}],
                status
            );
            console.error(`Request Error: ${error.message}`);

            if (error.response) {
                console.error(
                    `> Axios get_v2_clubs: ${error.response.status}\nPath: ${error.config?.url}\nResponse: ${JSON.stringify(error.response.data, null, 2)}`
                );
            }

            throw new Error(
                `Failed to hit API ${get_v2_clubs}: ${error.message}`
            );
        }
    }

    /**
     * Fetches clients from the v2 API.
     * @async
     * @param {string} token - The authorization token for API access.
     * @param {string} pt_id - The personal trainer ID.
     * @returns {Promise<Object[]>} A list of clients.
     * @throws {Error} Throws an error if the request fails.
     */
    async get_v2_clients(token, pt_id) {
        const get_v2_clients =
            dotenvConf.hostnameFhad + `/v2/mobile-site/pt/${pt_id}/clients`;

        let status = "passed";

        try {
            const res = await axios.get(get_v2_clients, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const apiData = res.data?.data || [];
            const phoneToUidMap = apiData.reduce((map, item) => {
                map[item.phone] = item.id;

                return map;
            }, {});

            console.log(
                `\nHit API GET: ${get_v2_clients}\nResponse: ${JSON.stringify(res.data, null, 2)}`
            );

            const step = `Hit API GET ${get_v2_clients}`;
            const expected = `Successfully hit API get_v2_clients`;

            allureReporter.addStep(step, [{}], status);
            logger.log(step, expected);

            return phoneToUidMap;
        } catch (error) {
            status = "failed";

            allureReporter.addStep(
                `Failed to hit API ${get_v2_clients}`,
                [{}],
                status
            );
            console.error(`Request Error: ${error.message}`);

            if (error.response) {
                console.error(
                    `> Axios get_v2_clients: ${error.response.status}\nPath: ${error.config?.url}\nResponse: ${JSON.stringify(error.response.data, null, 2)}`
                );
            }

            throw new Error(
                `Failed to hit API ${get_v2_clients}: ${error.message}`
            );
        }
    }

    /**
     * Fetches active packages for a client from the v2 API.
     * @async
     * @param {string} token - The authorization token for API access.
     * @param {string} pt_id - The personal trainer ID.
     * @param {string} client_id - The client ID.
     * @returns {Promise<Object[]>} A list of active packages.
     * @throws {Error} Throws an error if the request fails.
     */
    async get_v2_active_packages(token, pt_id, client_id) {
        const get_v2_active_packages =
            dotenvConf.hostnameFhad +
            `/v2/mobile-site/pt/${pt_id}/clients/${client_id}/active-packages`;

        let status = "passed";

        try {
            const res = await axios.get(get_v2_active_packages, {
                headers: { Authorization: `Bearer ${token}` }
            });

            this.user_pt_membership_id = res.data?.data?.[0]?.id;

            console.log(
                `\nHit API GET: ${get_v2_active_packages}\nResponse: ${JSON.stringify(res.data, null, 2)}`
            );

            const step = `Hit API GET ${get_v2_active_packages}`;
            const expected = `Successfully hit API get_v2_active_packages`;

            allureReporter.addStep(step, [{}], status);
            logger.log(step, expected);

            return res;
        } catch (error) {
            status = "failed";

            allureReporter.addStep(
                `Failed to hit API ${get_v2_active_packages}`,
                [{}],
                status
            );
            console.error(`Request Error: ${error.message}`);

            if (error.response) {
                console.error(
                    `> Axios get_v2_active_packages: ${error.response.status}\nPath: ${error.config?.url}\nResponse: ${JSON.stringify(error.response.data, null, 2)}`
                );
            }

            throw new Error(
                `Failed to hit API ${get_v2_active_packages}: ${error.message}`
            );
        }
    }

    /**
     * Creates a new client schedule for a personal trainer
     * @async
     * @param {string} token - The authorization token.
     * @param {string} club_id - The club ID.
     * @param {string} pt_id - The personal trainer's ID.
     * @param {string} remarks - Additional remarks.
     * @param {string} schedule_at - The scheduled date-time in ISO format.
     * @param {string} user_id - The user ID.
     * @param {string} user_pt_membership_id - The user PT membership ID.
     * @returns {Promise<Object>} Response from API.
     * @throws {Error} Throws an error if the request fails.
     */
    async post_v2_client_schedules(
        token,
        club_id,
        pt_id,
        schedule_at,
        user_id,
        user_pt_membership_id
    ) {
        const url =
            dotenvConf.hostnameFhad + "/v2/mobile-site/pt/client-schedules";

        let status = "passed";

        try {
            const requestBody = {
                club_id: club_id,
                pt: pt_id,
                remarks: `QA BE Automation Test`,
                schedule_at: DateConverter.convertToUTC(schedule_at),
                user_id: user_id,
                user_pt_membership_id: user_pt_membership_id
            };

            const res = await axios.post(url, requestBody, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(
                `\nHit API POST: ${url}\nRequest: ${JSON.stringify(requestBody, null, 2)}\nResponse: ${JSON.stringify(res.data, null, 2)}`
            );

            const step = `Hit API POST ${url}`;
            const expected = `Successfully hit API post_v2_client_schedules`;

            allureReporter.addStep(step, [{}], status);
            logger.log(step, expected);

            return res.data;
        } catch (error) {
            status = "failed";

            allureReporter.addStep(`Failed to hit API ${url}`, [{}], status);
            console.error(`Request Error: ${error.message}`);

            if (error.response) {
                console.error(
                    `> Axios post_v2_client_schedules: ${error.response.status}\nPath: ${error.config?.url}\nResponse: ${JSON.stringify(error.response.data, null, 2)}`
                );
            }

            throw new Error(`Failed to hit API ${url}: ${error.message}`);
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

    /**
     * Maps location name to its ID.
     * @async
     * @param {string} token - The authorization token.
     * @param {string} location_name - The location name.
     * @returns {Promise<number>} The location ID corresponding to the name.
     * @throws {Error} Throws an error if the location name is not found.
     */
    async map_get_v2_clubs(token, club_name) {
        const clubMap = await this.get_v2_clubs(token);
        const club_id = clubMap[club_name];

        if (!club_id) {
            throw new Error(`Club "${club_name}" not found in API response.`);
        }

        return club_id;
    }

    /**
     * Retrieves the user ID of a client based on their phone number from the v2 clients map.
     * @param {string} token - The authentication token required for API access.
     * @param {string} pt_id - The partner ID associated with the request.
     * @param {string} phone - The phone number of the client to look up.
     * @returns {Promise<string>} The user ID associated with the provided phone number.
     * @throws {Error} If the client with the specified phone number is not found in the API response.
     */
    async map_get_v2_clients(token, pt_id, phone) {
        const clientMap = await this.get_v2_clients(token, pt_id);
        const user_id = clientMap[phone];

        if (!user_id) {
            throw new Error(
                `Client with phone number "${phone}" not found in API response.`
            );
        }

        return user_id;
    }
}

export default new PersonalTrainerApi();
