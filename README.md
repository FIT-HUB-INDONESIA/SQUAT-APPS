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

## Getting Started with Page Object Model Testing

### [Page Object Structure](#page-object-structure)

The framework uses a 4-layer class structure for page objects:

1. Selectors Class: Contains element locators
2. Validation Class: Contains element validation methods
3. Action Class: Contains element interaction methods
4. Main Page Class: Contains use case methods combining actions and validations

**Basic Page Object Template**

```javascript
import elementHelper from "../helpers/wdio_element.js";
import expectHelper from "../helpers/wdio_expect.js";

/**
 * Base class containing common selectors
 */
class PageSelectors {
    get elementName() {
        return browser.capabilities.platformName === "Android"
            ? $(`android=new UiSelector().description("Element")`)
            : $(
                  `-ios class chain:**/XCUIElementTypeButton[\`name == "Element"\`]`
              );
    }
}

/**
 * Class containing validation methods
 */
class PageValidation extends PageSelectors {
    async validateElement() {
        return await expectHelper.toBeEnabled(this.elementName, "elementName");
    }
}

/**
 * Class containing action methods
 */
class PageAction extends PageValidation {
    async clickElement() {
        await elementHelper.click(
            this.elementName,
            "elementName",
            "Successfully clicked element"
        );
    }
}

/**
 * Class containing use case methods
 */
class Page extends PageAction {
    async completeUserFlow() {
        await this.validateElement();
        await this.clickElement();
    }
}

