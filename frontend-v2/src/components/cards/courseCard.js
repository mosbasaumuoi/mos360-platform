import "./courseCard.css";

// ============================================
// COURSE CARD
// ============================================

import {
  logCourse
}
  from "../../utils/logger.js";

export function renderCourseCard(
  course
) {

  logCourse(
    "render course card",
    {
      id:
        course.id,

      title:
        course.title
    }
  );

  const formattedPrice =

    course.price
      ?.toLocaleString() || 0;

  return `

    <div
      class="course-card"
      data-id="${course.id}"
    >

      <!-- THUMBNAIL -->

      <div class="course-image">

        <div class="course-image-overlay"></div>

        <div class="course-thumbnail-text">

          ${course.thumbnail}

        </div>

      </div>

      <!-- CONTENT -->

      <div class="course-card-content">

        <div class="course-path-badge">

          LỘ TRÌNH HỌC

        </div>

        <h3>

          ${course.title}

        </h3>

        <p class="course-description">

          ${course.description}

        </p>

        <!-- META -->

        <div class="course-meta">

          <div class="course-meta-item">

            👥 ${course.students || 0}+ học viên

          </div>

          <div class="course-meta-item">

            ⏱ ${course.duration || "Đang cập nhật"}

          </div>

        </div>

        <!-- PRACTICAL -->

        <div class="course-practical">

          ✅ Luyện tập theo hướng thực hành

        </div>

        <!-- FOOT -->

        <div class="course-card-footer">

          <div class="course-price">

            ${formattedPrice}đ

          </div>

          <button class="course-action-btn">

            Xem lộ trình →

          </button>

        </div>

      </div>

    </div>

  `;
}