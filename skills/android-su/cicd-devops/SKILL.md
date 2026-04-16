---
name: cicd-devops
description: Kỹ năng quản lý CI/CD, tự động hóa kiểm thử, quản lý bí mật (Keystore) và quy trình đẩy ứng dụng lên cửa hàng (Play Store/App Store).
---

# Kỹ năng: CI/CD & DevOps Standard

Kỹ năng này định nghĩa các quy chuẩn về vận hành, tự động hóa và bảo mật trong suốt chu kỳ phát triển ứng dụng.

## 1. Tự động hóa Kiểm thử (Test Automation)
- **Kiểm thử liên tục (Continuous Testing)**: Mọi Pull Request (PR) phải kích hoạt quy trình chạy Unit Test và Linting tự động.
- **Coverage Standard**: Khuyến khích đạt tỷ lệ bao phủ mã nguồn (code coverage) tối thiểu 70% cho lớp Domain Logic.
- **UI Testing**: Các luồng quan trọng (Happy Path) phải được kiểm thử bằng Integration Tests trong môi trường CI.

## 2. Quản lý Bí mật & Bảo mật (Secrets Management)
- **Không Hardcode**: Tuyệt đối không lưu trữ API Key, Token hoặc mật khẩu trong mã nguồn.
- **GitHub Secrets**: Sử dụng GitHub Actions Secrets để lưu trữ:
    - `KEYSTORE_BASE64`: Tệp .jks được mã hóa base64.
    - `KEY_PROPERTIES`: Nội dung tệp thuộc tính khóa.
    - `SERVICE_ACCOUNT_JSON`: Khóa JSON của tài khoản dịch vụ Google Cloud.
- **Môi trường**: Phân tách rõ ràng secrets giữa `Staging` và `Production`.

## 3. Quy trình Xây dựng & Vận hành (Build & Ops)
- **Artifact Management**: Sử dụng GitHub Actions để lưu trữ các tệp dựng (Artifacts) từ các phiên chạy CI để dễ dàng tải về kiểm tra.
- **Versioning**: Tự động tăng số phiên bản (Build Number) dựa trên tag hoặc số lần chạy workflow để tránh trùng lặp khi đẩy lên Store.

## 4. Kiểm soát Chất lượng sau Phát hành (Post-release)
- **Error Monitoring**: Bắt buộc tích hợp Sentry hoặc Crashlytics. Kiểm tra lỗi crash ngay sau khi bản mới được phát hành.
- **Logging**: Đảm bảo log được đẩy về hệ thống giám sát tập trung để truy vết lỗi từ xa.

## 5. Quy trình Đẩy lên App Store/Play Store
- **Automated Deploy**: Sử dụng **Fastlane** hoặc các Action chuyên dụng để đẩy bản dựng lên các kênh thử nghiệm (Internal Testing, TestFlight).
- **Manual Gate**: Việc đẩy lên kênh Production phải có bước phê duyệt thủ công (Approval) thay vì tự động hoàn toàn.

## Tham chiếu liên quan
- [Kiến trúc Sạch (Clean Architecture)](file:///c:/Users/PC/Documents/Github/skills/skills/clean-code/SKILL.md)
- [Thiết lập Flutter Android](file:///c:/Users/PC/Documents/Github/skills/skills/android/flutter-setup/SKILL.md)
