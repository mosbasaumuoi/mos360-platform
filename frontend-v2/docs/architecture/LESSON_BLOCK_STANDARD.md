# MOS360 LESSON BLOCK STANDARD

# PURPOSE

Tài liệu này định nghĩa:
- canonical lesson block system
- semantic block contracts
- render behavior
- runtime hydration rules
- cinematic learning composition rules

để:
- mọi lesson render thống nhất
- AI không drift block structure
- CMS tương lai obey canonical standard

---

# 1. OFFICIAL LESSON MODEL

## CANONICAL STANDARD

```js
{
  id,
  courseId,
  title,
  description,
  blocks: [],
  quiz: []
}
2. OFFICIAL BLOCK MODEL
MINIMUM CONTRACT
{
  type,
  priority
}
3. BLOCK PRIORITY STANDARD
PRIMARY

Dùng cho:

core learning flow
lesson progression
main instructional content

Ví dụ:

text
workflow
video
SECONDARY

Dùng cho:

hỗ trợ học tập
reinforcement nhẹ
bổ sung kiến thức

Ví dụ:

tips
resources
practical
REINFORCEMENT

Dùng cho:

continuity
motivation
momentum
checkpoint

Ví dụ:

checkpoint
continuity
reinforcement
4. TEXT BLOCK
CONTRACT
{
  type: "text",
  priority,
  content
}
RESPONSIBILITY

Render:

lesson narrative
formatted content
instructional explanation
CONTENT FORMAT
<h2>Title</h2>
<p>Description</p>

HTML rendering allowed.

5. VIDEO BLOCK
CONTRACT
{
  type: "video",
  priority,
  videoUrl,
  title
}
RESPONSIBILITY

Render:

embedded learning video
tutorial playback
guided visual instruction
UI PRINCIPLE

Video là:

primary lesson focus

KHÔNG:

hidden tiny element
duplicated card
stacked multiple times
6. WORKFLOW BLOCK
CONTRACT
{
  type: "workflow",
  priority,
  title,
  steps:[]
}
RESPONSIBILITY

Render:

step-by-step execution
practical learning progression
workflow training
UI PRINCIPLE

Workflow phải:

dễ scan
không wall-of-text
practical-first
7. TIPS BLOCK
CONTRACT
{
  type: "tips",
  priority,
  title,
  items:[]
}
RESPONSIBILITY

Render:

practical shortcuts
optimization tips
productivity habits
UI PRINCIPLE

Tips:

concise
lightweight
quick consumption
8. PRACTICAL BLOCK
CONTRACT
{
  type: "practical",
  priority,
  content
}
RESPONSIBILITY

Render:

real-world application
practical exercises
applied workflow
9. RESOURCE BLOCK
CONTRACT
{
  type: "resource",
  priority,
  resources:[]
}
RESOURCE MODEL
{
  title,
  type,
  url
}
RESOURCE TYPES

SUPPORTED:

video
pdf
document
practice
download
template
10. QUIZ BLOCK
CONTRACT
{
  type: "quiz",
  priority,
  questions:[]
}
RESPONSIBILITY

Render:

reinforcement
knowledge checking
learning validation
11. CHECKPOINT BLOCK
CONTRACT
{
  type: "checkpoint",
  priority,
  title,
  message
}
RESPONSIBILITY

Render:

learning continuity
motivation reinforcement
progression momentum
12. CONTINUITY BLOCK
CONTRACT
{
  type: "continuity",
  priority,
  title,
  message
}
RESPONSIBILITY

Render:

momentum psychology
habit reinforcement
learning consistency
13. FUTURE BLOCK TYPES
PLANNED
summary
exercise
challenge
story
simulation
interactive
mindset
reflection
scenario
14. OFFICIAL RENDER FLOW
TARGET FLOW
Hero
→ Video
→ Narrative Text
→ Workflow
→ Tips
→ Practice
→ Resources
→ Quiz
→ Checkpoint
15. RENDER PRINCIPLES
OFFICIAL RULE
ONE PRIMARY FOCUS PER VIEWPORT
MUST AVOID
giant stacked cards
repeated continuity blocks
duplicated workflow sections
endless scrolling walls
duplicated titles
visual spam
16. BLOCK OWNERSHIP
lessonNormalizer.js

RESPONSIBILITY:

semantic hydration
block creation
canonicalization

MUST NOT:

render UI
lessonBlockRendererEngine.js

RESPONSIBILITY:

render semantic blocks
UI composition

MUST NOT:

mutate lesson structure
17. LEGACY COMPATIBILITY
TEMPLATE-FIRST LESSONS

Ví dụ:

workflowSteps
tips
resources

PHẢI hydrate thành:

blocks:[]

trước khi render.

18. FUTURE CMS DIRECTION
OFFICIAL TARGET

CMS tương lai SHOULD write directly:

blocks:[]
FINAL TARGET
BLOCK-NATIVE AUTHORING
19. CINEMATIC LEARNING PRINCIPLE

MOS360 lesson experience SHOULD feel:

focused
progressive
practical
lightweight
momentum-first

KHÔNG:

overloaded
repetitive
visually noisy
giant content dumps
20. FINAL STANDARD
CANONICAL LESSON TARGET
{
  id,
  courseId,
  title,
  description,
  blocks: [],
  quiz:[]
}

Mọi:

static lessons
imported lessons
CMS lessons
AI-generated lessons

PHẢI converge về standard này.