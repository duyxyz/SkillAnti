# Skill: Flutter Android Native-First Development

This skill defines the development patterns for building high-quality, Android-only Flutter applications using Material 3 and a standardized project structure.

## Core Principles

1.  **Platform Focus**: The project is exclusively for Android. All development, testing, and configuration must target Android features (Material 3, Android Permissions, Intent filters, etc.).
2.  **UI/UX**: Strictly adhere to Material 3 (M3). Use `useMaterial3: true` in the `ThemeData`. Prioritize AMOLED black or high-fidelity custom color schemes.
3.  **Project Organization**: Maintain a clean, modular directory structure for scalability.

## Directory Structure

All source code resides in `lib/`, organized as follows:
- `lib/screens/`: Full-page widgets (e.g., `home_screen.dart`).
- `lib/tabs/`: Separate tabs if using a BottomNavigationBar or PageView (e.g., `home_tab.dart`, `settings_tab.dart`).
- `lib/widgets/`: Reusable UI components (e.g., `custom_card.dart`, `loading_overlay.dart`).
- `lib/services/`: Logic for external APIs, databases (Supabase, Firebase), or local storage (e.g., `github_service.dart`).
- `lib/utils/`: Helper functions, constants, and extensions (e.g., `app_colors.dart`, `format_helper.dart`).
- `lib/assets/`: Media assets managed within the `lib` folder for better visibility (optional, but consistent with current project).

## Architecture and Logic

1.  **Service-First Architecture**:
    - All business logic (APIs, Database interactions, shared preferences) **MUST** reside in `lib/services/`.
    - Widgets and Screens should only call methods from services and never handle low-level data fetching directly.
2.  **Environment Variables**:
    - Sensitive information (API Keys, Supabase URL, GitHub Tokens) **MUST NOT** be hard-coded.
    - Use a `.env` file and the `flutter_dotenv` package or `dart-define` for secrets.
    - Ensure `.env` is added to `.gitignore`.

## CI/CD and Automation

1.  **GitHub Actions**:
    - Maintain a `.github/workflows/build_apk.yml` for automated releases.
    - This workflow should trigger manually (`workflow_dispatch`) to build and upload release APKs (e.g., `v1.0.X`).
2.  **Asset Registration**:
    - When adding new images or fonts to `lib/assets/`, ensure they are automatically registered in the `flutter: assets:` section of `pubspec.yaml`.

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

### 4. Running the App
1.  Check for devices: `adb devices`
2.  If no device found, start the first emulator: `emulator -avd <name>`
3.  Run app: `flutter run`

## AI Response Pattern
- **Code Generation**: Ensure logic is in `services/`.
- **Security Check**: Remind the user about `.env` if they hard-code keys.
- **Build Support**: If the user asks for a build, guide them to use the `build_apk.md` workflow.
