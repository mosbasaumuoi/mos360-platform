// ============================================
// MOS360 CONTINUITY ENGINE
// Learning continuity psychology runtime
// ============================================

// ============================================
// CONTINUITY MESSAGE
// ============================================

export function getContinuityUiMessage(

    completedLessons

) {

    if (completedLessons >= 12) {

        return `

      Bạn đã đi khá xa trong hành trình học tập của mình.
      Sự tự tin và khả năng xử lý thực tế
      đang tăng lên rất rõ rệt.

    `;
    }

    if (completedLessons >= 9) {

        return `

      Tiến trình học tập ổn định này
      sẽ giúp bạn giảm đáng kể áp lực
      khi bước vào bài thi MOS.

    `;
    }

    if (completedLessons >= 6) {

        return `

      Bạn đang xây dựng sự tự tin rất tốt
      khi làm việc với Office thực tế.

    `;
    }

    if (completedLessons >= 4) {

        return `

      Các thao tác và tư duy xử lý bài
      đang trở nên tự nhiên hơn với bạn.

    `;
    }

    if (completedLessons >= 2) {

        return `

      Bạn đang dần quen hơn
      với workflow Office thực tế.

    `;
    }

    return `

    Tiếp tục từng bài nhỏ
    và duy trì nhịp học tự nhiên.

  `;
}

// ============================================
// REINFORCEMENT HTML
// ============================================

export function getReinforcementHtml(

    lessonCompleted

) {

    if (!lessonCompleted) {
        return "";
    }

    return `

    <div class="lesson-completion-banner">

      <div class="completion-icon">

        ✨

      </div>

      <div class="completion-content">

        <h3>

          Bạn vừa hoàn thành thêm một bước nhỏ.

        </h3>

        <p>

          Việc duy trì học tập liên tục theo từng bài nhỏ
          sẽ tạo ra tiến bộ rất lớn theo thời gian.

        </p>

      </div>

    </div>

    <div class="lesson-reinforcement">

      <div class="reinforcement-badge">

        ✅ Bài học đã hoàn thành

      </div>

      <h3>

        Bạn đang xây dựng sự tự tin rất tốt
        với kỹ năng Office thực tế.

      </h3>

      <p>

        Việc học liên tục theo từng bài nhỏ
        sẽ giúp bạn dần tự tin hơn với kỹ năng Office
        và giảm đáng kể áp lực khi làm bài thi MOS thực tế.

      </p>

      <div class="reinforcement-points">

        <div class="reinforcement-point">

          🔥 Tiếp tục giữ nhịp học tự nhiên

        </div>

        <div class="reinforcement-point">

          🎯 Workflow Office đang trở nên tự nhiên hơn

        </div>

        <div class="reinforcement-point">

          💡 Tăng khả năng xử lý tình huống thực tế

        </div>

      </div>

    </div>

  `;
}

// ============================================
// CONTINUITY GUIDANCE
// ============================================

export function getContinuityGuidanceHtml(

    lessonCompleted,
    nextLesson

) {

    if (
        !lessonCompleted
        ||
        !nextLesson
    ) {

        return "";
    }

    return `

    <div class="continuity-guidance">

      <div class="continuity-guidance-label">

        TIẾP TỤC HÀNH TRÌNH

      </div>

      <h3>

        Bạn đã sẵn sàng cho bài học tiếp theo.

      </h3>

      <p>

        Việc duy trì nhịp học đều đặn
        theo từng bước nhỏ sẽ giúp bạn
        tiến bộ nhanh hơn rất nhiều.

      </p>

    </div>

  `;
}