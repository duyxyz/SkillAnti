---
name: setup-android-flutter
description: Initialize a Material 3 Flutter project for Android only with feature-based clean architecture, VS Code configuration, and APK build workflow guidance.
---

# Setup Android Flutter Project
This workflow automates the process of creating a new Flutter project that targets only Android, sets up Material 3, configures VS Code for rapid running, and establishes a feature-based clean architecture structure.
// turbo-all
1. **Initialize Project**
   Create a new Flutter project that only includes the Android platform.
   ```bash
   flutter create --platforms android .
   ```
2. **Scaffold Directory Structure**
   Create the necessary folders in the `lib` directory to match the project's modular design.
   ```bash
   mkdir -p lib/features/home/presentation lib/features/home/domain lib/features/home/data lib/shared/widgets lib/core/theme lib/core/constants assets/images assets/fonts
   ```
3. **Bootstrap main.dart**
   Overwrite the default `main.dart` with a pre-configured Material 3 template that boots a feature entry screen.
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
             seedColor: Colors.blue,
             brightness: Brightness.dark,
           ),
           useMaterial3: true,
         ),
         debugShowCheckedModeBanner: false,
         home: const HomePage(),
       );
     }
   }
   class HomePage extends StatelessWidget {
     const HomePage({super.key});
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
                 'Welcome to your Android-only Flutter app',
                 style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
               ),
               Text(
                 'Start by moving this screen into lib/features/home/presentation/.',
                 style: TextStyle(color: Colors.grey),
                 textAlign: TextAlign.center,
               ),
             ],
           ),
         ),
       );
     }
   }
   ```
4. **Scaffold Feature-Based Layers**
   Place the initial app code into the correct feature-based folders.
   ```text
   lib/
     features/
       home/
         presentation/
         domain/
         data/
     shared/
       widgets/
     core/
       theme/
       constants/
   ```
5. **Configure Environment and CI/CD**
   Create a `.env` template only when the project actually needs secrets, and prepare the GitHub Actions workflow directory for building APKs.
   ```bash
   # Create .env
   echo "SUPABASE_URL=your_url_here" > .env
   echo "SUPABASE_ANON_KEY=your_key_here" >> .env
   
   # Add .env to .gitignore
   echo ".env" >> .gitignore
   # Create GitHub Action directory
   mkdir -p .github/workflows
   ```
6. **Update pubspec.yaml Dependencies**
   Add only the dependencies that the feature set actually requires. A minimal example:
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     provider: ^6.1.5
   ```
   Add `flutter_dotenv`, `dio`, `supabase_flutter`, or other packages only when the project explicitly needs them.
7. **Register Assets**
   Register static assets from the root `assets/` folder in `pubspec.yaml`.
   ```yaml
   flutter:
     assets:
       - assets/images/
       - assets/fonts/
   ```
8. **Configure VS Code**
   Create or update the `.vscode/launch.json` to allow "Run and Debug" (F5) to work instantly for Android.
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
9. **Start Emulator and Run**
   Check for available Android devices and start the first emulator if none are running.
   ```bash
   # Check devices
   adb devices
   # Run app
   flutter run
   ```
## Workflow Execution Summary
Once these steps are completed, your project will have an Android-only Flutter baseline with Material 3, a feature-based clean architecture structure, and a build-ready workflow.
