# MOS360 Content Lifecycle

## 1. Import

Source:
Google Sheet / JSON

Ownership:
runtime/import/

Purpose:
external lesson ingestion

---

## 2. Normalize

Ownership:
runtime/content/runtimeLessonNormalizer.js

Purpose:
canonical lesson structure

---

## 3. Validate

Ownership:
validation/

Purpose:
lesson integrity and structure validation

---

## 4. Readiness

Ownership:
runtimeLessonReadinessEngine.js

Purpose:
runtime quality checking

---

## 5. Publish

Ownership:
publishingPipeline.js

Purpose:
runtime availability

---

## 6. Runtime

Ownership:
runtimeLessonService.js

Purpose:
runtime lesson retrieval

---

## 7. Mutation

Ownership:
lessonMutationPipeline.js

Purpose:
safe lesson evolution