// ============================================
// MOS360 DASHBOARD ACTIONS
// Dashboard interaction runtime
// ============================================

import {
  navigate
}
from "../../core/router.js";

import {
  parseXpReward
}
from "../../engines/rewardEngine.js";

import {
  getStorage,
  setStorage
}
from "../../utils/localStorageHelpers.js";

import {
  STORAGE_KEYS
}
from "../../constants/storageKeys.js";

import {
  openCertificateModal
}
from "../../components/certificate/certificateModal.js";

// ============================================
// CONTINUE LEARNING
// ============================================

export function bindContinueLearning() {

  // ========================================
  // HERO BUTTON
  // ========================================

  const continueHeroBtn =

    document.querySelector(
      ".continue-hero-btn"
    );

  if (continueHeroBtn) {

    continueHeroBtn.onclick = () => {

      navigate(

        `/learn/${continueHeroBtn.dataset.courseId}/${continueHeroBtn.dataset.lessonId}`

      );
    };
  }

  // ========================================
  // COURSE BUTTONS
  // ========================================

  document
    .querySelectorAll(
      ".continue-btn"
    )
    .forEach((button) => {

      button.onclick = () => {

        navigate(

          `/learn/${button.dataset.courseId}/${button.dataset.lessonId}`

        );
      };
    });
}

// ============================================
// CLAIM REWARDS
// ============================================

export function bindClaimRewards({

  claimedRewards,
  renderDashboardPage

}) {

  document
    .querySelectorAll(
      ".claim-btn"
    )
    .forEach((button) => {

      button.onclick = () => {

        const reward =

          parseXpReward(
            button.dataset.reward
          );

        let xp =

          Number(

            getStorage(
              STORAGE_KEYS.USER_XP,
              0
            )

          );

        xp += reward;

        setStorage(
          STORAGE_KEYS.USER_XP,
          xp
        );

        claimedRewards.push(
          button.dataset.missionId
        );

        setStorage(

          STORAGE_KEYS.CLAIMED_REWARDS,

          claimedRewards

        );

        renderDashboardPage();
      };
    });
}

// ============================================
// CERTIFICATE
// ============================================

export function bindCertificates({

  certificates

}) {

  document
    .querySelectorAll(
      ".certificate-btn"
    )
    .forEach((button) => {

      button.onclick = () => {

        const credential =

          certificates.find(

            item =>

              item.courseName
              ===
              button.dataset.courseTitle

          );

        openCertificateModal({

          studentName:
            credential?.studentName
            || "Student",

          courseName:
            credential?.courseName
            || button.dataset.courseTitle

        });
      };
    });
}