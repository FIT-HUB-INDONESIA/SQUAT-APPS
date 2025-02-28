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
    fhadAdminEmail: process.env.FHAD_ADMIN_EMAIL,
    fhadAdminPassword: process.env.FHAD_ADMIN_PASSWORD,

    /**
     * Test Data: Login
     */
    loginNonActiveMembership: process.env.LOGIN_NON_ACTIVE_MEMBERSHIP
};
