---
name: setup-android-flutter-project
description: >
  Initialize a new Android-only Flutter project with Material 3, modular directory structure,
  environment config, and VS Code setup. Use this skill when the user wants to create or scaffold
  a new Flutter project — triggers include "tạo project mới", "init Flutter", "setup project",
  "khởi tạo app Android", or any request to bootstrap a Flutter Android app from scratch.
---

# Setup Android Flutter Project

## 1. Initialize Project

```bash
flutter create --platforms android .
```

## 2. Scaffold Directory Structure

```bash
mkdir -p lib/screens lib/services lib/tabs lib/utils lib/widgets lib/assets/images lib/assets/fonts
```

## 3. Bootstrap main.dart

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

## 4. Configure Environment and CI/CD

```bash
# Create .env
echo "SUPABASE_URL=your_url_here" > .env
echo "SUPABASE_ANON_KEY=your_key_here" >> .env

# Add .env to .gitignore
echo ".env" >> .gitignore

# Create GitHub Actions directory
mkdir -p .github/workflows
```

## 5. Update pubspec.yaml Dependencies

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

## 6. Configure VS Code

`.vscode/launch.json`:

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

## 7. Start Emulator and Run

```bash
adb devices   # Check connected devices
flutter run   # Run app
```
