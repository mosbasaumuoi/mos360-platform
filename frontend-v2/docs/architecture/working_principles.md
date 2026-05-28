FILE 7 — /docs/architecture/working_principles.md
Working Principles
1. Evolution > Purity

Không rewrite hoảng loạn.

Tiến hóa có kiểm soát.

2. Freeze Before Rewrite

Nếu hệ thống đang usable:

freeze trước.

Đừng đập đi làm lại.

3. Runtime-first Debugging

Debug theo:

ownership
lifecycle
runtime flow

Không debug cảm tính.

4. One Source Of Truth

Mỗi layer:

chỉ có 1 owner.

5. No Duplicate Runtime

Không:

duplicate progression
duplicate telemetry
duplicate lesson ownership.
6. Lightweight First

Ưu tiên:

clarity
speed
maintainability
low cost.
7. Human Experience First

Luôn hỏi:
User có cảm thấy tiến bộ hơn không?
Nếu không:

runtime đang sai hướng.

8. Compatibility bridges over destructive rewrites

ADD:
Evolutionary Runtime Principles
•	Preserve continuity over purity
•	Stabilize before expanding
•	Semantic overlays must augment, not dominate
•	Runtime cooperation over runtime centralization
•	Emotional continuity is a first-class runtime concern
