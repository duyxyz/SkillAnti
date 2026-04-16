---
name: auto-tag-release
description: Tự động tính toán phiên bản tiếp theo theo quy tắc x.y.9 -> x.y+1.0 và gắn tag GitHub Release.
---

# Workflow: Tự động Gắn thẻ Release

Workflow này tự động hóa việc tăng số phiên bản và gắn thẻ Git mỗi khi có code mới được merge vào nhánh chính.

## Logic Đánh số Phiên bản
- Phiên bản hiện tại được đọc từ Git Tag gần nhất (hoặc mặc định là `1.0.0`).
- Nếu phần patch < 9: Tăng patch thêm 1.
- Nếu phần patch >= 9: Reset patch về 0 và tăng minor thêm 1.

## Cấu hình GitHub Action
Tạo tệp `.github/workflows/auto_tag.yml`:

```yaml
name: Auto Tag & Release
on:
  push:
    branches:
      - main

jobs:
  tag:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Cần thiết để lấy toàn bộ lịch sử tag

      - name: Get Latest Tag
        id: get_tag
        run: |
          latest_tag=$(git describe --tags --abbrev=0 2>/dev/null || echo "v1.0.0")
          echo "latest=$latest_tag" >> $GITHUB_OUTPUT

      - name: Calculate Next Version
        id: next_version
        run: |
          tag=${{ steps.get_tag.outputs.latest }}
          # Loại bỏ ký tự 'v' nếu có
          version=${tag#v}
          IFS='.' read -r major minor patch <<< "$version"
          
          if [ "$patch" -lt 9 ]; then
            patch=$((patch + 1))
          else
            patch=0
            minor=$((minor + 1))
          fi
          
          new_tag="v$major.$minor.$patch"
          echo "target=$new_tag" >> $GITHUB_OUTPUT
          echo "Next version will be: $new_tag"

      - name: Create Tag and Release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: ${{ steps.next_version.outputs.target }}
          name: Release ${{ steps.next_version.outputs.target }}
          body: |
            Tự động phát hành phiên bản ${{ steps.next_version.outputs.target }}.
            Xem chi tiết các thay đổi trong lịch sử commit.
          draft: false
          prerelease: false
```

## Cách Tối ưu Cache (Bonus)
Để tăng tốc CI, hãy thêm bước sau vào các workflow xây dựng:

```yaml
      - name: Cache Flutter dependencies
        uses: actions/cache@v4
        with:
          path: |
            ~/.pub-cache
          key: ${{ runner.os }}-flutter-${{ hashFiles('**/pubspec.lock') }}
          restore-keys: |
            ${{ runner.os }}-flutter-
```

## Lưu ý
- Đảm bảo GitHub Action có quyền **Write** vào repository (`Settings > Actions > General > Workflow permissions`).
- Quy tắc này giúp kiểm soát số lượng patch (tối đa 10 bản vá mỗi minor version).
