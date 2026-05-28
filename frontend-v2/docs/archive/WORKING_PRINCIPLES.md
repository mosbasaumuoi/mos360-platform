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




New ruler MOS360

WORKING DISCIPLINE — MOS360
1. FINAL FILE THINKING
KHÔNG:
patch nhỏ liên tục

↓

MÀ:
finalized runtime/domain file

↓

Mỗi lần sửa:

cohesive
production-shape
ownership rõ
evolution-ready
2. KHÔNG ĐOÁN CODE
Nếu chưa rõ:
file thật
runtime thật
ownership thật
orchestration thật

↓

Tôi sẽ:

hỏi xác nhận file thực tế trước.
3. FILE NGẮN → GỬI FULL FILE

Ví dụ:

runtime engines nhỏ
utilities
panels nhỏ
hooks nhỏ

↓

Tôi sẽ:

gửi full file hoàn chỉnh.
4. FILE DÀI → SURGICAL REPLACEMENT

Ví dụ:

ComposerWorkspace
RuntimeRenderer
SemanticRuntimeBlock
orchestration pipelines

↓

Tôi sẽ:

chỉ rõ block cần xóa
chỉ rõ vị trí insert
chỉ rõ ownership change
tránh paste 1000 dòng hỗn loạn
5. KHÔNG “BUILD SONG SONG”

Tôi sẽ luôn:

ưu tiên converge vào foundation đang tồn tại

KHÔNG:

spawn runtime mới nếu existing runtime đã đủ ownership.
6. NO ARCHITECTURE HALLUCINATION

Sau review project thực tế:
đây là rule cực quan trọng.

↓

Tôi sẽ:

respect runtime reality
respect phase 2 foundations
reuse orchestration hiện có
avoid conceptual overbuilding
7. MỖI STEP = 1 DOMAIN HOÀN CHỈNH

Ví dụ:

KHÔNG:
thêm 1 function nhỏ

↓

MÀ:
Progression Intelligence Consolidation

↓

bao gồm:

canonical ownership
runtime flow
cleanup
migration
integration direction
8. TEST THEO HỆ THỐNG
KHÔNG:
test lẻ tẻ
test từng panel
test từng wording

↓

Mà:

test theo runtime domain hoàn chỉnh.
9. ƯU TIÊN:
COMPLETION > EXPANSION

Từ đây:
mọi quyết định sẽ ưu tiên:

coherence
convergence
operational maturity
production readiness

KHÔNG:

thêm intelligence vô tận.
10. NORTH STAR KHÔNG ĐỔI
MOS360 = Semantic Learning Composition OS

KHÔNG drift thành:

AI dashboard
emotional LMS
feature soup
orchestration spaghetti