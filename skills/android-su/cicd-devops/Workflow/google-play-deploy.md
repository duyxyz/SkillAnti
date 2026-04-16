---
name: google-play-deploy
description: Quy trình đẩy bản dựng Flutter Android lên Google Play Console bằng GitHub Actions hoặc Fastlane.
---

# Quy trình Triển khai lên Google Play

Workflow này hướng dẫn bạn cách thiết lập tự động hóa để đẩy ứng dụng Flutter lên các kênh của Google Play (Internal, Alpha, Beta, hoặc Production).

## Bước 1: Thiết lập Google Cloud & API
Để GitHub Actions có quyền truy cập vào Google Play Console, bạn cần:
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/).
2. Tạo một **Service Account** mới với vai trò "Service Account User" và "Google Play Android Developer".
3. Tạo và tải về tệp **Khóa JSON** (JSON Key).
4. Trong Google Play Console, thêm Email của Service Account này vào danh sách người dùng và cấp quyền "Admin" hoặc "Release".

## Bước 2: Cấu hình GitHub Secrets
Thêm nội dung của tệp JSON vừa tải về vào GitHub Secrets của kho lưu trữ của bạn:
- Tên: `SERVICE_ACCOUNT_JSON`
- Giá trị: (Dán toàn bộ nội dung tệp JSON vào đây).

Đồng thời đảm bảo đã có các bí mật về Keystore:
- `KEYSTORE_BASE64`: Tệp .jks được mã hóa base64.
- `STORE_PASSWORD`, `KEY_PASSWORD`, `KEY_ALIAS`.

## Bước 3: Thiết lập Workflow GitHub Actions
Tạo tệp `.github/workflows/deploy_play_store.yml` với nội dung mẫu:

```yaml
name: Deploy to Play Store
on:
  push:
    tags:
      - 'v*' # Chạy khi gắn tag version như v1.0.1

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
      
      # 1. Giải mã Keystore
      - name: Decode Keystore
        run: echo "${{ secrets.KEYSTORE_BASE64 }}" | base64 --decode > android/app/upload-keystore.jks

      # 2. Xây dựng App Bundle (AAB)
      - name: Build AAB
        run: flutter build appbundle --release --build-number=${{ github.run_number }}

      # 3. Đẩy lên Google Play
      - name: Upload to Google Play
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonKeyData: ${{ secrets.SERVICE_ACCOUNT_JSON }}
          packageName: com.example.yourapp
          releaseFiles: build/app/outputs/bundle/release/app-release.aab
          track: internal # Hoặc alpha, beta, production
```

## Bước 4: Kiểm tra và Phê duyệt
1. Sau khi workflow chạy thành công, hãy kiểm tra mục **"Mục phát hành" (Releases)** trong Google Play Console.
2. Nếu là kênh `internal`, bạn có thể mời người dùng thử ngay lập tức.
3. Nếu muốn đẩy lên `production`, bạn cần thực hiện bước phê duyệt thủ công trong Play Console.

## Lưu ý Bảo mật
- Không bao giờ để lộ tệp `SERVICE_ACCOUNT_JSON`.
- Nên sử dụng **GitHub Environments** để thiết lập các quyền phê duyệt cho việc đẩy lên bản Production.
