import AuthApiCollections from "../../../utils/api/fhad/authorization/auth";
import PersonalTrainerApi from "../../../utils/api/fhad/mobile_site/personal_trainer/personal_trainer";
import allureReporter from "@wdio/allure-reporter";
import { dotenvConf } from "../../../config/dotenv";

/**
 * Write feature name in "describe" block.
 * Write test-case title in "it" block.
 */
describe("BE Mobile Site Create & Cancel Non PT Session Activities", () => {
    //NOTE - Delete me
    it("Test create non PT session activity", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = "FIT HUB Bendungan Hilir (Benhil)";
        const pt_id = "firapt@test.id";
        const type_name = "Gym Patrol";
        const started_at = "25-02-2025 16:07:28 GMT+07:00";
        const finished_at = "25-02-2025 17:07:28 GMT+07:00";
        const update_started_at = "26-02-2025 17:07:28 GMT+07:00";
        const update_finished_at = "26-02-2025 18:07:28 GMT+07:00";

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        // await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
        //     token,
        //     activity_id
        // );
    });

    //NOTE - Delete me
    it("Test create PT session activity", async () => {
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

    it("Should successfully create then cancel PT class activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "PT Class";
        const started_at = dotenvConf.ptClassStartedAt;
        const finished_at = dotenvConf.ptClassFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel reassessment activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Reassessment";
        const started_at = dotenvConf.reasementStartedAt;
        const finished_at = dotenvConf.reasementFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel fitness welcome activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Fitness Welcome";
        const started_at = dotenvConf.fitnessWelcomeStartedAt;
        const finished_at = dotenvConf.fitnessWelcomeFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel gym patrol activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Gym Patrol";
        const started_at = dotenvConf.gymPatrolStartedAt;
        const finished_at = dotenvConf.gymPatrolFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel training internal activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training Internal";
        const started_at = dotenvConf.trainingInternalStartedAt;
        const finished_at = dotenvConf.trainingInternalFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel training external activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training External";
        const started_at = dotenvConf.trainingExternalStartedAt;
        const finished_at = dotenvConf.trainingExternalFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel exercise activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Exercise";
        const started_at = dotenvConf.exerciseStartedAt;
        const finished_at = dotenvConf.exerciseFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel break activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Break";
        const started_at = dotenvConf.breakStartedAt;
        const finished_at = dotenvConf.breakFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel libur (day off) activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Day Off";
        const started_at = dotenvConf.dayOffStartedAt;
        const finished_at = dotenvConf.dayOffFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel PT class activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "PT Class";
        const started_at = dotenvConf.ptClassStartedAt;
        const finished_at = dotenvConf.ptClassFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel reassessment activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Reassessment";
        const started_at = dotenvConf.reasementStartedAt;
        const finished_at = dotenvConf.reasementFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel fitness welcome activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Fitness Welcome";
        const started_at = dotenvConf.fitnessWelcomeStartedAt;
        const finished_at = dotenvConf.fitnessWelcomeFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel gym patrol activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Gym Patrol";
        const started_at = dotenvConf.gymPatrolStartedAt;
        const finished_at = dotenvConf.gymPatrolFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel training internal activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training Internal";
        const started_at = dotenvConf.trainingInternalStartedAt;
        const finished_at = dotenvConf.trainingInternalFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel training external activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training External";
        const started_at = dotenvConf.trainingExternalStartedAt;
        const finished_at = dotenvConf.trainingExternalFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel exercise activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Exercise";
        const started_at = dotenvConf.exerciseStartedAt;
        const finished_at = dotenvConf.exerciseFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel break activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Break";
        const started_at = dotenvConf.breakStartedAt;
        const finished_at = dotenvConf.breakFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel libur (day off) activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Day Off";
        const started_at = dotenvConf.dayOffStartedAt;
        const finished_at = dotenvConf.dayOffFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel PT class activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "PT Class";
        const started_at = dotenvConf.ptClassStartedAt;
        const finished_at = dotenvConf.ptClassFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel reassessment activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Reassessment";
        const started_at = dotenvConf.reasementStartedAt;
        const finished_at = dotenvConf.reasementFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel fitness welcome activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Fitness Welcome";
        const started_at = dotenvConf.fitnessWelcomeStartedAt;
        const finished_at = dotenvConf.fitnessWelcomeFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel gym patrol activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Gym Patrol";
        const started_at = dotenvConf.gymPatrolStartedAt;
        const finished_at = dotenvConf.gymPatrolFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel training internal activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training Internal";
        const started_at = dotenvConf.trainingInternalStartedAt;
        const finished_at = dotenvConf.trainingInternalFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel training external activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training External";
        const started_at = dotenvConf.trainingExternalStartedAt;
        const finished_at = dotenvConf.trainingExternalFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel exercise activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Exercise";
        const started_at = dotenvConf.exerciseStartedAt;
        const finished_at = dotenvConf.exerciseFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel break activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Break";
        const started_at = dotenvConf.breakStartedAt;
        const finished_at = dotenvConf.breakFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel libur (day off) activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Day Off";
        const started_at = dotenvConf.dayOffStartedAt;
        const finished_at = dotenvConf.dayOffFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel PT class activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "PT Class";
        const started_at = dotenvConf.ptClassStartedAt;
        const finished_at = dotenvConf.ptClassFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel reassessment activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Reassessment";
        const started_at = dotenvConf.reasementStartedAt;
        const finished_at = dotenvConf.reasementFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel fitness welcome activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Fitness Welcome";
        const started_at = dotenvConf.fitnessWelcomeStartedAt;
        const finished_at = dotenvConf.fitnessWelcomeFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel gym patrol activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Gym Patrol";
        const started_at = dotenvConf.gymPatrolStartedAt;
        const finished_at = dotenvConf.gymPatrolFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel training internal activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training Internal";
        const started_at = dotenvConf.trainingInternalStartedAt;
        const finished_at = dotenvConf.trainingInternalFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel training external activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training External";
        const started_at = dotenvConf.trainingExternalStartedAt;
        const finished_at = dotenvConf.trainingExternalFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel exercise activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Exercise";
        const started_at = dotenvConf.exerciseStartedAt;
        const finished_at = dotenvConf.exerciseFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel break activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Break";
        const started_at = dotenvConf.breakStartedAt;
        const finished_at = dotenvConf.breakFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });

    it("Should successfully create then cancel libur (day off) activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Day Off";
        const started_at = dotenvConf.dayOffStartedAt;
        const finished_at = dotenvConf.dayOffFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_cancel(
            token,
            activity_id
        );
    });
});

