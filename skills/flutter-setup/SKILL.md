---
name: flutter-setup
description: Flutter Android-only setup skill. Use when creating or standardizing a Flutter project with Material 3, feature-based clean architecture, environment configuration, and APK build workflow.
---

# Skill: Flutter Android-Only Setup
This skill defines the setup and development patterns for building Android-only Flutter applications with Material 3 and a feature-based clean architecture structure.
## Core Principles
1.  **Platform Focus**: The project is exclusively for Android. All development, testing, and configuration must target Android features (Material 3, Android Permissions, Intent filters, etc.).
2.  **UI/UX**: Strictly adhere to Material 3 (M3). Use `useMaterial3: true` in the `ThemeData`. Prioritize AMOLED black or high-fidelity custom color schemes.
3.  **Project Organization**: Maintain a feature-based clean architecture structure for scalability and testability.
## Directory Structure
All source code resides in `lib/`, organized as follows:
- `lib/features/`: Each feature owns its `presentation/`, `domain/`, and `data/` layers.
- `lib/features/<feature>/presentation/`: Screens, widgets, and local presentation state.
- `lib/features/<feature>/domain/`: Entities, use cases, and business rules.
- `lib/features/<feature>/data/`: Repositories, models, remote/local data sources.
- `lib/shared/`: Reusable widgets and shared presentation helpers.
- `lib/core/`: App-wide config, theme, constants, error types, and utilities.
- `assets/`: Images, fonts, and other static assets registered in `pubspec.yaml`.
## Architecture and Logic
1.  **Feature-Based Clean Architecture**:
    - Presentation must only handle UI rendering, input handling, and view state.
    - Domain must contain business logic, entities, and use cases independent of frameworks.
    - Data must contain repositories, DTOs/models, and API or local storage integrations.
    - Screens and Widgets must not call APIs directly; they should go through use cases or repositories exposed by the feature.
2.  **State Management**:
    - Use local widget state for simple UI-only interactions.
    - Use `Provider` for small scope dependency injection or state sharing.
    - Use `BLoC` when the feature has complex event/state flows and needs strong testability.
3.  **Environment Variables**:
    - Sensitive information (API Keys, Supabase URL, GitHub Tokens) **MUST NOT** be hard-coded.
    - Use a `.env` file or `dart-define` for secrets, depending on the project's deployment needs.
    - Ensure `.env` is added to `.gitignore`.
## CI/CD and Automation
1.  **GitHub Actions**:
    - Maintain a `.github/workflows/build_apk.yml` for automated releases.
    - This workflow should trigger manually (`workflow_dispatch`) to build and upload release APKs (e.g., `v1.0.X`).
2.  **Asset Registration**:
    - When adding new images or fonts to `assets/`, ensure they are registered in the `flutter: assets:` section of `pubspec.yaml`.
## Development Guidelines
### 1. Initialization
When starting a new project, use:
```bash
flutter create --platforms android .
```
This ensures no `ios`, `macos`, `web`, or other platform folders are created.
### 2. Standard Material 3 setup
Always use `useMaterial3: true` in `ThemeData`. For "AMOLED" mode, use:
```dart
theme: ThemeData(
  useMaterial3: true,
  scaffoldBackgroundColor: Colors.black, // True black
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue, brightness: Brightness.dark),
)
```
### 3. VS Code Setup
Ensure `.vscode/launch.json` is configured specifically for Android:
```json
{
  "name": "Flutter Android",
  "request": "launch",
  "type": "dart",
  "deviceId": "android"
}
```
### 4. Feature Bootstrap
When creating a new feature, follow this structure:
```text
lib/features/auth/
  presentation/
  domain/
  data/
```
Keep cross-feature utilities in `lib/core/` and reusable widgets in `lib/shared/`.
### 5. Running the App
1.  Check for devices: `adb devices`
2.  If no device found, start the first emulator: `emulator -avd <name>`
3.  Run app: `flutter run`
## AI Response Pattern
- **Code Generation**: Place code in the appropriate `presentation`, `domain`, or `data` layer for the target feature.
- **Security Check**: Remind the user about `.env` if they hard-code keys.
- **Build Support**: If the user asks for a build, guide them to use the `build_apk.md` workflow.
