/**
 * MOS360
 * Block Validation Registry
 *
 * RESPONSIBILITY:
 * - approved block types
 * - required fields
 * - block validation ownership
 * - future extensibility
 *
 * MUST NOT:
 * - mutate runtime
 * - render UI
 * - normalize lessons
 */

export const BLOCK_VALIDATION_REGISTRY = {
  text: {
    required: ["content"],
  },

  video: {
    required: ["videoUrl"],
  },

  workflow: {
    required: ["steps"],
  },

  tips: {
    required: ["items"],
  },

  practical: {
    required: ["content"],
  },

  resource: {
    required: ["resources"],
  },

  checkpoint: {
    required: ["title", "message"],
  },

  continuity: {
    required: ["title", "message"],
  },

  quiz: {
    required: ["questions"],
  },

  reinforcement: {
    required: [],
  },
};

export const APPROVED_BLOCK_TYPES = Object.keys(
  BLOCK_VALIDATION_REGISTRY
);

export function isApprovedBlockType(type) {
  return APPROVED_BLOCK_TYPES.includes(type);
}

export function getBlockRequiredFields(type) {
  return BLOCK_VALIDATION_REGISTRY[type]?.required || [];
}

export function isLegacyCompatibleBlock(
  block = {}
) {

  // ==================================
  // LEGACY TEMPLATE-FIRST SUPPORT
  // ==================================

  if (
    block.workflowSteps ||
    block.resources ||
    block.tips
  ) {

    return true;
  }

  return false;
}