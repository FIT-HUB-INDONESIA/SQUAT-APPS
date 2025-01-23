# SQUAT-APPS

Welcome to the Fit Hub App Automation Testing repository. This repository is dedicated to maintaining and executing automated test scripts for the Fit Hub application, ensuring high-quality standards for both iOS and Android platforms.

## Goals

The primary goals of this repository are:

1. **Ensure App Reliability:** Automate critical functional, regression, and end-to-end test cases to minimize manual testing efforts and ensure consistent quality across app releases.

2. **Cross-Platform Support (future goal):** Provide a unified automation framework that supports both iOS and Android devices, enabling efficient parallel testing.

3. **Early Defect Detection (future goal):** Identify bugs early in the development cycle by integrating automation tests into the CI/CD pipeline.

4. **Scalable and Maintainable Tests:** Create reusable and modular test scripts that are easy to maintain and adapt as the application evolves.

## Key Technologies

- **Appium:** The primary tool for automating mobile applications on both iOS and Android platforms.
- **Programming Languages:** Scripts are developed in JavaScript for flexibility and ease of use.
- **Node.js:** Used for managing dependencies and running JavaScript-based automation tasks.
- **Android SDK and Xcode:** Required for setting up and running tests on Android and iOS devices, respectively.

## Contribution Guidelines

1. Follow the coding standards defined in the `.eslintrc` and `.prettierrc` files.
2. Write comprehensive comments and documentation for new test cases.
3. Submit pull requests for review and approval before merging changes into the main branch.
4. Ensure all tests pass before submitting any changes.

## Reporting Issues

If you encounter any issues or bugs, please submit them via the Issues tab on this repository with a detailed description and steps to reproduce the problem.

---

> For more information or assistance, feel free to contact the team or refer to the project documentation.

## Table of Contents

