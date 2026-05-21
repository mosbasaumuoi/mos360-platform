# MOS360 WORKING PRINCIPLES

# PURPOSE

Tài liệu này định nghĩa:
- nguyên tắc phối hợp
- nguyên tắc phát triển
- nguyên tắc kiến trúc
- nguyên tắc kiểm soát phase

giữa:
- Project Owner
- AI Architect
- Future Developers

---

# 1. FOUNDATION FIRST

MOS360 ưu tiên:

- stable runtime foundation
- canonical contracts
- clear ownership
- scalable architecture

trước:
- feature spam
- visual complexity
- over-engineering

---

# 2. STABILIZE → FREEZE → EXTEND

KHÔNG:
- rewrite liên tục
- refactor toàn hệ thống theo cảm hứng

MÀ:
- stabilize
- freeze standards
- extend dần

---

# 3. NO GUESSING RULE

AI MUST NOT:
- guess architecture
- guess variables
- guess runtime flow
- guess ownership
- invent contracts

---

# 4. FILE-FIRST ENGINEERING

Trước khi sửa:
1. xem cây thư mục
2. xem file thật
3. xác định ownership layer
4. xác định runtime flow

---

# 5. FULL FILE PREFERENCE

Nếu file:
- không quá lớn
- liên quan structure

→ ưu tiên replace full file.

Mục tiêu:
- clean architecture
- tránh patch drift
- tránh bug dây chuyền

---

# 6. CHECKPOINT DISCIPLINE

Mỗi phase PHẢI có:
- GOAL
- DONE
- NOT DONE
- FREEZE

rõ ràng.

---

# 7. FOUNDATION ≠ EXPERIENCE PARITY

Foundation hoàn thành:
KHÔNG đồng nghĩa:
experience parity hoàn thành.

Đây là bài học chính của Phase G.2.

---

# 8. DOCUMENTATION IS MEMORY

docs/
là:
official project memory layer.

KHÔNG phụ thuộc:
- chat history
- AI memory
- context window

---

# 9. OWNERSHIP CLARITY

Mỗi layer chỉ chịu:
1 responsibility chính.

Ví dụ:
- normalize
- render
- fetch
- route
- hydrate
- store

KHÔNG duplicate responsibility.

---

# 10. ARCHITECTURE BEFORE FEATURES

Nếu:
feature phá foundation

→ foundation luôn ưu tiên hơn.