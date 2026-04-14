---
name: build-android-apk
description: >
  Build a release APK for an Android Flutter app, either locally or via GitHub Actions CI/CD.
  Use this skill when the user wants to build, release, or distribute their Android app —
  including triggers like "build APK", "tạo bản release", "upload lên GitHub", "CI/CD build",
  or any question about keystore, signing, or GitHub Actions workflow for Flutter.
---

# Build Android APK

Two ways to build a release APK: locally or via GitHub Actions.

---

## Option 1: Local Build

```bash
flutter clean
flutter pub get
flutter build apk --release --split-per-abi
```

Output: `build/app/outputs/flutter-apk/`

Split-per-ABI tạo ra nhiều file nhỏ hơn thay vì một file fat APK.

---

## Option 2: GitHub Actions (CI/CD)

1. Commit tất cả thay đổi lên `main` branch.
2. Vào tab **Actions** trên GitHub → chọn **"Flutter Build APK"** → **"Run workflow"**.
3. Workflow sẽ tự động:
   - Build các APK.
   - Tạo GitHub Release mới (e.g., `v1.0.X`).
   - Upload APK files vào release.

---

## Troubleshooting

| Lỗi | Cách xử lý |
|---|---|
| Keystore error (local) | Kiểm tra `upload-keystore.jks` và `key.properties` trong thư mục `android/` |
| Secrets missing (CI) | Đảm bảo `KEYSTORE_BASE64`, `STORE_PASSWORD` đã được set trong GitHub repo Settings → Secrets |
