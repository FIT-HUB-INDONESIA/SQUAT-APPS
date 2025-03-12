import fs from "fs";

const ALLURE_RESULTS_DIR = "./allure-outputs/data/categories.json";
const OUTPUT_FILE_ANDROID = "./allure-outputs/failed-tests-android.txt";
const OUTPUT_FILE_IOS = "./allure-outputs/failed-tests-ios.txt";
const OUTPUT_FILE_CHROME = "./allure-outputs/failed-tests-chrome.txt";
const OUTPUT_FILE_SAFARI = "./allure-outputs/failed-tests-safari.txt";

function getFailedTests() {
    try {
        const categoriesData = JSON.parse(
            fs.readFileSync(ALLURE_RESULTS_DIR, "utf-8")
        );

        const failedTests = {
            android: [],
            ios: [],
            chrome: [],
            safari: []
        };

        const findFailedTests = (node) => {
            if (node.children) {
                node.children.forEach((child) => findFailedTests(child));
            }

            if (node.status === "failed" || node.status === "broken") {
                if (node.parameters) {
                    const params = node.parameters.map((param) =>
                        param.toLowerCase()
                    );

                    if (params.some((param) => param.includes("android"))) {
                        failedTests.android.push(node.name);
                    } else if (params.some((param) => param.includes("ios"))) {
                        failedTests.ios.push(node.name);
                    } else if (
                        params.some((param) => param.includes("chrome"))
                    ) {
                        failedTests.chrome.push(node.name);
                    } else if (
                        params.some((param) => param.includes("safari"))
                    ) {
                        failedTests.safari.push(node.name);
                    }
                }
            }
        };

        findFailedTests(categoriesData);

        const writeResults = (platform, outputFile) => {
            if (failedTests[platform].length > 0) {
                const grepPattern = failedTests[platform].join("|");

                fs.writeFileSync(outputFile, grepPattern);
                console.log(
                    `${failedTests[platform].length} failed ${platform.toUpperCase()} tests written to ${outputFile}`
                );
            } else {
                console.log(`No failed ${platform.toUpperCase()} tests found.`);
            }
        };

        writeResults("android", OUTPUT_FILE_ANDROID);
        writeResults("ios", OUTPUT_FILE_IOS);
        writeResults("chrome", OUTPUT_FILE_CHROME);
        writeResults("safari", OUTPUT_FILE_SAFARI);
    } catch (error) {
        console.error("Error processing failed tests:", error.message);
    }
}

getFailedTests();
