FILE 3 — /docs/architecture/system_boundaries.md
System Boundaries
Mục tiêu

Xác định rõ:

ai sở hữu cái gì.

Đây là file:

anti-spaghetti architecture
1. SPA SHELL
Sở hữu
routing
auth
dashboard shell
admin shell
navigation
layout shell.
Không sở hữu
runtime progression
telemetry
adaptive state.
2. RUNTIME CORE
Thư mục
/src/runtime/
Sở hữu
progression
session lifecycle
adaptive orchestration
telemetry
runtime behaviors
continuity.
Không sở hữu
page layout
navigation
CSS framework.
3. REACT RUNTIME ISLANDS
Sở hữu
adaptive lesson renderer
session HUD
semantic preview
authoring interactions
realtime runtime UI.
Không sở hữu
routing system
global app lifecycle.
4. CONTENT PIPELINE
Sở hữu
import
validation
normalization
publish
content contracts.
5. CONTRACTS
Sở hữu
data shape
runtime shape
validation truth.
Contracts là source-of-truth.
6. TELEMETRY
Sở hữu
interaction events
engagement
momentum
continuity metrics.

Telemetry không được control UI.

| Layer              | Authority               |
| ------------------ | ----------------------- |
| Semantic Validator | acceptance authority    |
| Runtime Readiness  | survivability authority |
| Legacy Renderer    | compatibility authority |
| Governance Layer   | observational authority |


THIS IS NOW A CRITICAL FILE.
Must include:
Runtime Ownership Table
Runtime	Owns	MUST NOT Own
Content Runtime	lessons, blocks, imports	momentum, continuity
Semantic Runtime	overlays, surfaces	renderer authority
Continuity Runtime	streaks, momentum	lesson mutation
Visual Runtime	cinematic pacing	semantic governance
Observability Runtime	diagnostics	runtime control
Reinforcement Runtime	adaptive recovery	persistence mutation
This becomes:
MOS360 boundary freeze map.

