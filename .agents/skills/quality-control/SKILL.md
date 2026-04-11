---
name: Code Quality & Debugging Excellence
description: Quy chuẩn về kiểm soát mã nguồn, log lỗi và các checklist để tìm diệt bug nhanh nhất.
---

# Code Quality & Debugging Standard

## 1. Traceability (Khả năng truy vết)
- **Conventional Commits**: Luôn sử dụng tiền tố (feat, fix, refactor, chore) trong commit message để dễ dàng tra cứu lịch sử thay đổi.
- **Self-Documenting Code**: Ưu tiên đặt tên hàm/biến cực kỳ rõ ràng thay vì viết comment giải thích. Nếu một đoạn code cần comment, hãy cân nhắc refactor nó trước.
- **Git Blame Friendly**: Không gộp quá nhiều thay đổi không liên quan vào một commit. Tách nhỏ các thay đổi để dễ dàng "blame" và hoàn tác khi có lỗi.

## 2. Structured Logging (Ghi log có cấu trúc)
- **Log Levels**: Sử dụng đúng cấp độ log (DEBUG, INFO, WARN, ERROR).
- **Contextual Data**: Khi log lỗi, LUÔN đính kèm các dữ liệu ngữ cảnh (ví dụ: `userId`, `action`, `payload`) nhưng phải bảo mật thông tin nhạy cảm.
- **Trace IDs**: (Đối với Web/App phức tạp) Đảm bảo log có gắn ID phiên làm việc hoặc ID yêu cầu để theo dõi toàn bộ luồng xử lý của một lỗi duy nhất.

## 3. Defensive Programming (Lập trình phòng vệ)
- **Input Validation**: Luôn kiểm tra tính hợp lệ của dữ liệu đầu vào (Zod, Joi, hoặc logic thủ công) trước khi xử lý.
- **Fail Fast**: Thiết kế hệ thống để lỗi xảy ra ngay lập tức tại điểm có vấn đề, thay vì để nó lan truyền sang các module khác.
- **Default States**: Luôn định nghĩa trạng thái mặc định an toàn cho UI và dữ liệu để tránh lỗi "undefined" hoặc "null".

## 4. Debugging Checklist for Agent
Mỗi khi gặp bug hoặc viết code mới, Agent phải tự hỏi:
1. "Nếu đoạn code này lỗi ở máy khách hàng, tôi có đủ log để biết tại sao không?"
2. "Tôi đã kiểm tra dữ liệu đầu vào là null hoặc undefined chưa?"
3. "Hàm này có đang xử lý quá nhiều trách nhiệm không?" (Phải tuân thủ Single Responsibility Principle).
4. "Tôi đã có Unit Test cho trường hợp lỗi (Edge Case) này chưa?"

## 5. Error Monitoring Integration
- Khuyến nghị tích hợp các công cụ giám sát như Sentry (cho cả Web/App) ngay từ ngày đầu tiên.
- Luôn bọc các khối mã quan trọng trong `Error Boundaries` (Web/React) hoặc `Catch All` handlers để ứng dụng không bị "crash" hoàn toàn.
