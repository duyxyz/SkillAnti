---
name: flutter-setup
description: Kỹ năng thiết lập Flutter chỉ dành cho Android. Sử dụng khi tạo hoặc chuẩn hóa dự án Flutter với Material 3, kiến trúc sạch dựa trên tính năng, cấu hình môi trường và quy trình xây dựng APK.
---

# Kỹ năng: Thiết lập Flutter (Chỉ dành cho Android)

Kỹ năng này định nghĩa các khuôn mẫu thiết lập và phát triển cho các ứng dụng Flutter chỉ dành cho Android với Material 3 và cấu trúc kiến trúc sạch dựa trên tính năng.

## Nguyên tắc Cốt lõi
1.  **Tập trung Nền tảng**: Dự án dành riêng cho Android. Mọi hoạt động phát triển, kiểm thử và cấu hình phải hướng tới các tính năng của Android (Material 3, Quyền Android, Intent filters, v.v.).
2.  **Giao diện (UI/UX)**: Tuân thủ nghiêm ngặt Material 3 (M3). Sử dụng `useMaterial3: true` trong `ThemeData`. Ưu tiên màu đen AMOLED hoặc các bảng màu tùy chỉnh chất lượng cao.
3.  **Tổ chức Dự án**: Duy trì cấu trúc kiến trúc sạch dựa trên tính năng để đảm bảo khả năng mở rộng và kiểm thử. Xem chi tiết tại [Tiêu chuẩn Kiến trúc Sạch (Chủ đạo)](file:///c:/Users/PC/Documents/Github/skills/skills/clean-code/SKILL.md).

## Cấu trúc Thư mục
Toàn bộ mã nguồn nằm trong thư mục `lib/`, được tổ chức như sau:
- `lib/features/`: Mỗi tính năng sở hữu các lớp `presentation/`, `domain/`, và `data/` riêng.
- `lib/shared/`: Các widget có thể tái sử dụng và các helper hiển thị chung.
- `lib/core/`: Cấu hình toàn bộ ứng dụng, theme, hằng số, các loại lỗi và tiện ích (utilities).
- `assets/`: Hình ảnh, phông chữ và các tài sản tĩnh khác được đăng ký trong `pubspec.yaml`.

## Kiến trúc và Logic
1.  **Kiến trúc Sạch dựa trên Tính năng**:
    - Tuân thủ các quy tắc phân tách lớp trong [Tiêu chuẩn Kiến trúc Sạch](file:///c:/Users/PC/Documents/Github/skills/skills/clean-code/SKILL.md).
    - Các màn hình (Screens) và Widget không được gọi API trực tiếp; chúng phải đi qua các use case hoặc repository được cung cấp bởi tính năng đó.
2.  **Quản lý Trạng thái (State Management)**:
    - Sử dụng local widget state cho các tương tác UI đơn giản.
    - Sử dụng `Provider` cho các phụ thuộc nhỏ hoặc chia sẻ trạng thái đơn giản.
    - Sử dụng `BLoC` khi tính năng có các luồng sự kiện/trạng thái phức tạp và cần khả năng kiểm thử cao.
3.  **Biến Môi trường**:
    - Thông tin nhạy cảm (API Keys, Token) **KHÔNG ĐƯỢC** viết trực tiếp vào code (hardcode).
    - Sử dụng tệp `.env` hoặc `dart-define`. Đảm bảo `.env` đã được thêm vào `.gitignore`.

## CI/CD và Tự động hóa
1.  **Quy trình chuyên sâu**: Xem thêm tại [Kỹ năng CI/CD & DevOps](file:///c:/Users/PC/Documents/Github/skills/skills/android/cicd-devops/SKILL.md) và [Quy trình Triển khai Google Play](file:///c:/Users/PC/Documents/Github/skills/skills/android/cicd-devops/Workflow/google-play-deploy.md).
2.  **GitHub Actions**: Duy trì `.github/workflows/build_apk.yml` cho các bản dựng phát hành thủ công.
2.  **Đăng ký Tài sản**: Đảm bảo đăng ký đầy đủ hình ảnh/phông chữ mới trong mục `flutter: assets:` của `pubspec.yaml`.

## Hướng dẫn Phát triển
### 1. Khởi tạo Dự án
Sử dụng lệnh sau để đảm bảo không tạo ra các thư mục cho nền tảng khác:
```bash
flutter create --platforms android .
```

### 2. Thiết lập Material 3 & AMOLED
Để đạt được chế độ "đen tuyệt đối" (AMOLED), hãy cấu hình `ThemeData` như sau:
```dart
theme: ThemeData(
  useMaterial3: true,
  brightness: Brightness.dark,
  scaffoldBackgroundColor: Colors.black,
  appBarTheme: const AppBarTheme(backgroundColor: Colors.black, elevation: 0),
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.blue,
    brightness: Brightness.dark,
    surface: Colors.black, // Đảm bảo các bề mặt cũng có màu đen
  ),
)
```

### 3. VS Code Setup
Cấu hình `.vscode/launch.json` dành riêng cho Android:
```json
{
  "name": "Flutter Android",
  "request": "launch",
  "type": "dart",
  "deviceId": "android"
}
```

### 4. Chạy ứng dụng
1. Kiểm tra thiết bị: `adb devices`
2. Nếu không có thiết bị, khởi động emulator: `emulator -avd <tên_máy_ảo>`
3. Chạy App: `flutter run`

## Kế hoạch Phản hồi của AI
- **Sinh mã**: Đặt mã vào đúng lớp (presentation, domain, data) của tính năng mục tiêu.
- **Kiểm tra bảo mật**: Nhắc nhở người dùng về `.env` nếu họ hard-code phím.
- **Hỗ trợ Build**: Nếu người dùng yêu cầu build, hãy hướng dẫn họ sử dụng workflow `build-apk.md`.
