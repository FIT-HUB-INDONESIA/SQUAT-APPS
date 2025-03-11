import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const env = process.env.ENV?.toUpperCase();

/**
 * Dotenv Configuration
 */
export const dotenvConf = {
    /**
     * Environment
     */
    environment: env,
    environmentVar: process.env.ENV_VAR?.toUpperCase(),

    /**
     * WebdriverIO Configuration
     */
    wdioAppId: process.env[`WDIO_APP_ID_${env}`],
    wdioLogLevel: process.env.WDIO_LOG_LEVEL,
    wdioWaitForTimeout: parseInt(process.env.WDIO_WAITFOR_TIMEOUT, 10),
    wdioOptsTimeout: parseInt(process.env.WDIO_OPTS_TIMEOUT, 10),
    androidPort: parseInt(process.env.ANDROID_PORT, 10),
    androidUdid: process.env.ANDROID_UDID,
    iosPort: parseInt(process.env.IOS_PORT, 10),
    iosUdid: process.env.IOS_UDID,

    /**
     * API Capabilities
     */
    hostnameFhap: process.env[`HOSTNAME_FHAP_${env}`],
    deviceIdIos: process.env.DEVICE_ID_IOS,
    deviceIdAndroid: process.env.DEVICE_ID_ANDROID,
    hostnameFhad: process.env[`HOSTNAME_FHAD_${env}`],

    /**
     * Webview Capabilities
     */
    baseUrlFhad: process.env[`BASE_URL_FHAD_${env}`],
    /**
     * Global: Test Data
     */
    userEmail: process.env.USER_EMAIL,
    otpNumber: process.env.OTP_NUMBER,
    pinNumber: process.env.PIN_NUMBER,
    fhadPtEmail: process.env.FHAD_PT_EMAIL,
    fhadPtPassword: process.env.FHAD_PT_PASSWORD,
    fhadCmEmail: process.env.FHAD_CM_EMAIL,
    fhadCmPassword: process.env.FHAD_CM_PASSWORD,
    fhadFmEmail: process.env.FHAD_FM_EMAIL,
    fhadFmPassword: process.env.FHAD_FM_PASSWORD,
    fhadAdminEmail: process.env.FHAD_ADMIN_EMAIL,
    fhadAdminPassword: process.env.FHAD_ADMIN_PASSWORD,

    /**
     * Test Data: Login
     */
    loginNonActiveMembership: process.env.LOGIN_NON_ACTIVE_MEMBERSHIP,

    /**
     * Test Data: [BE] Mobile Site Create Personal Trainer Activities
     */
    ptActivityClubName: process.env.PT_ACTIVITY_CLUB_NAME,
    ptActivityTrainerId: process.env.PT_ACTIVITY_TRAINER_ID,
    ptActivityTrainerName: process.env.PT_ACTIVITY_TRAINER_NAME,

    ptClassStartedAt: process.env.PT_CLASS_STARTED_AT,
    ptClassFinishedAt: process.env.PT_CLASS_FINISHED_AT,
    ptClassUpdateStartedAt: process.env.PT_CLASS_UPDATE_STARTED_AT,
    ptClassUpdateFinishedAt: process.env.PT_CLASS_UPDATE_FINISHED_AT,
    ptClassPreferredDate: process.env.PT_CLASS_PREFERRED_DATE,
    ptClassPreferredStartHour: process.env.PT_CLASS_PREFERRED_START_HOUR,
    ptClassPreferredStartMinutes: process.env.PT_CLASS_PREFERRED_START_MINUTES,
    ptClassPreferredFinishHour: process.env.PT_CLASS_PREFERRED_FINISH_HOUR,
    ptClassPreferredFinishMinutes:
        process.env.PT_CLASS_PREFERRED_FINISH_MINUTES,

    reasementStartedAt: process.env.REASSESSMENT_STARTED_AT,
    reasementFinishedAt: process.env.REASSESSMENT_FINISHED_AT,
    reasementUpdateStartedAt: process.env.REASSESSMENT_UPDATE_STARTED_AT,
    reasementUpdateFinishedAt: process.env.REASSESSMENT_UPDATE_FINISHED_AT,
    reasementPreferredDate: process.env.REASSESSMENT_PREFERRED_DATE,
    reasementPreferredStartHour: process.env.REASSESSMENT_PREFERRED_START_HOUR,
    reasementPreferredStartMinutes:
        process.env.REASSESSMENT_PREFERRED_START_MINUTES,
    reasementPreferredFinishHour:
        process.env.REASSESSMENT_PREFERRED_FINISH_HOUR,
    reasementPreferredFinishMinutes:
        process.env.REASSESSMENT_PREFERRED_FINISH_MINUTES,

    fitnessWelcomeStartedAt: process.env.FITNESS_WELCOME_STARTED_AT,
    fitnessWelcomeFinishedAt: process.env.FITNESS_WELCOME_FINISHED_AT,
    fitnessWelcomeUpdateStartedAt:
        process.env.FITNESS_WELCOME_UPDATE_STARTED_AT,
    fitnessWelcomeUpdateFinishedAt:
        process.env.FITNESS_WELCOME_UPDATE_FINISHED_AT,
    fitnessWelcomePreferredDate: process.env.FITNESS_WELCOME_PREFERRED_DATE,
    fitnessWelcomePreferredStartHour:
        process.env.FITNESS_WELCOME_PREFERRED_START_HOUR,
    fitnessWelcomePreferredStartMinutes:
        process.env.FITNESS_WELCOME_PREFERRED_START_MINUTES,
    fitnessWelcomePreferredFinishHour:
        process.env.FITNESS_WELCOME_PREFERRED_FINISH_HOUR,
    fitnessWelcomePreferredFinishMinutes:
        process.env.FITNESS_WELCOME_PREFERRED_FINISH_MINUTES,

    gymPatrolStartedAt: process.env.GYM_PATROL_STARTED_AT,
    gymPatrolFinishedAt: process.env.GYM_PATROL_FINISHED_AT,
    gymPatrolUpdateStartedAt: process.env.GYM_PATROL_UPDATE_STARTED_AT,
    gymPatrolUpdateFinishedAt: process.env.GYM_PATROL_UPDATE_FINISHED_AT,
    gymPatrolPreferredDate: process.env.GYM_PATROL_PREFERRED_DATE,
    gymPatrolPreferredStartHour: process.env.GYM_PATROL_PREFERRED_START_HOUR,
    gymPatrolPreferredStartMinutes:
        process.env.GYM_PATROL_PREFERRED_START_MINUTES,
    gymPatrolPreferredFinishHour: process.env.GYM_PATROL_PREFERRED_FINISH_HOUR,
    gymPatrolPreferredFinishMinutes:
        process.env.GYM_PATROL_PREFERRED_FINISH_MINUTES,

    trainingInternalStartedAt: process.env.TRAINING_INTERNAL_STARTED_AT,
    trainingInternalFinishedAt: process.env.TRAINING_INTERNAL_FINISHED_AT,
    trainingInternalUpdateStartedAt:
        process.env.TRAINING_INTERNAL_UPDATE_STARTED_AT,
    trainingInternalUpdateFinishedAt:
        process.env.TRAINING_INTERNAL_UPDATE_FINISHED_AT,
    trainingInternalPreferredDate: process.env.TRAINING_INTERNAL_PREFERRED_DATE,
    trainingInternalPreferredStartHour:
        process.env.TRAINING_INTERNAL_PREFERRED_START_HOUR,
    trainingInternalPreferredStartMinutes:
        process.env.TRAINING_INTERNAL_PREFERRED_START_MINUTES,
    trainingInternalPreferredFinishHour:
        process.env.TRAINING_INTERNAL_PREFERRED_FINISH_HOUR,
    trainingInternalPreferredFinishMinutes:
        process.env.TRAINING_INTERNAL_PREFERRED_FINISH_MINUTES,

    trainingExternalStartedAt: process.env.TRAINING_EXTERNAL_STARTED_AT,
    trainingExternalFinishedAt: process.env.TRAINING_EXTERNAL_FINISHED_AT,
    trainingExternalUpdateStartedAt:
        process.env.TRAINING_EXTERNAL_UPDATE_STARTED_AT,
    trainingExternalUpdateFinishedAt:
        process.env.TRAINING_EXTERNAL_UPDATE_FINISHED_AT,
    trainingExternalPreferredDate: process.env.TRAINING_EXTERNAL_PREFERRED_DATE,
    trainingExternalPreferredStartHour:
        process.env.TRAINING_EXTERNAL_PREFERRED_START_HOUR,
    trainingExternalPreferredStartMinutes:
        process.env.TRAINING_EXTERNAL_PREFERRED_START_MINUTES,
    trainingExternalPreferredFinishHour:
        process.env.TRAINING_EXTERNAL_PREFERRED_FINISH_HOUR,
    trainingExternalPreferredFinishMinutes:
        process.env.TRAINING_EXTERNAL_PREFERRED_FINISH_MINUTES,

    exerciseStartedAt: process.env.EXERCISE_STARTED_AT,
    exerciseFinishedAt: process.env.EXERCISE_FINISHED_AT,
    exerciseUpdateStartedAt: process.env.EXERCISE_UPDATE_STARTED_AT,
    exerciseUpdateFinishedAt: process.env.EXERCISE_UPDATE_FINISHED_AT,
    exercisePreferredDate: process.env.EXERCISE_PREFERRED_DATE,
    exercisePreferredStartHour: process.env.EXERCISE_PREFERRED_START_HOUR,
    exercisePreferredStartMinutes: process.env.EXERCISE_PREFERRED_START_MINUTES,
    exercisePreferredFinishHour: process.env.EXERCISE_PREFERRED_FINISH_HOUR,
    exercisePreferredFinishMinutes:
        process.env.EXERCISE_PREFERRED_FINISH_MINUTES,

    breakStartedAt: process.env.BREAK_STARTED_AT,
    breakFinishedAt: process.env.BREAK_FINISHED_AT,
    breakUpdateStartedAt: process.env.BREAK_UPDATE_STARTED_AT,
    breakUpdateFinishedAt: process.env.BREAK_UPDATE_FINISHED_AT,
    breakPreferredDate: process.env.BREAK_PREFERRED_DATE,
    breakPreferredStartHour: process.env.BREAK_PREFERRED_START_HOUR,
    breakPreferredStartMinutes: process.env.BREAK_PREFERRED_START_MINUTES,
    breakPreferredFinishHour: process.env.BREAK_PREFERRED_FINISH_HOUR,
    breakPreferredFinishMinutes: process.env.BREAK_PREFERRED_FINISH_MINUTES,

    dayOffStartedAt: process.env.DAY_OFF_STARTED_AT,
    dayOffFinishedAt: process.env.DAY_OFF_FINISHED_AT,
    dayOffUpdateStartedAt: process.env.DAY_OFF_UPDATE_STARTED_AT,
    dayOffUpdateFinishedAt: process.env.DAY_OFF_UPDATE_FINISHED_AT,
    dayOffPreferredDate: process.env.DAY_OFF_PREFERRED_DATE,

    paidPtSessionMemberPhone: process.env.PAID_PT_SESSION_MEMBER_PHONE,
    paidPtSessionPreferredDate: process.env.PAID_PT_SESSION_PREFERRED_DATE,
    paidPtSessionPreferredHour: process.env.PAID_PT_SESSION_PREFERRED_HOUR,
    paidPtSessionPreferredMinutes:
        process.env.PAID_PT_SESSION_PREFERRED_MINUTES,

    fitStartPtSessionMemberPhone: process.env.FIT_START_PT_SESSION_MEMBER_PHONE,
    fitStartPtSessionPreferredDate:
        process.env.FIT_START_PT_SESSION_PREFERRED_DATE,
    fitStartPtSessionPreferredHour:
        process.env.FIT_START_PT_SESSION_PREFERRED_HOUR,
    fitStartPtSessionPreferredMinutes:
        process.env.FIT_START_PT_SESSION_PREFERRED_MINUTES
};
