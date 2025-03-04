import AuthApiCollections from "../../../../utils/api/fhad/authorization/auth";
import PersonalTrainerApi from "../../../../utils/api/fhad/mobile_site/personal_trainer/personal_trainer";
import allureReporter from "@wdio/allure-reporter";
import { dotenvConf } from "../../../../config/dotenv";

/**
 * Write feature name in "describe" block.
 * Write test-case title in "it" block.
 */
describe("[BE] Mobile Site Create & Cancel Personal Trainer Activities", () => {
    it("Test case", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const type_name = "Gym Patrol";
        const started_at = "25-02-2025 16:07:28 GMT+07:00";
        const finished_at = "25-02-2025 17:07:28 GMT+07:00";

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        await PersonalTrainerApi.post_v2_trainer_schedules(
            token,
            type_id,
            started_at,
            finished_at
        );
    });

    it("Test case title @api", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = "FIT HUB Bendungan Hilir (Benhil)";
        const pt_id = "firapt@test.id";
        const member_phone = "+62817345958";
        const schedule_at = "2025-03-03 10:45:20 GMT+07:00";

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const user_id = await PersonalTrainerApi.map_get_v2_clients(
            token,
            pt_id,
            member_phone
        );

        const active_packages = await PersonalTrainerApi.get_v2_active_packages(
            token,
            pt_id,
            user_id
        );
        const user_pt_membership_id = active_packages.data?.data[0].id;

        await PersonalTrainerApi.post_v2_client_schedules(
            token,
            club_id,
            pt_id,
            schedule_at,
            user_id,
            user_pt_membership_id
        );
    });

    it("[BE] Should successfully create-cancel PT class activity for PT role @regression @api_pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const type_name = "Class Conduct";
        const started_at = "25-03-2025 06:00:00 GMT+07:00";
        const finished_at = "25-03-2025 07:00:00 GMT+07:00";

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        await PersonalTrainerApi.post_v2_trainer_schedules(
            token,
            type_id,
            started_at,
            finished_at
        );
    });
});
