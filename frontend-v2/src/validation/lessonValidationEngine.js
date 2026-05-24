/**
 * MOS360
 * Lesson Validation Engine
 *
 * RESPONSIBILITY:
 * - canonical lesson validation
 * - semantic block validation
 * - runtime-safe validation
 * - compatibility checks
 *
 * MUST NOT:
 * - mutate lessons
 * - render UI
 * - fetch runtime data
 */

import {
  isApprovedBlockType,
  getBlockRequiredFields,
} from "./blockValidationRegistry";

function createValidationResult() {
  return {
    valid: true,
    errors: [],
    warnings: [],
  };
}

function validateDuplicateBlocks(
  blocks,
  result
) {

  const seen = new Set();

  blocks.forEach((block, index) => {

    const key =
      `${block.type}-${index}`;

    if (seen.has(key)) {

      result.warnings.push(
        `Potential duplicate block at index ${index}`
      );
    }

    seen.add(key);
  });
}

function pushError(result, message) {
  result.valid = false;
  result.errors.push(message);
}

function validateLessonIdentity(lesson, result) {
  if (!lesson?.id) {
    pushError(result, "Lesson missing id");
  }

  if (!lesson?.courseId) {
    pushError(result, "Lesson missing courseId");
  }

  if (!lesson?.title) {
    pushError(result, "Lesson missing title");
  }
}

function validateBlocksStructure(blocks, result) {
  if (!Array.isArray(blocks)) {
    pushError(result, "Lesson blocks must be array");
    return;
  }

  blocks.forEach((block, index) => {
    validateBlock(block, index, result);
  });

  validateDuplicateBlocks(
  blocks,
  result
);

}

function validateBlock(block, index, result) {
  if (!block?.type) {
    pushError(result, `Block #${index} missing type`);
    return;
  }

  if (!isApprovedBlockType(block.type)) {

  // ================================
  // LEGACY COMPATIBILITY
  // ================================

  if (
    isLegacyCompatibleBlock(block)
  ) {

    result.warnings.push(
      `Legacy-compatible block detected at index ${index}`
    );

    return;
  }

  pushError(
    result,
    `Unsupported block type: ${block.type}`
  );

  return;
}

  if (!block?.priority) {
    result.warnings.push(
      `Block #${index} missing priority`
    );
  }

  const requiredFields = getBlockRequiredFields(block.type);

  requiredFields.forEach((field) => {
    if (
      block[field] === undefined ||
      block[field] === null
    ) {
      pushError(
        result,
        `Block #${index} (${block.type}) missing required field: ${field}`
      );
    }
  });
}

export function validateLesson(lesson) {
  const result = createValidationResult();

  if (!lesson || typeof lesson !== "object") {
    pushError(result, "Invalid lesson object");
    return result;
  }

  validateLessonIdentity(lesson, result);

  validateBlocksStructure(lesson.blocks, result);

  return result;
}