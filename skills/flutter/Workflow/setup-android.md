---
name: flutter-android-setup
description: Use this skill when the user wants to initialize or scaffold a new Flutter Android-only project. Triggers include: setting up a new Flutter project for Android, bootstrapping Material 3, creating the standard lib/ directory structure, configuring VS Code for Flutter Android debugging, setting up .env and .gitignore, adding standard pubspec.yaml dependencies, or preparing a GitHub Actions workflow directory. Also use when the user asks to "start a new Flutter app" or "set up a Flutter Android project from scratch".
---

This skill automates creating a new Flutter project targeting Android only, with Material 3, modular structure, environment security, and VS Code debug configuration.

## Steps

### 1. Initialize Project

```bash
flutter create --platforms android .
```

### 2. Scaffold Directory Structure

```bash
mkdir -p lib/screens lib/services lib/tabs lib/utils lib/widgets lib/assets/images lib/assets/fonts
```

### 3. Bootstrap `main.dart`

Overwrite the default `main.dart` with this Material 3 template:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Android App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      debugShowCheckedModeBanner: false,
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Android Material 3'),
        centerTitle: true,
      ),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.android, size: 100, color: Colors.green),
            SizedBox(height: 20),
            Text(
              'Welcome to your Android-only App',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Text('Material 3 is enabled.', style: TextStyle(color: Colors.grey)),
          ],
        ),
      ),
    );
  }
}
```

### 4. Configure Environment and CI/CD

```bash
# Create .env template
echo "SUPABASE_URL=your_url_here" > .env
echo "SUPABASE_ANON_KEY=your_key_here" >> .env

# Add .env to .gitignore
echo ".env" >> .gitignore

# Create GitHub Actions directory
mkdir -p .github/workflows
```

### 5. Update `pubspec.yaml` Dependencies

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_dotenv: ^5.2.1
  dio: ^5.9.2
  supabase_flutter: ^2.12.0
  path_provider: ^2.1.5
  cached_network_image: ^3.4.1
```

### 6. Configure VS Code

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Flutter Android",
      "request": "launch",
      "type": "dart"
    }
  ]
}
```

### 7. Start Emulator and Run

```bash
adb devices          # Check connected devices
flutter run          # Run the app
```

## Result

After completing these steps, the project will have:
- Android-only platform target
- Material 3 dark theme with modular `lib/` structure
- Environment secrets secured via `.env` + `.gitignore`
- GitHub Actions directory ready for `build_apk.yml`
- VS Code F5 debug configured for Android