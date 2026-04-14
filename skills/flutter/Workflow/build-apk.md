---
name: flutter-build-apk
description: Use this skill when the user wants to build, release, or export an Android APK from a Flutter project. Triggers include: requests to build a release APK, questions about signing or keystore setup, CI/CD pipeline for Flutter Android, GitHub Actions APK automation, troubleshooting build errors (keystore, secrets, ABI splits), or any mention of generating an installable Android app file.
---

This skill covers two ways to build a Flutter Android release APK: locally on your machine, or automatically via GitHub Actions CI/CD.

## Option 1: Local Build

Build split APKs per ABI to minimize file size.

```bash
# Clean and fetch dependencies
flutter clean
flutter pub get

# Build release APKs split by architecture
flutter build apk --release --split-per-abi
```

Output files will be in `build/app/outputs/flutter-apk/`.

## Option 2: CI/CD Build via GitHub Actions

1. **Commit changes** — ensure all logic and features are committed to the main branch.
2. **Trigger workflow** — go to the GitHub **Actions** tab, select **"Flutter Build APK"**, and click **"Run workflow"**.
3. **Verify release** — the workflow will automatically:
   - Build the split APKs
   - Create a new GitHub Release (e.g., `v1.0.X`)
   - Upload the APK files to the release

## Troubleshooting

**Keystore Error (local)**
Ensure `upload-keystore.jks` and `key.properties` are present and correctly configured in the `android/` folder.

**Missing Secrets (CI/CD)**
Ensure the following secrets are set in your GitHub repository settings:
- `KEYSTORE_BASE64`
- `STORE_PASSWORD`