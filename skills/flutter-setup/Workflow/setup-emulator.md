---
name: setup-android-flutter
description: Khởi tạo dự án Flutter Material 3 chỉ dành cho Android với kiến trúc sạch dựa trên tính năng, cấu hình VS Code và hướng dẫn quy trình xây dựng APK.
---

# Thiết lập Dự án Flutter Android

Workflow này tự động hóa quá trình tạo một dự án Flutter mới chỉ nhắm mục tiêu vào nền tảng Android, thiết lập Material 3, cấu hình VS Code để chạy nhanh và thiết lập cấu trúc kiến trúc sạch dựa trên tính năng.

// turbo-all
1. **Khởi tạo Dự án**
   Tạo một dự án Flutter mới chỉ bao gồm nền tảng Android.
   ```powershell
   flutter create --platforms android .
   ```

2. **Dàn khung Cấu trúc Thư mục**
   Tạo các thư mục cần thiết trong thư mục `lib` để phù hợp với thiết kế module của dự án.
   ```powershell
   # Sử dụng lệnh PowerShell để tạo thư mục phân cấp trên Windows
   mkdir lib/features/home/presentation, lib/features/home/domain, lib/features/home/data, lib/shared/widgets, lib/core/theme, lib/core/constants, assets/images, assets/fonts
   ```

3. **Khởi tạo main.dart**
   Ghi đè `main.dart` mặc định bằng mẫu Material 3 đã được cấu hình sẵn để khởi động màn hình chính của tính năng.
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
             surface: Colors.black,
           ),
           scaffoldBackgroundColor: Colors.black,
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
           backgroundColor: Colors.black,
         ),
         body: const Center(
           child: Column(
             mainAxisAlignment: MainAxisAlignment.center,
             children: [
               Icon(Icons.android, size: 100, color: Colors.green),
               SizedBox(height: 20),
               Text(
                 'Chào mừng đến với ứng dụng Flutter Android',
                 style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
               ),
               Text(
                 'Bắt đầu bằng cách di chuyển màn hình này vào lib/features/home/presentation/.',
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

4. **Cấu hình Môi trường và CI/CD**
   Tạo tệp mẫu `.env` và chuẩn bị thư mục GitHub Actions để xây dựng APK.
   ```powershell
   # Tạo tệp .env
   "SUPABASE_URL=your_url_here" | Out-File -FilePath .env -Encoding utf8
   "SUPABASE_ANON_KEY=your_key_here" | Out-File -FilePath .env -Append -Encoding utf8
   
   # Thêm .env vào .gitignore
   ".env" | Out-File -FilePath .gitignore -Append -Encoding utf8

   # Tạo thư mục GitHub Action
   mkdir .github/workflows
   ```

5. **Cấu hình VS Code**
   Tạo hoặc cập nhật `.vscode/launch.json` để cho phép "Run and Debug" (F5) hoạt động ngay lập tức cho Android.
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

6. **Bắt đầu Emulator và Chạy**
   Kiểm tra các thiết bị Android có sẵn và khởi động emulator đầu tiên nếu không có thiết bị nào đang chạy.
   ```powershell
   # Kiểm tra thiết bị
   adb devices
   # Chạy ứng dụng
   flutter run
   ```

## Tóm tắt Thực hiện Workflow
Sau khi hoàn thành các bước này, dự án của bạn sẽ có một nền tảng Flutter chỉ dành cho Android với Material 3, cấu trúc kiến trúc sạch dựa trên tính năng và một quy trình xây dựng đã sẵn sàng.
