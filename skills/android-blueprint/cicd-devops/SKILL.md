---
name: CI/CD & DevOps
description: Skills for CI/CD management, test automation, secrets management (Keystore), and the application submission process (Play Store/App Store).
---

# Skill: CI/CD & DevOps Standard

This skill defines the standards for operations, automation, and security throughout the application development lifecycle.

## 1. Test Automation
- **Continuous Testing**: Every Pull Request (PR) must trigger an automated Unit Test and Linting process.
- **Coverage Standard**: Encourage achieving a minimum code coverage of 70% for the Domain Logic layer.
- **UI Testing**: Critical flows (Happy Path) must be tested using Integration Tests in the CI environment.

## 2. Secrets Management & Security
- **No Hardcoding**: Under no circumstances should API Keys, Tokens, or passwords be stored in the source code.
- **GitHub Secrets**: Use GitHub Actions Secrets to store:
    - `KEYSTORE_BASE64`: The .jks file encoded in base64.
    - `KEY_PROPERTIES`: Key properties file content.
    - `SERVICE_ACCOUNT_JSON`: The JSON key for the Google Cloud service account.
- **Environment Separation**: Clearly separate secrets between `Staging` and `Production`.

## 3. Build & Ops Process
- **Artifact Management**: Use GitHub Actions to store build files (Artifacts) from CI runs for easy download and verification.
- **Versioning**: Automatically increment the build number based on tags or workflow runs to avoid duplicates when pushing to the Store.

## 4. Post-release Quality Control
- **Error Monitoring**: Mandatory integration of Sentry or Crashlytics. Check for crash reports immediately after a new version is released.
- **Logging**: Ensure logs are pushed to a centralized monitoring system for remote error tracking.

## 5. App Store/Play Store Deployment Process
- **Automated Deploy**: Use **Fastlane** or dedicated Actions to push builds to testing channels (Internal Testing, TestFlight).
- **Manual Gate**: Pushing to the Production channel must require a manual approval step (Approval) rather than being fully automated.

## Related References
- [Clean Architecture](file:///c:/Users/PC/Documents/Github/skills/skills/clean-code/SKILL.md)
- [Flutter Android Setup](file:///c:/Users/PC/Documents/Github/skills/skills/android-su/flutter-setup/SKILL.md)
