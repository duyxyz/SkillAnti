---
name: flutter-android-native
description: Use this skill for building Android-only Flutter applications. Triggers include: any Flutter project targeting Android exclusively, requests involving Material 3 setup, Flutter project structure, Android-specific configurations (permissions, intents), CI/CD with GitHub Actions for APK builds, or environment variable handling in Flutter. Also use when the user asks to scaffold, extend, or debug a Flutter Android app, set up VS Code for Flutter Android, or automate APK releases.
---

This skill defines development patterns for building high-quality, Android-only Flutter applications using Material 3 and a standardized project structure.

## Core Principles

1. **Platform Focus**: The project is exclusively for Android. All development, testing, and configuration must target Android features (Material 3, Android Permissions, Intent filters, etc.).
2. **UI/UX**: Strictly adhere to Material 3 (M3). Use `useMaterial3: true` in `ThemeData`. Prioritize AMOLED black or high-fidelity custom color schemes.
3. **Project Organization**: Maintain a clean, modular directory structure for scalability.

## Directory Structure

All source code resides in `lib/`, organized as follows:

- `lib/screens/` — Full-page widgets (e.g., `home_screen.dart`)
- `lib/tabs/` — Separate tabs for `BottomNavigationBar` or `PageView` (e.g., `home_tab.dart`, `settings_tab.dart`)
- `lib/widgets/` — Reusable UI components (e.g., `custom_card.dart`, `loading_overlay.dart`)
- `lib/services/` — Logic for external APIs, databases (Supabase, Firebase), or local storage (e.g., `github_service.dart`)
- `lib/utils/` — Helper functions, constants, and extensions (e.g., `app_colors.dart`, `format_helper.dart`)
- `lib/assets/` — Media assets managed within `lib/` for better visibility

## Architecture and Logic

**Service-First Architecture**:
- All business logic (APIs, database interactions, shared preferences) **MUST** reside in `lib/services/`.
- Widgets and Screens should only call methods from services and never handle low-level data fetching directly.

**Environment Variables**:
- Sensitive information (API Keys, Supabase URL, GitHub Tokens) **MUST NOT** be hard-coded.
- Use a `.env` file with the `flutter_dotenv` package, or `--dart-define` for secrets.
- Ensure `.env` is added to `.gitignore`.

## Development Guidelines

### 1. Project Initialization

```bash
flutter create --platforms android .
```

This ensures no `ios`, `macos`, `web`, or other platform folders are created.

### 2. Standard Material 3 Setup

Always use `useMaterial3: true`. For AMOLED dark mode:

```dart
theme: ThemeData(
  useMaterial3: true,
  scaffoldBackgroundColor: Colors.black,
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.blue,
    brightness: Brightness.dark,
  ),
),
```

### 3. VS Code Setup

`.vscode/launch.json` must target Android explicitly:

```json
{
  "configurations": [
    {
      "name": "Flutter Android",
      "request": "launch",
      "type": "dart",
      "deviceId": "android"
    }
  ]
}
```

### 4. Running the App

```bash
adb devices                        # Check connected devices
emulator -avd <avd_name>           # Start emulator if needed
flutter run                        # Run the app
```

## CI/CD and Automation

**GitHub Actions** (`build_apk.yml`):
- Trigger: `workflow_dispatch` (manual)
- Output: Release APKs uploaded as artifacts or GitHub releases (e.g., `v1.0.X`)
- Maintain this workflow in `.github/workflows/build_apk.yml`

**Asset Registration**:
- When adding new images or fonts to `lib/assets/`, register them in `pubspec.yaml`:

```yaml
flutter:
  assets:
    - lib/assets/images/
    - lib/assets/fonts/
```

## AI Response Pattern

- **Code generation**: Always place logic in `lib/services/`, not in widgets or screens.
- **Security check**: If the user hard-codes API keys or tokens, remind them to use `.env` + `flutter_dotenv` and add `.env` to `.gitignore`.
- **Build support**: If the user asks for a release build, guide them to trigger the `build_apk.yml` GitHub Actions workflow via `workflow_dispatch`.