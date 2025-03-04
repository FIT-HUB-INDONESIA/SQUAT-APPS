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
    ptClassStartedAt: process.env.PT_CLASS_STARTED_AT,
    ptClassFinishedAt: process.env.PT_CLASS_FINISHED_AT,
    reasementStartedAt: process.env.REASSESSMENT_STARTED_AT,
    reasementFinishedAt: process.env.REASSESSMENT_FINISHED_AT,
    fitnessWelcomeStartedAt: process.env.FITNESS_WELCOME_STARTED_AT,
    fitnessWelcomeFinishedAt: process.env.FITNESS_WELCOME_FINISHED_AT,
    gymPatrolStartedAt: process.env.GYM_PATROL_STARTED_AT,
    gymPatrolFinishedAt: process.env.GYM_PATROL_FINISHED_AT,
    trainingInternalStartedAt: process.env.TRAINING_INTERNAL_STARTED_AT,
    trainingInternalFinishedAt: process.env.TRAINING_INTERNAL_FINISHED_AT,
    trainingExternalStartedAt: process.env.TRAINING_EXTERNAL_STARTED_AT,
    trainingExternalFinishedAt: process.env.TRAINING_EXTERNAL_FINISHED_AT,
    exerciseStartedAt: process.env.EXERCISE_STARTED_AT,
    exerciseFinishedAt: process.env.EXERCISE_FINISHED_AT,
    breakStartedAt: process.env.BREAK_STARTED_AT,
    breakFinishedAt: process.env.BREAK_FINISHED_AT,
    dayOffStartedAt: process.env.DAY_OFF_STARTED_AT,
    dayOffFinishedAt: process.env.DAY_OFF_FINISHED_AT,
    paidPtSessionClubName: process.env.PAID_PT_SESSION_CLUB_NAME,
    paidPtSessionPtId: process.env.PAID_PT_SESSION_PT_ID,
    paidPtSessionMemberPhone: process.env.PAID_PT_SESSION_MEMBER_PHONE,
    paidPtSessionScheduleAt: process.env.PAID_PT_SESSION_SCHEDULE_AT,
    fitStartPtSessionClubName: process.env.FIT_START_PT_SESSION_CLUB_NAME,
    fitStartPtSessionPtId: process.env.FIT_START_PT_SESSION_PT_ID,
    fitStartPtSessionMemberPhone: process.env.FIT_START_PT_SESSION_MEMBER_PHONE,
    fitStartPtSessionScheduleAt: process.env.FIT_START_PT_SESSION_SCHEDULE_AT
};
