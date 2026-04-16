---
name: build-android-apk
description: Xây dựng phiên bản phát hành (release) của ứng dụng Android (APK). Sử dụng khi người dùng muốn xây dựng, biên dịch hoặc phát hành APK Android — qua Flutter CLI cục bộ hoặc tự động qua GitHub Actions.
---

# Xây dựng APK Android

Workflow này cung cấp hai cách để xây dựng ứng dụng của bạn để phát hành: cục bộ trên máy tính của bạn hoặc tự động thông qua GitHub Actions.

// turbo-all
## Lựa chọn 1: Xây dựng Cục bộ (Local Build)
Xây dựng các APK riêng biệt cho các kiến trúc Android khác nhau để giữ kích thước tệp nhỏ.

1. **Dọn dẹp và Tải Packages**
   ```powershell
   flutter clean
   flutter pub get
   ```

2. **Tạo APK**
   ```powershell
   flutter build apk --release --split-per-abi
   ```
   *Kết quả sẽ nằm trong thư mục `build/app/outputs/flutter-apk/`.*

---

## Lựa chọn 2: Xây dựng CI/CD (GitHub)
Kích hoạt quy trình xây dựng tự động trên GitHub để tạo một bản phát hành chính thức với phiên bản cụ thể.

1. **Commit các thay đổi của bạn**
   Đảm bảo toàn bộ logic và tính năng đã được commit vào nhánh `main`.

2. **Kích hoạt Workflow**
   Bạn có thể kích hoạt workflow từ tab "Actions" trên GitHub bằng cách chọn **"Flutter Build APK"** và nhấp vào **"Run workflow"**.

3. **Xác minh Bản phát hành (Release)**
   Workflow sẽ tự động:
   - Xây dựng các APK.
   - Tạo một bản phát hành GitHub mới (ví dụ: `v1.0.X`).
   - Tải các tệp APK lên bản phát hành.

## Khắc phục sự cố
- **Lỗi Keystore**: Nếu quá trình xây dựng cục bộ thất bại, hãy đảm bảo bạn đã cấu hình `upload-keystore.jks` và `key.properties` trong thư mục `android/`.
- **Bí mật Môi trường (Secrets)**: Đảm bảo tất cả các bí mật GitHub Actions (`KEYSTORE_BASE64`, `STORE_PASSWORD`) đã được thiết lập trong cài đặt kho lưu trữ GitHub của bạn.