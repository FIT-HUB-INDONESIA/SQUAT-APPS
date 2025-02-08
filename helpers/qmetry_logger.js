import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Logger {
    constructor(baseName = "tc", extension = ".csv") {
        if (Logger.instance) {
            return Logger.instance;
        }

        this.logs = [];
        this.baseName = baseName;
        this.extension = extension;
        this.logFile = this.initializeLogFile();
        Logger.instance = this;
    }

    initializeLogFile() {
        const preferredFolder = path.join(__dirname, "../logs");

        if (!fs.existsSync(preferredFolder)) {
            fs.mkdirSync(preferredFolder, { recursive: true });
        }

        const unixTime = "dev_qmetry";

        const logFile = path.join(
            preferredFolder,
            `${this.baseName}_${unixTime}${this.extension}`
        );

        if (!fs.existsSync(logFile)) {
            const header =
                "Timestamp,Issue Key,Parent Key,Summary,Step Summary,Expected Result\n";

            const logOutput = header;

            fs.writeFileSync(logFile, logOutput, "utf8");
        }

        return logFile;
    }

    log(step, expected) {
        const summary = process.env.TEST_CASE_TITLE || "Unknown Test Case";
        const key = process.env.TEST_CASE_ID || "Unknown Test Case ID";
        const timestamp = new Date().toISOString();
        const logEntry = {
            expected,
            key,
            step,
            summary,
            timestamp
        };

        this.logs.push(logEntry);
    }

    async saveLogs() {
        const groupedLogs = this.groupAndSortLogs();
        let csvOutput = "";
        const jsonOutputMap = new Map();

        groupedLogs.forEach((log, index) => {
            let jsonOutput = jsonOutputMap.get(process.env.TEST_CASE_TITLE);

            if (index == 0) {
                csvOutput += `${log.timestamp},${log.key},,${log.summary},${log.step},\n`;
                jsonOutput = {
                    projectId: parseInt(process.env.PROJECT_ID || "0"),
                    steps: [],
                    summary: process.env.TEST_CASE_TITLE || "Unknown Test Case"
                };
            } else {
                csvOutput += `,,${log.key},,${log.step},${log.expected}\n`;
                jsonOutput.steps.push({
                    expectedResult: log.expected,
                    stepDetails: log.step
                });
            }
            jsonOutputMap.set(process.env.TEST_CASE_TITLE, jsonOutput);
        });

        fs.appendFileSync(this.logFile, csvOutput, "utf8");

        console.log("[Qmetry] Done Upsert Qmetry");
    }

    groupAndSortLogs() {
        const grouped = this.logs.reduce((acc, log) => {
            if (!acc[log.key]) {
                acc[log.key] = [];
            }

            acc[log.key].push(log);

            return acc;
        }, {});

        const sortedLogs = [];

        Object.keys(grouped).forEach((key) => {
            const sortedGroup = grouped[key].sort(
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            );

            sortedLogs.push(...sortedGroup);
        });

        return sortedLogs;
    }
}

export default Logger;
