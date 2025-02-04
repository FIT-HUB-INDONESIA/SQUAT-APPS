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
     * Register: Test Data
     */
    registerUserEmail: process.env.REGISTER_USER_EMAIL,
    registerOtpNumber: process.env.REGISTER_OTP_NUMBER,
    registerPinNumber: process.env.REGISTER_PIN_NUMBER
};