- [SQUAT-APPS](#squat-apps)
  - [Goals](#goals)
  - [Key Technologies](#key-technologies)
  - [Contribution Guidelines](#contribution-guidelines)
  - [Reporting Issues](#reporting-issues)
  - [Table of Contents](#table-of-contents)
  - [Setting Up an SSH Key with SHA-256](#setting-up-an-ssh-key-with-sha-256)
  - [Guide to Cloning a Git Repository Using SSH](#guide-to-cloning-a-git-repository-using-ssh)
  - [Configure ESLint and Prettier Formatter](#configure-eslint-and-prettier-formatter)
  - [PR Conventions: Crafting Descriptive Titles and Commit Messages](#pr-conventions-crafting-descriptive-titles-and-commit-messages)
  - [Step-by-Step Guide to Appium Testing on Real iOS Devices](#step-by-step-guide-to-appium-testing-on-real-ios-devices)
  - [Step-by-Step Guide to Appium Testing on Real Android Devices (future development)](#step-by-step-guide-to-appium-testing-on-real-android-devices-future-development)

## Setting Up an SSH Key with SHA-256

Secure Shell (SSH) keys provide a secure way to authenticate with remote systems. Using the SHA-256 algorithm ensures enhanced security for your keys. This guide walks you through generating, configuring, and using an SSH key with SHA-256.

**Step 1: Check Existing SSH Keys**

Before generating a new SSH key, check if any existing keys are already set up:

```bash
ls ~/.ssh
```

Look for files such as `id_rsa`, `id_ecdsa`, or `id_ed25519`. If you already have a key you want to use, you can skip the key generation step.

**Step 2 (Optional): Generate a New SSH Key**

1. Open a terminal.
2. Run the following command to generate a new SSH key using the SHA-256 algorithm:

    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```

    Replace `your_email@example.com` with your email address.

3. When prompted to enter a file to save the key, press Enter to use the default path or specify a custom path.
4. (Optional) Set a passphrase for additional security.

**Step 3: Add the SSH Key to the SSH Agent**

To manage your key securely, add it to the SSH agent:

1. Start the SSH agent:

    ```bash
    eval "$(ssh-agent -s)"
    ```

2. Add your SSH private key:

    ```bash
    ssh-add ~/.ssh/id_ed25519
    ```

    Replace `id_ed25519` with your key file name if different.

**Step 4: Add the Public Key to the Remote System**

1. Display your public key:

    ```bash
    cat ~/.ssh/id_ed25519.pub
    ```

2. Copy the output and paste it into your remote system's SSH configuration file.

    ```bash
    cat ~/.ssh/id_ed25519.pub
    ```

3. Copy the output.
4. Add the key to the remote system or GitHub:

    - GitHub: Go to Settings > SSH and GPG keys > New SSH key.
    - Paste the public key and save.

**Step 5: Test the Connection**

Verify the SSH connection:

```bash
ssh -T git@github.com
```

If configured correctly, you should see a success message.

```
Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
```

## Guide to Cloning a Git Repository Using SSH

This guide will walk you through the steps required to clone a Git repository using SSH. Using SSH for cloning ensures a secure connection between your machine and the remote repository.

**Cloning a Repository Using SSH**

1. **Get the SSH URL of the Repository** On Git, navigate to the repository you want to clone. Copy the SSH URL (it typically looks like `git@github.com:FIT-HUB-INDONESIA/SQUAT-APPS.git`).

2. **Clone the Repository** Use the following command to clone the repository:

    ```bash
    git clone git@github.com:FIT-HUB-INDONESIA/SQUAT-APPS.git
    ```

3. **Verify the Cloned Repository** Navigate into the cloned repository and list the files to verify:

    ```bash
    cd squat-apps
    ls
    ```

4. After successfully cloning the repository, perform `npm init` at `android` folder, `ios` folder, and `root` folder to install dependencies.

## Configure ESLint and Prettier Formatter

**Step 1: Install ESLint and Prettier VS Code Extensions**

Search for and install the following extensions:

- ESLint
- Prettier - Code formatter

**Step 2: Configure VS Code Settings**

1. Ensure ESLint and Prettier are correctly configured in VS Code settings:

2. Open settings `Cmd+,` on macOS.

3. Add or verify the following settings in your settings.json file:

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "eslint.validate": [
        "javascript",
        "typescript",
        "javascriptreact",
        "typescriptreact"
    ],
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

**Step 3: Verify ESLint and Prettier Integration**

1. Open any file in the project.
2. Look for ESLint errors/warnings in the Problems panel `Cmd+Shift+M`
3. Check if Prettier formats the code on save.

**Step 4:Run ESLint and Prettier Manually**

Run the following commands to check for linting and formatting issues:

To lint the code:

```bash
npx eslint .
```

To format the code:

```bash
npx prettier --write .
```

## PR Conventions: Crafting Descriptive Titles and Commit Messages

This `README` provides a guideline for writing clear and consistent commit messages using the Conventional Commits specification and Angular's commit message guidelines. Following these conventions will help maintain a readable commit history and make versioning simpler and more predictable.

```

<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

```

1. Example for **types** (required) of commits used, eg: `feat:`

2. The **scope** (optional) and can be used to specify which part of the codebase the commit affects, eg: `docs`

3. The **description** (required) should be a short and imperative summary of the changes, written in the present tense. It should start with a lowercase letter and should not end with a period

4. The **body** (optional) of the commit message should provide a detailed explanation of what changes were made and why they were necessary

5. The **footer** (optional) is used to reference issues closed by the commit or to specify breaking changes. Use the following format:

    - **Breaking Changes**: Use the `BREAKING CHANGE` keyword to indicate changes that break backward compatibility.
    - **Issue References**: Mention the issue using `Closes #123` or `Fixes #456`

**Basic Example:**

```

feat(auth): add OAuth2 authentication Added OAuth2 login capability to improve
security. Updated login flow to handle OAuth tokens.;

```

**Breaking Change Example:**

```

feat(api): update API endpoints for better consistency

BREAKING CHANGE: The `/user` endpoint has been replaced with `/users`.
This change improves the API's consistency with RESTful conventions.

```

**Bug Fix Example:**

```

fix(ui): correct button alignment on mobile view Fixed an issue where buttons
were misaligned on small screens. Adjusted CSS to handle screen widths below
768px.;

```

**Commit Referencing Issues:**

```

fix(api): handle null values in user responses Fixed a bug where API returned
null values for missing fields. Closes #145;

```

**Additional Resources**

1. [Conventional Commits Official Documentation](https://www.conventionalcommits.org/en/v1.0.0/)
2. [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

## Step-by-Step Guide to Appium Testing on Real iOS Devices

**Prerequisite Installation**

1. Install [Homebrew](https://brew.sh/)
2. Install [Xcode](https://developer.apple.com/documentation/xcode/)
3. Install [Node.js](https://nodejs.org/en/download/package-manager)
4. Install [Appium](https://appium.io/docs/en/2.0/quickstart/install/)
5. Install [XCUITest](https://github.com/appium/appium-xcuitest-driver)<br>
   XCUITest [Documentation](https://appium.io/docs/en/2.0/ecosystem/)
6. Install [Appium Inspector](https://github.com/appium/appium-inspector/releases)<br>
   Appium Inspector [Documentation](https://appium.github.io/appium-inspector/latest/quickstart/installation/)

Locate the Xcode directory project for XCUITest configuration and open the folder.

```bash
find . -name "appium-webdriveragent"
```

```bash
open ./.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent
```

Open the `WebDriverAgent.xcodeproj` file

Click on `IntegrationApp` scheme, select `WebDriverAgentRunner`

Pairing an iPhone to a Mac locally using a cable connection. Under `Manage Run Destinations` select `iOS Device: iPhone`

Click on `Xcode` open `Settings` and make sure to login with Apple Developer credentials under `Accounts` tab. Follow this [Apple Developer link](https://developer.apple.com/) to register an Apple Developer accounts

After successfully login, under `Project navigator` click on `WebDriverAgent` to show `WebDriverAgent: Products` then select `WebDriverAgentRunner` products from `General` tabs. Click on `Signing & Capabilities` tabs

Make sure `Automatically manage signing` is enabled. Select `Team`. Wait until `Update provisioning` complete. If, `Update provisioning` failed try to modify `Bundle Identifier` to unique string. For example: `com.facebook17.WebDriverAgentRunner` then click `Try Again`. This configuration must be applied both for `WebDriverAgentRunner` and `WebDriverAgentLib` targets

On `Xcode` ribbon click on `Product` > `Test` to test connection successfully establish. If any error happen, follow instruction to resolved the problems. To stop established connection click on `Product` > `Stop`

To find iPhone iOS Device `udid` or `identifier`. Under `Xcode` ribbon, click on `Window` > `Devices and Simulators`

Run `Appium` server, open `Appium Inspector` and configure `Desired Capabilities`:

```json
{
    "platformName": "ios",
    "appium:udid": "00008110-000429C60AD3A01E",
    "appium:automationName": "XCUITest",
    "appium:bundleId": "com.apple.Preferences",
    "appium:showXcodeLog": true
}
```

`Start Session` Appium Inspector. If any error happen when Appium Inspector session start, make sure iOS device already configured correctly. Refer to following documentation to resolved the issues [Real Device Configuration](https://appium.github.io/appium-xcuitest-driver/latest/preparation/real-device-config/)

## Step-by-Step Guide to Appium Testing on Real Android Devices (future development)

(coming soon)
