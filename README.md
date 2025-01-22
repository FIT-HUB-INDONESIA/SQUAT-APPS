# SQUAT-APPS

Welcome to the Fit Hub App Automation Testing repository. This repository is dedicated to maintaining and executing automated test scripts for the Fit Hub application, ensuring high-quality standards for both iOS and Android platforms.

### Goals

The primary goals of this repository are:

1. **Ensure App Reliability:** Automate critical functional, regression, and end-to-end test cases to minimize manual testing efforts and ensure consistent quality across app releases.

2. **Cross-Platform Support (future goal):** Provide a unified automation framework that supports both iOS and Android devices, enabling efficient parallel testing.

3. **Early Defect Detection (future goal):** Identify bugs early in the development cycle by integrating automation tests into the CI/CD pipeline.

4. **Scalable and Maintainable Tests:** Create reusable and modular test scripts that are easy to maintain and adapt as the application evolves.

### Key Technologies

- **Appium:** The primary tool for automating mobile applications on both iOS and Android platforms.
- **Programming Languages:** Scripts are developed in JavaScript for flexibility and ease of use.
- **Node.js:** Used for managing dependencies and running JavaScript-based automation tasks.
- **Android SDK and Xcode:** Required for setting up and running tests on Android and iOS devices, respectively.

### Contribution Guidelines

1. Follow the coding standards defined in the `.eslintrc` and `.prettierrc` files.
2. Write comprehensive comments and documentation for new test cases.
3. Submit pull requests for review and approval before merging changes into the main branch.
4. Ensure all tests pass before submitting any changes.

### Reporting Issues

If you encounter any issues or bugs, please submit them via the Issues tab on this repository with a detailed description and steps to reproduce the problem.

---

For more information or assistance, feel free to contact the team or refer to the project documentation.

## Table of Contents

- [Setting Up an SSH Key with SHA-256](#setting-up-an-ssh-key-with-sha-256)

## Setting Up an SSH Key with SHA-256

Secure Shell (SSH) keys provide a secure way to authenticate with remote systems. Using the SHA-256 algorithm ensures enhanced security for your keys. This guide walks you through generating, configuring, and using an SSH key with SHA-256.

### Step 1: Check Existing SSH Keys

Before generating a new SSH key, check if any existing keys are already set up:

```bash
ls ~/.ssh
```

Look for files such as `id_rsa`, `id_ecdsa`, or `id_ed25519`. If you already have a key you want to use, you can skip the key generation step.

### Step 2 (Optional): Generate a New SSH Key

1. Open a terminal.
2. Run the following command to generate a new SSH key using the SHA-256 algorithm:

    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```

    Replace `your_email@example.com` with your email address.
3. When prompted to enter a file to save the key, press Enter to use the default path or specify a custom path.
4. (Optional) Set a passphrase for additional security.

### Step 3: Add the SSH Key to the SSH Agent

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

### Step 4: Add the Public Key to the Remote System

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

### Step 5: Test the Connection

Verify the SSH connection:

```bash
ssh -T git@github.com
```

If configured correctly, you should see a success message.

```
Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
```