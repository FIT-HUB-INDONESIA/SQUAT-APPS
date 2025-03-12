import fs from "fs";
import path from "path";

async function collectTestCases() {
    const { glob } = await import("glob");

    const testDir = [
        path.join(process.cwd(), "../tests/**/*.spec.js"),
        path.join(process.cwd(), "../tests_api/**/*.spec.js")
    ];

    const testFiles = await glob(testDir);

    const testCasesByDescribe = {};

    for (const file of testFiles) {
        const fileContent = fs.readFileSync(file, "utf8");

        let currentDescribe = null;
        const lines = fileContent.split("\n");

        for (const line of lines) {
            const describeMatch = line.match(/describe\(["'`](.*?)["'`],/);

            if (describeMatch) {
                currentDescribe = describeMatch[1];
                testCasesByDescribe[currentDescribe] = [];
            }

            const itMatch = line.match(/it\(["'`](.*?)["'`]/);

            if (itMatch && currentDescribe) {
                testCasesByDescribe[currentDescribe].push(itMatch[1]);
            }
        }
    }

    console.log(
        "Collected Test Case Titles:",
        JSON.stringify(testCasesByDescribe, null, 2)
    );
}

collectTestCases();
