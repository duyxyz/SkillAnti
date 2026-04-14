---
name: build-android-apk
description: Build a release version of the Android App (APK). Use when the user wants to build, compile, or release an Android APK — either locally via Flutter CLI or automatically via GitHub Actions CI/CD pipeline.
---

# Build Android APK
This workflow provides two ways to build your application for release: locally on your machine or automatically via GitHub Actions.
// turbo-all
## Option 1: Local Build
Build separate APKs for different Android architectures to keep file sizes small.
1. **Clean and Get Packages**
   ```bash
   flutter clean
   flutter pub get
   ```
2. **Generate APKs**
   ```bash
   flutter build apk --release --split-per-abi
   ```
   *The outputs will be in `build/app/outputs/flutter-apk/`.*
---
## Option 2: CI/CD Build (GitHub)
Trigger the automated build pipeline on GitHub to create a formal release with versioning.
1. **Commit your changes**
   Ensure all logic and features are committed to the main branch.
2. **Trigger Workflow**
   You can trigger the workflow from the GitHub "Actions" tab by selecting **"Flutter Build APK"** and clicking **"Run workflow"**.
3. **Verify Release**
   The workflow will automatically:
   - Build the APKs.
   - Create a new GitHub Release (e.g., `v1.0.X`).
   - Upload the APK files to the release.
## Troubleshooting
- **Keystore Error**: If build fails locally, ensure you have the `upload-keystore.jks` and `key.properties` configured in the `android/` folder.
- **Environment Secrets**: Ensure all GitHub Actions secrets (`KEYSTORE_BASE64`, `STORE_PASSWORD`) are set in your GitHub repository settings.