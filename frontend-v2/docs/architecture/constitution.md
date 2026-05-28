FILE 2 — /docs/architecture/constitution.md
MOS360 Constitution
Điều luật tối cao của hệ thống
LAW 1 — Runtime-first System

MOS360 là:

adaptive learning runtime.

KHÔNG phải:

CMS
page builder
website học online.

Mọi roadmap phải phục vụ:

progression
continuity
adaptive learning.
LAW 2 — Content > Engine

Engine chỉ có giá trị nếu:

content scale nhanh hơn
authoring dễ hơn
learning tốt hơn.

Nếu engine làm:

content khó tạo hơn
lesson khó maintain hơn
runtime quá phức tạp

=> engine sai hướng.

LAW 3 — SPA Shell Freeze

SPA shell hiện tại:

router
auth
dashboard
admin shell

được freeze.

Không rewrite toàn hệ thống.

Tiến hóa bằng:

Bridge Architecture
LAW 4 — React = Runtime Islands

React chỉ dùng cho:

adaptive runtime
session UI
telemetry UI
authoring runtime
realtime interaction.

React KHÔNG sở hữu:

toàn routing
toàn app shell
toàn hệ thống.
LAW 5 — Engine Independence

Runtime engine phải độc lập UI.

Bao gồm:

progression
telemetry
lifecycle
validation
orchestration.

Không phụ thuộc:

React
CSS
framework UI.
LAW 6 — Lean Before Enterprise

Cấm enterprise hóa sớm.

Không ưu tiên:

microfrontend
enterprise Redux
Kubernetes thinking
SSR complexity
abstraction addiction.

Ưu tiên:

clarity
maintainability
simplicity
momentum.
LAW 7 — Human Experience Above All

KPI cao nhất:

completion
continuity
confidence
employability
legitimacy.

Không phải:

số component
độ fancy UI
framework sophistication.