export default new Page();
```

### [Creating Page Objects](#creating-page-objects)

1. **Element Selectors**<br>
   Define selectors with platform-specific locators:
    ```javascript
        get welcome_screen_buat_akun_button() {
         return browser.capabilities.platformName === "Android"
             ? $(`android=new UiSelector().description("Buat Akun")`)
             : $(
                   `-ios class chain:**/XCUIElementTypeButton[\`name == "Buat Akun"\`]`
               );
     }
     get welcome_screen_masuk_button() {
         return browser.capabilities.platformName === "Android"
             ? $(`android=new UiSelector().description("Masuk")`)
             : $(
                   `-ios class chain:**/XCUIElementTypeButton[\`name == "Masuk"\`]`
               );
     }
     get welcome_screen_lewati_button() {
         return browser.capabilities.platformName === "Android"
             ? $(`android=new UiSelector().description("Lewati")`)
             : $(
                   `-ios class chain:**/XCUIElementTypeButton[\`name == "Lewati"\`]`
               );
     }
    ```
2. **Validation Methods**<br>
   Create methods to validate element states:
    ```javascript
    class WelcomeScreenValidation extends WelcomeScreenSelectors {
     async welcome_screen_buat_akun_button_enabled() {
         return await expectHelper.toBeEnabled(
             this.welcome_screen_buat_akun_button,
             "welcome_screen_buat_akun_button"
         );
     }
     async welcome_screen_buat_akun_button_wording() {
         return await expectHelper.toHaveAttribute(
             this.welcome_screen_buat_akun_button,
             "welcome_screen_buat_akun_button",
             "label",
             "content-desc",
             "Buat Akun"
         );
     }
     async welcome_screen_masuk_button_enabled() {
         return await expectHelper.toBeEnabled(
             this.welcome_screen_masuk_button,
             "welcome_screen_masuk_button"
         );
     }
     async welcome_screen_masuk_button_wording() {
         return await expectHelper.toHaveAttribute(
             this.welcome_screen_masuk_button,
             "welcome_screen_masuk_button",
             "label",
             "content-desc",
             "Masuk"
         );
     }
     async welcome_screen_lewati_button_enabled() {
         return await expectHelper.toBeEnabled(
             this.welcome_screen_lewati_button,
             "welcome_screen_lewati_button"
         );
     }
     async welcome_screen_lewati_button_wording() {
         return await expectHelper.toHaveAttribute(
             this.welcome_screen_lewati_button,
             "welcome_screen_lewati_button",
             "label",
             "content-desc",
             "Lewati"
         );
     }
    ```
3. **Action Methods**<br>
   Implement methods for user interactions:
    ```javascript
     */
    class WelcomeScreenAction extends WelcomeScreenValidation {
     async click_welcome_screen_buat_akun_button() {
         await elementHelper.click(
             this.welcome_screen_buat_akun_button,
             "welcome_screen_buat_akun_button",
             "Successfully redirected to register form page"
         );
     }
     async click_welcome_screen_masuk_button() {
         await elementHelper.click(
             this.welcome_screen_masuk_button,
             "welcome_screen_masuk_button",
             "Successfully redirected to login page"
         );
     }
     async click_welcome_screen_lewati_button() {
         await elementHelper.click(
             this.welcome_screen_lewati_button,
             "welcome_screen_lewati_button",
             "Successfully redirected to home page"
         );
     }
    }
    ```
4. **Use Case Methods**<br>
   Combine validations and actions for complete flows:

    ```javascript
    class WelcomeScreen extends WelcomeScreenAction {
        async welcome_screen_buat_akun_button_validation() {
            await this.welcome_screen_buat_akun_button_enabled();
            await this.welcome_screen_buat_akun_button_wording();
        }
        async welcome_screen_masuk_button_validation() {
            await this.welcome_screen_masuk_button_enabled();
            await this.welcome_screen_masuk_button_wording();
        }
        async welcome_screen_lewati_button_validation() {
            await this.welcome_screen_lewati_button_enabled();
            await this.welcome_screen_lewati_button_wording();
        }
    }
    ```

### [Writing Test Specs](#writing-test-specs)

1. **Basic Test Structure**

    ```javascript
    import PageObject from "../pages/page_object.js";
    import allureReporter from "@wdio/allure-reporter";

    describe("Feature Name", () => {
        it("Should perform specific action @tag1 @tag2", async () => {
            allureReporter.addParentSuite("Suite Name");
            allureReporter.addSeverity("critical");

            // Test steps using page objects
            await PageObject.validateElement();
            await PageObject.performAction();
        });
    });
    ```

2. **Real Example**<br>
   Here's a registration test example:

    ```javascript
    describe("Register", () => {
    it("Should successfully register as a new member @register @regression @smoke", async () => {
        allureReporter.addParentSuite("Regression");
        allureReporter.addParentSuite("Smoke");
        allureReporter.addSeverity("critical");

        const user_name = faker.person.fullName();
        const user_phone_number = generatePhoneNumber();
        const user_email = dotenvConf.registerUserEmail;
        const otp_number = dotenvConf.registerOtpNumber;
        const pin_creation_and_confirmation_number =
            dotenvConf.registerPinNumber;

        await WelcomeScreen.welcome_screen_buat_akun_button_validation();
        await WelcomeScreen.click_welcome_screen_buat_akun_button();
        await Register.register_kirimkan_kode_otp_button_disabled_validation();
        await Register.fill_register_nama_field(user_name);
        await Register.fill_register_phone_number_field(user_phone_number);
        await Register.fill_register_email_field(user_email);
        await Register.click_register_tnc_checkbox();
        await Register.click_register_kirimkan_kode_otp_button();
        await Auth.otp_lanjutkan_button_validation();
        await Auth.fill_otp_number_field(otp_number);
        await Auth.fill_create_pin_on_click_number_field(
            pin_creation_and_confirmation_number
        );
        await Auth.fill_confirmation_pin_on_click_number_field(
            pin_creation_and_confirmation_number
        );
        await Profiling.profiling_lewati_dulu_button_validation();
        await Profiling.click_profiling_lewati_dulu_button();
        await Profiling.profiling_ya_lewati_button_validation();
        await Profiling.click_profiling_ya_lewati_button();
    });
    ```

### [Best Practices](#best-practices)

1. Selector Naming:
    - Use descriptive names: `welcome_screen_buat_akun_button`
    - Include page/component name as prefix
    - Include element type as suffix
2. Method Naming:
    - Actions: Use verb prefixes (click\_, fill\_, select\_)
    - Validations: Use descriptive state checks (enabled, \_disabled, \_visible)
3. Cross-Platform Support:
    - Always include both Android and iOS selectors
    - Use platform check: `browser.capabilities.platformName === "Android"`
4. Documentation:
    - Add JSDoc comments for classes and methods
    - Include expected results in action methods
    - Document any complex logic or workflows
5. Test Organization:
    - Group related tests using `describe` blocks
    - Use tags for test categorization (@regression, @smoke)
    - Include severity levels for test cases

This structure helps maintain clean, reusable, and maintainable test code while following the Page Object Model pattern.

## Reporting Issues

If you encounter any issues or bugs, please submit them via the Issues tab on this repository with a detailed description and steps to reproduce the problem.

---

> For more information or assistance, feel free to contact the team or refer to the project documentation.

## Table of Contents

- [SQUAT-APPS](#squat-apps)
  - [Goals](#goals)
  - [Key Technologies](#key-technologies)
  - [Contribution Guidelines](#contribution-guidelines)
  - [Getting Started with Page Object Model Testing](#getting-started-with-page-object-model-testing)
    - [Page Object Structure](#page-object-structure)
    - [Creating Page Objects](#creating-page-objects)
    - [Writing Test Specs](#writing-test-specs)
    - [Best Practices](#best-practices)
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

4. After successfully cloning the repository, perform `npm install` at `android` folder, `ios` folder, and `root` folder to install dependencies.

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
