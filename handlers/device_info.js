import { dotenvConf } from "../config/dotenv.js";
import { execSync } from "child_process";

class DeviceInfo {
    constructor() {
        this.app_id = dotenvConf.wdioAppId;
    }
    /**
     * Get the UDID of the connected Android device
     * @returns {Promise<string>} The UDID of the connected Android device
     */
    async getAndroidUDID() {
        try {
            const adbDevicesOutput = execSync("adb devices").toString();

            const deviceList = adbDevicesOutput
                .split("\n")
                .filter(
                    (line) =>
                        line.trim() &&
                        line !== "List of devices attached" &&
                        line.includes("device")
                )
                .map((line) => line.split("\t")[0]);

            if (deviceList.length === 0) {
                throw new Error("No Android device connected");
            }

            return deviceList[0];
        } catch {
            console.error(
                "Fetching Android device UDID failed - No Android device connected"
            );

            return "Not connected";
        }
    }

    /**
     * Get the UDID of the connected iOS device
     * @returns {Promise<string>} The UDID of the connected iOS device
     */
    async getIosUDID() {
        try {
            const iosDevicesOutput = execSync("npx ios-deploy -c").toString();

            const deviceMatch = iosDevicesOutput.match(/Found\s([A-F0-9-]+)\s/);

            if (!deviceMatch) {
                throw new Error("No iOS device connected");
            }

            return deviceMatch[1];
        } catch {
            console.error(
                "Fetching iOS device UDID failed - No iOS device connected"
            );

            return "Not connected";
        }
    }

    /**
     * Get the version name and version code of the connected Android app
     * @returns {Promise<{versionName: string, versionCode: string}>} The version name and version code of the connected Android app
     */
    async getAndroidAppVersion() {
        try {
            const device = await this.getAndroidUDID();

            if (device === "Not connected") {
                throw new Error("No Android device connected");
            }

            const output = execSync(
                `adb shell dumpsys package ${this.app_id} | grep version`
            ).toString();

            const versionNameMatch = output.match(/versionName=([\d.]+)/);
            const versionCodeMatch = output.match(/versionCode=(\d+)/);

            return {
                versionName: versionNameMatch ? versionNameMatch[1] : "Unknown",
                versionCode: versionCodeMatch ? versionCodeMatch[1] : "Unknown"
            };
        } catch {
            console.error(
                "Fetching Android app version failed - No Android device connected\n"
            );

            return {
                versionName: "Not connected",
                versionCode: "Not connected"
            };
        }
    }

    /**
     * Get the version name and build version of the connected iOS app
     * @returns {Promise<{versionName: string, versionCode: string}>} The version name and build version of the connected iOS app
     */
    async getIosAppVersion() {
        try {
            const device = await this.getIosUDID();

            if (device === "Not connected") {
                throw new Error("No iOS device connected");
            }

            const result = execSync(
                `npx ios-deploy -B -j --bundle_id ${this.app_id} --key=CFBundleShortVersionString --key=CFBundleVersion`
            )
                .toString()
                .trim();

            const parsedResult = JSON.parse(result);

            if (!parsedResult.Apps || !parsedResult.Apps[this.app_id]) {
                throw new Error("App information not found");
            }

            const appInfo = parsedResult.Apps[this.app_id];

            return {
                versionName: appInfo.CFBundleShortVersionString || "Unknown",
                versionCode: appInfo.CFBundleVersion || "Unknown"
            };
        } catch {
            console.error(
                "Fetching iOS app version failed - No iOS device connected\n"
            );

            return {
                versionName: "Not connected",
                versionCode: "Not connected"
            };
        }
    }
}

export default new DeviceInfo();