describe("BE Mobile Site Update & Recap Non PT Session Activities", () => {
    it("Should successfully create update then recap PT class activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "PT Class";
        const started_at = dotenvConf.ptClassStartedAt;
        const finished_at = dotenvConf.ptClassFinishedAt;
        const update_started_at = dotenvConf.ptClassUpdateStartedAt;
        const update_finished_at = dotenvConf.ptClassUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap reassessment activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Reassessment";
        const started_at = dotenvConf.reasementStartedAt;
        const finished_at = dotenvConf.reasementFinishedAt;
        const update_started_at = dotenvConf.reasementUpdateStartedAt;
        const update_finished_at = dotenvConf.reasementUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap fitness welcome activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Fitness Welcome";
        const started_at = dotenvConf.fitnessWelcomeStartedAt;
        const finished_at = dotenvConf.fitnessWelcomeFinishedAt;
        const update_started_at = dotenvConf.fitnessWelcomeUpdateStartedAt;
        const update_finished_at = dotenvConf.fitnessWelcomeUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap gym patrol activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Gym Patrol";
        const started_at = dotenvConf.gymPatrolStartedAt;
        const finished_at = dotenvConf.gymPatrolFinishedAt;
        const update_started_at = dotenvConf.gymPatrolUpdateStartedAt;
        const update_finished_at = dotenvConf.gymPatrolUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap training internal activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training Internal";
        const started_at = dotenvConf.trainingInternalStartedAt;
        const finished_at = dotenvConf.trainingInternalFinishedAt;
        const update_started_at = dotenvConf.trainingInternalUpdateStartedAt;
        const update_finished_at = dotenvConf.trainingInternalUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap training external activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training External";
        const started_at = dotenvConf.trainingExternalStartedAt;
        const finished_at = dotenvConf.trainingExternalFinishedAt;
        const update_started_at = dotenvConf.trainingExternalUpdateStartedAt;
        const update_finished_at = dotenvConf.trainingExternalUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap exercise activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Exercise";
        const started_at = dotenvConf.exerciseStartedAt;
        const finished_at = dotenvConf.exerciseFinishedAt;
        const update_started_at = dotenvConf.exerciseUpdateStartedAt;
        const update_finished_at = dotenvConf.exerciseUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap break activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Break";
        const started_at = dotenvConf.breakStartedAt;
        const finished_at = dotenvConf.breakFinishedAt;
        const update_started_at = dotenvConf.breakUpdateStartedAt;
        const update_finished_at = dotenvConf.breakUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap libur (day off) activity for PT role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadPtEmail;
        const password = dotenvConf.fhadPtPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Day Off";
        const started_at = dotenvConf.dayOffStartedAt;
        const finished_at = dotenvConf.dayOffFinishedAt;
        const update_started_at = dotenvConf.dayOffUpdateStartedAt;
        const update_finished_at = dotenvConf.dayOffUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap PT class activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "PT Class";
        const started_at = dotenvConf.ptClassStartedAt;
        const finished_at = dotenvConf.ptClassFinishedAt;
        const update_started_at = dotenvConf.ptClassUpdateStartedAt;
        const update_finished_at = dotenvConf.ptClassUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap reassessment activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Reassessment";
        const started_at = dotenvConf.reasementStartedAt;
        const finished_at = dotenvConf.reasementFinishedAt;
        const update_started_at = dotenvConf.reasementUpdateStartedAt;
        const update_finished_at = dotenvConf.reasementUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap fitness welcome activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Fitness Welcome";
        const started_at = dotenvConf.fitnessWelcomeStartedAt;
        const finished_at = dotenvConf.fitnessWelcomeFinishedAt;
        const update_started_at = dotenvConf.fitnessWelcomeUpdateStartedAt;
        const update_finished_at = dotenvConf.fitnessWelcomeUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap gym patrol activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Gym Patrol";
        const started_at = dotenvConf.gymPatrolStartedAt;
        const finished_at = dotenvConf.gymPatrolFinishedAt;
        const update_started_at = dotenvConf.gymPatrolUpdateStartedAt;
        const update_finished_at = dotenvConf.gymPatrolUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap training internal activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training Internal";
        const started_at = dotenvConf.trainingInternalStartedAt;
        const finished_at = dotenvConf.trainingInternalFinishedAt;
        const update_started_at = dotenvConf.trainingInternalUpdateStartedAt;
        const update_finished_at = dotenvConf.trainingInternalUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap training external activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training External";
        const started_at = dotenvConf.trainingExternalStartedAt;
        const finished_at = dotenvConf.trainingExternalFinishedAt;
        const update_started_at = dotenvConf.trainingExternalUpdateStartedAt;
        const update_finished_at = dotenvConf.trainingExternalUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap exercise activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Exercise";
        const started_at = dotenvConf.exerciseStartedAt;
        const finished_at = dotenvConf.exerciseFinishedAt;
        const update_started_at = dotenvConf.exerciseUpdateStartedAt;
        const update_finished_at = dotenvConf.exerciseUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap break activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Break";
        const started_at = dotenvConf.breakStartedAt;
        const finished_at = dotenvConf.breakFinishedAt;
        const update_started_at = dotenvConf.breakUpdateStartedAt;
        const update_finished_at = dotenvConf.breakUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap libur (day off) activity for CM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadCmEmail;
        const password = dotenvConf.fhadCmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Day Off";
        const started_at = dotenvConf.dayOffStartedAt;
        const finished_at = dotenvConf.dayOffFinishedAt;
        const update_started_at = dotenvConf.dayOffUpdateStartedAt;
        const update_finished_at = dotenvConf.dayOffUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap PT class activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "PT Class";
        const started_at = dotenvConf.ptClassStartedAt;
        const finished_at = dotenvConf.ptClassFinishedAt;
        const update_started_at = dotenvConf.ptClassUpdateStartedAt;
        const update_finished_at = dotenvConf.ptClassUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap reassessment activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Reassessment";
        const started_at = dotenvConf.reasementStartedAt;
        const finished_at = dotenvConf.reasementFinishedAt;
        const update_started_at = dotenvConf.reasementUpdateStartedAt;
        const update_finished_at = dotenvConf.reasementUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap fitness welcome activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Fitness Welcome";
        const started_at = dotenvConf.fitnessWelcomeStartedAt;
        const finished_at = dotenvConf.fitnessWelcomeFinishedAt;
        const update_started_at = dotenvConf.fitnessWelcomeUpdateStartedAt;
        const update_finished_at = dotenvConf.fitnessWelcomeUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap gym patrol activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Gym Patrol";
        const started_at = dotenvConf.gymPatrolStartedAt;
        const finished_at = dotenvConf.gymPatrolFinishedAt;
        const update_started_at = dotenvConf.gymPatrolUpdateStartedAt;
        const update_finished_at = dotenvConf.gymPatrolUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap training internal activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training Internal";
        const started_at = dotenvConf.trainingInternalStartedAt;
        const finished_at = dotenvConf.trainingInternalFinishedAt;
        const update_started_at = dotenvConf.trainingInternalUpdateStartedAt;
        const update_finished_at = dotenvConf.trainingInternalUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap training external activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training External";
        const started_at = dotenvConf.trainingExternalStartedAt;
        const finished_at = dotenvConf.trainingExternalFinishedAt;
        const update_started_at = dotenvConf.trainingExternalUpdateStartedAt;
        const update_finished_at = dotenvConf.trainingExternalUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap exercise activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Exercise";
        const started_at = dotenvConf.exerciseStartedAt;
        const finished_at = dotenvConf.exerciseFinishedAt;
        const update_started_at = dotenvConf.exerciseUpdateStartedAt;
        const update_finished_at = dotenvConf.exerciseUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap break activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Break";
        const started_at = dotenvConf.breakStartedAt;
        const finished_at = dotenvConf.breakFinishedAt;
        const update_started_at = dotenvConf.breakUpdateStartedAt;
        const update_finished_at = dotenvConf.breakUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap libur (day off) activity for FM role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadFmEmail;
        const password = dotenvConf.fhadFmPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Day Off";
        const started_at = dotenvConf.dayOffStartedAt;
        const finished_at = dotenvConf.dayOffFinishedAt;
        const update_started_at = dotenvConf.dayOffUpdateStartedAt;
        const update_finished_at = dotenvConf.dayOffUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap PT class activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "PT Class";
        const started_at = dotenvConf.ptClassStartedAt;
        const finished_at = dotenvConf.ptClassFinishedAt;
        const update_started_at = dotenvConf.ptClassUpdateStartedAt;
        const update_finished_at = dotenvConf.ptClassUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap reassessment activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Reassessment";
        const started_at = dotenvConf.reasementStartedAt;
        const finished_at = dotenvConf.reasementFinishedAt;
        const update_started_at = dotenvConf.reasementUpdateStartedAt;
        const update_finished_at = dotenvConf.reasementUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap fitness welcome activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Fitness Welcome";
        const started_at = dotenvConf.fitnessWelcomeStartedAt;
        const finished_at = dotenvConf.fitnessWelcomeFinishedAt;
        const update_started_at = dotenvConf.fitnessWelcomeUpdateStartedAt;
        const update_finished_at = dotenvConf.fitnessWelcomeUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap gym patrol activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Gym Patrol";
        const started_at = dotenvConf.gymPatrolStartedAt;
        const finished_at = dotenvConf.gymPatrolFinishedAt;
        const update_started_at = dotenvConf.gymPatrolUpdateStartedAt;
        const update_finished_at = dotenvConf.gymPatrolUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap training internal activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training Internal";
        const started_at = dotenvConf.trainingInternalStartedAt;
        const finished_at = dotenvConf.trainingInternalFinishedAt;
        const update_started_at = dotenvConf.trainingInternalUpdateStartedAt;
        const update_finished_at = dotenvConf.trainingInternalUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap training external activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Training External";
        const started_at = dotenvConf.trainingExternalStartedAt;
        const finished_at = dotenvConf.trainingExternalFinishedAt;
        const update_started_at = dotenvConf.trainingExternalUpdateStartedAt;
        const update_finished_at = dotenvConf.trainingExternalUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap exercise activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Exercise";
        const started_at = dotenvConf.exerciseStartedAt;
        const finished_at = dotenvConf.exerciseFinishedAt;
        const update_started_at = dotenvConf.exerciseUpdateStartedAt;
        const update_finished_at = dotenvConf.exerciseUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap break activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Break";
        const started_at = dotenvConf.breakStartedAt;
        const finished_at = dotenvConf.breakFinishedAt;
        const update_started_at = dotenvConf.breakUpdateStartedAt;
        const update_finished_at = dotenvConf.breakUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });

    it("Should successfully create update then recap libur (day off) activity for admin role @regression @api-pt", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addSeverity("normal");

        const email = dotenvConf.fhadAdminEmail;
        const password = dotenvConf.fhadAdminPassword;
        const club_name = dotenvConf.ptActivityClubName;
        const pt_id = dotenvConf.ptActivityTrainerId;
        const type_name = "Day Off";
        const started_at = dotenvConf.dayOffStartedAt;
        const finished_at = dotenvConf.dayOffFinishedAt;
        const update_started_at = dotenvConf.dayOffUpdateStartedAt;
        const update_finished_at = dotenvConf.dayOffUpdateFinishedAt;

        const auth_login = await AuthApiCollections.post_v1_auth_login(
            email,
            password
        );
        const token = auth_login.data.data.token;

        const club_id = await PersonalTrainerApi.map_get_v2_clubs(
            token,
            club_name
        );

        const type_id =
            await PersonalTrainerApi.map_get_v2_trainer_schedule_types(
                token,
                type_name
            );

        const trainer_schedule =
            await PersonalTrainerApi.post_v2_trainer_schedules(
                token,
                pt_id,
                club_id,
                type_id,
                started_at,
                finished_at
            );
        const activity_id = trainer_schedule.data.data.id;

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.put_v2_trainer_schedules(
            token,
            activity_id,
            update_started_at,
            update_finished_at
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);

        await PersonalTrainerApi.patch_v2_trainer_schedules_recap(
            token,
            activity_id
        );

        await PersonalTrainerApi.get_v2_trainer_schedules(token, activity_id);
    });
});

describe("BE Desktop Site Create Personal Trainer Activities", () => {
    it("Test case title @regression @smoke", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        // Define test paramaters here

        // Write test steps here
    });
});
