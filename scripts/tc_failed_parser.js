import fs from "fs";

const ALLURE_RESULTS_DIR = "./allure-outputs/data/categories.json";
const OUTPUT_FILE_ANDROID = "./allure-outputs/failed-tests-android.txt";
const OUTPUT_FILE_IOS = "./allure-outputs/failed-tests-ios.txt";

function getFailedTests() {
    try {
        const categoriesData = JSON.parse(
            fs.readFileSync(ALLURE_RESULTS_DIR, "utf-8")
        );

        const failedTests = {
            android: [],
            ios: []
        };

        const findFailedTests = (node) => {
            if (node.children) {
                node.children.forEach((child) => findFailedTests(child));
            }

            if (node.status === "failed" || node.status === "broken") {
                const platform =
                    node.parameters &&
                    node.parameters.some((param) =>
                        param.toLowerCase().includes("android")
                    )
                        ? "android"
                        : "ios";

                failedTests[platform].push(node.name);
            }
        };

        findFailedTests(categoriesData);

        if (failedTests.android.length > 0) {
            const grepPattern = failedTests.android.join("|");

            fs.writeFileSync(OUTPUT_FILE_ANDROID, grepPattern);
            console.log(
                `${failedTests.android.length} failed Android tests written to ${OUTPUT_FILE_ANDROID}`
            );
        } else {
            console.log("No failed Android tests found.");
        }

        if (failedTests.ios.length > 0) {
            const grepPattern = failedTests.ios.join("|");

            fs.writeFileSync(OUTPUT_FILE_IOS, grepPattern);
            console.log(
                `${failedTests.ios.length} failed iOS tests written to ${OUTPUT_FILE_IOS}`
            );
        } else {
            console.log("No failed iOS tests found.");
        }
    } catch (error) {
        console.error("Error processing failed tests:", error.message);
    }
}

getFailedTests();
