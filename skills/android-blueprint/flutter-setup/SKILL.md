---
name: Flutter Setup
description: Flutter setup skills specifically for Android. Use when creating or standardizing Flutter projects with Material 3, feature-based clean architecture, environment configuration, and APK build processes.
---

# Skill: Flutter Setup (Android Only)

This skill defines setup and development patterns for Android-only Flutter applications using Material 3 and a feature-based clean architecture structure.

## Core Principles
1.  **Platform Focus**: The project is Android-specific. All development, testing, and configuration must target Android features (Material 3, Android Permissions, Intent filters, etc.).
2.  **User Interface (UI/UX)**: Strictly adhere to Material 3 (M3). Use `useMaterial3: true` in `ThemeData`. Prioritize AMOLED black or high-quality custom color palettes.
3.  **Project Organization**: Maintain a feature-based clean architecture structure to ensure scalability and testability. See details in the [Clean Architecture Standard (Main)](file:///c:/Users/PC/Documents/Github/skills/skills/clean-code/SKILL.md).

## Directory Structure
The entire source code resides in the `lib/` directory, organized as follows:
- `lib/features/`: Each feature owns its own `presentation/`, `domain/`, and `data/` layers.
- `lib/shared/`: Reusable widgets and common UI helpers.
- `lib/core/`: Global app configuration, themes, constants, error types, and utilities.
- `assets/`: Images, fonts, and other static assets registered in `pubspec.yaml`.

## Architecture and Logic
1.  **Feature-based Clean Architecture**:
    - Follow the layer separation rules in the [Clean Architecture Standard](file:///c:/Users/PC/Documents/Github/skills/skills/clean-code/SKILL.md).
    - Screens and Widgets must not call APIs directly; they must go through use cases or repositories provided by that feature.
2.  **State Management**:
    - Use local widget state for simple UI interactions.
    - Use `Provider` for small dependencies or simple shared state.
    - Use `BLoC` when a feature has complex event/state flows and requires high testability.
3.  **Environment Variables**:
    - Sensitive information (API Keys, Tokens) **MUST NOT** be hardcoded.
    - Use `.env` files or `dart-define`. Ensure `.env` is added to `.gitignore`.

## CI/CD and Automation
1.  **Advanced Workflow**: See [CI/CD & DevOps Skill](file:///c:/Users/PC/Documents/Github/skills/skills/android-su/cicd-devops/SKILL.md) and [Google Play Deployment Process](file:///c:/Users/PC/Documents/Github/skills/skills/android-su/cicd-devops/Workflow/google-play-deploy.md).
2.  **GitHub Actions**: Maintain `.github/workflows/build_apk.yml` for manual release builds.
3.  **Asset Registration**: Ensure all new images/fonts are fully registered in the `flutter: assets:` section of `pubspec.yaml`.

## Development Tutorial
### 1. Project Initialization
Use the following command to ensure directories for other platforms are not created:
```bash
flutter create --platforms android .
```

### 2. Material 3 & AMOLED Setup
To achieve "pure black" (AMOLED) mode, configure `ThemeData` as follows:
```dart
theme: ThemeData(
  useMaterial3: true,
  brightness: Brightness.dark,
  scaffoldBackgroundColor: Colors.black,
  appBarTheme: const AppBarTheme(backgroundColor: Colors.black, elevation: 0),
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.blue,
    brightness: Brightness.dark,
    surface: Colors.black, // Ensure surfaces are also black
  ),
)
```

### 3. VS Code Setup
Configure `.vscode/launch.json` specifically for Android:
```json
{
  "name": "Flutter Android",
  "request": "launch",
  "type": "dart",
  "deviceId": "android"
}
```

### 4. Running the App
1. Check devices: `adb devices`
2. If no device is present, start the emulator: `emulator -avd <emulator_name>`
3. Run the App: `flutter run`

## AI Response Plan
- **Code Generation**: Place code in the correct layer (presentation, domain, data) of the target feature.
- **Security Check**: Remind the user about `.env` if they hardcode keys.
- **Build Support**: If the user requests a build, guide them to use the `build-apk.md` workflow.
