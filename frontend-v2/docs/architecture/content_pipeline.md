FILE 5 — /docs/architecture/content_pipeline.md
Content Pipeline
Mục tiêu

MOS360 phải có:

Content Operating System

Không chỉ:

hardcoded lessons
PIPELINE FLOW
Spreadsheet Import
    ↓
Runtime Normalize
    ↓
Semantic Validation
    ↓
Runtime Bridge
    ↓
Legacy Learn Renderer

Và cần nói rõ:

validation PASS != render PASS
IMPORT PIPELINE
Nguồn dữ liệu
Google Sheet
JSON
future API.
Import responsibilities
parse
normalize
validate
semantic transform.
VALIDATION ENGINE
Validate:
lesson shape
block shape
semantic correctness
runtime readiness.
RUNTIME CONTENT STORE
Single Source Of Truth

MOS360 phải có:

1 content truth duy nhất.

Không duplicate lesson ownership.

AUTHORING RUNTIME

Admin có thể:

edit lesson
edit block
reorder block
preview runtime
validate lesson
save draft
publish.
PUBLISH FLOW
Draft
↓
Validation
↓
Ready
↓
Publish
↓
Runtime Available
IMPORTANT PRINCIPLE

MOS360 KHÔNG phải:

generic CMS

Authoring phải xoay quanh:

progression
continuity
employability
confidence.