import fs from "fs";
import path from "path";

const testDir = "../tests";
const testFiles = fs
    .readdirSync(testDir)
    .filter((file) => file.endsWith(".js"));

const testCasesByDescribe = {};

for (const file of testFiles) {
    const filePath = path.join(testDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");

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
