---
name: setup-android-flutter
description: Initialize a high-fidelity Material 3 Flutter project for Android only. Use when the user wants to create, scaffold, or bootstrap a new Flutter Android project with Material 3, VS Code configuration, directory structure, and CI/CD setup.
---

# Setup Android Flutter Project
This workflow automates the process of creating a new Flutter project that targets only Android, sets up Material 3, configures VS Code for rapid running, and establishes the preferred directory structure.
// turbo-all
1. **Initialize Project**
   Create a new Flutter project that only includes the Android platform.
   ```bash
   flutter create --platforms android .
   ```
2. **Scaffold Directory Structure**
   Create the necessary folders in the `lib` directory to match the project's modular design.
   ```bash
   mkdir -p lib/screens lib/services lib/tabs lib/utils lib/widgets lib/assets/images lib/assets/fonts
   ```
3. **Bootstrap main.dart**
   Overwrite the default `main.dart` with a pre-configured Material 3 template.
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
4. **Configure Environment and CI/CD**
   Create a `.env` template and the GitHub Actions workflow for building APKs.
   ```bash
   # Create .env
   echo "SUPABASE_URL=your_url_here" > .env
   echo "SUPABASE_ANON_KEY=your_key_here" >> .env
   
   # Add .env to .gitignore
   echo ".env" >> .gitignore
   # Create GitHub Action directory
   mkdir -p .github/workflows
   ```
5. **Update pubspec.yaml Dependencies**
   Add the standard set of professional dependencies.
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
6. **Configure VS Code**
   Create or update the `.vscode/launch.json` to allow "Run and Debug" (F5) to work instantly for Android.
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Flutter Android",
         "request": "launch",
         "type": "dart",
       }
     ]
   }
   ```
7. **Start Emulator and Run**
   Check for available Android devices and start the first emulator if none are running.
   ```bash
   # Check devices
   adb devices
   # Run app
   flutter run
   ```
## Workflow Execution Summary
Once these steps are completed, your project will be a professional-grade Android application with environment security, automated build pipelines, and a modular architecture.