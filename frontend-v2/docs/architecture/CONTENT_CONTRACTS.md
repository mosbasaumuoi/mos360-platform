# MOS360 CONTENT CONTRACTS

# 1. COURSE CONTRACT

## REQUIRED

{
  id,
  slug,
  title,
  description,
  category,
  level,
  xpReward,
  lessons:[]
}

---

## OPTIONAL

{
  thumbnail,
  duration,
  difficulty,
  tags,
  objectives,
  requirements,
  skills,
  learningOutcomes,
  version,
  status
}

---

# 2. LESSON CONTRACT

## REQUIRED

{
  id,
  courseId,
  title,
  order,
  xpReward
}

---

## CANONICAL LESSON MODEL

{
  id,
  courseId,
  title,
  description,
  blocks:[],
  quiz:[]
}

---

# 3. BLOCK CONTRACT

## STANDARD

{
  type,
  priority
}

---

# 4. BLOCK TYPES

CURRENT:
- text
- workflow
- tips
- practical
- resource
- checkpoint
- quiz
- continuity
- reinforcement
- video

FUTURE:
- summary
- exercise
- challenge
- interactive
- simulation
- story

---

# 5. NAMING STANDARD

OFFICIAL STYLE:
camelCase

CORRECT:
- courseId
- lessonId
- videoUrl
- workflowSteps
- runtimeBlocks

FORBIDDEN:
- course_id
- lessonID
- VideoURL
- workflow_steps

---

# 6. LEGACY RULE

Template-first lessons:
MUST hydrate into:

blocks: []

before rendering.

---

# 7. FUTURE CMS RULE

Future CMS SHOULD write directly:

blocks: []

instead of raw field rendering.