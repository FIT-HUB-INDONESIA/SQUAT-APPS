import AuthApiCollections from "../../../../utils/api/mobile_site/authorization/auth";
import PersonalTrainerApi from "../../../../utils/api/mobile_site/personal_trainer/personal_trainer";
import allureReporter from "@wdio/allure-reporter";
import { dotenvConf } from "../../../../config/dotenv";

/**
 * Write feature name in "describe" block.
 * Write test-case title in "it" block.
 */
describe("Test", () => {
    it("Test case @api", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const type_name = "Gym Patrol";

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

        await PersonalTrainerApi.post_v2_trainer_schedules(token, type_id);
    });
});
