// ============================================
// MOS360 QUIZ ENGINE
// Lightweight lesson reinforcement runtime
// ============================================

import {
    showFeedback
}
    from "../core/feedbackRuntime.js";

import {
    validateQuizQuestion
}
    from "../contracts/quiz.contract.js";

import {
    normalizeQuiz
}
    from "./quizNormalizer.js";

// ============================================
// RENDER QUIZ
// ============================================

export function renderQuizSection(

    quiz = []

) {

    // ========================================
    // NO QUIZ
    // ========================================

    const normalizedQuiz =

        normalizeQuiz(
            quiz
        );

    if (!normalizedQuiz.length) {
        return "";
    }

    // ========================================
    // QUIZ HTML
    // ========================================

    const questionsHtml =

        normalizedQuiz.map(

            (
                question,
                index
            ) => {

                const optionsHtml =

                    question.options.map(

                        (
                            option,
                            optionIndex
                        ) => {

                            return `

                <button

                  class="quiz-option-btn"

                  data-question="${index}"

                  data-answer="${optionIndex}"

                >

                  ${option}

                </button>

              `;
                        }

                    ).join("");

                return `

          <div class="quiz-question-card">

            <div class="quiz-question-number">

              Câu ${index + 1}

            </div>

            <h3>

              ${question.question}

            </h3>

            <div class="quiz-options">

              ${optionsHtml}

            </div>

          </div>

        `;
            }

        ).join("");

    // ========================================
    // SECTION
    // ========================================

    return `

    <section class="lesson-quiz-section">

      <div class="section-heading">

        <h2>

          Củng cố kiến thức

        </h2>

        <p>

          Trả lời nhanh vài câu hỏi ngắn
          để ghi nhớ workflow Office tốt hơn.

        </p>

      </div>

      <div class="quiz-questions">

        ${questionsHtml}

      </div>

    </section>

  `;
}

// ============================================
// BIND QUIZ
// ============================================

export function bindQuiz({

    quiz = []

}) {

    const normalizedQuiz =

        normalizeQuiz(
            quiz
        );

    if (!normalizedQuiz.length) {
        return;
    }

    document
        .querySelectorAll(
            ".quiz-option-btn"
        )

        .forEach((button) => {

            button.onclick = () => {

                const questionIndex =

                    Number(
                        button.dataset.question
                    );

                const answerIndex =

                    Number(
                        button.dataset.answer
                    );

                const question =

                    normalizedQuiz[
                    questionIndex
                    ];

                // ====================================
                // VALIDATE QUESTION
                // ====================================

                const validQuestion =

                    validateQuizQuestion(
                        question
                    );

                if (!validQuestion) {

                    return;
                }    


                const correct =

                    answerIndex ===
                    question.correctAnswer;

                // ====================================
                // RESET QUESTION
                // ====================================

                document
                    .querySelectorAll(

                        `[data-question="${questionIndex}"]`

                    )

                    .forEach((item) => {

                        item.classList.remove(
                            "correct",
                            "wrong"
                        );

                    });

                // ====================================
                // APPLY RESULT
                // ====================================

                button.classList.add(

                    correct
                        ? "correct"
                        : "wrong"

                );

                // ====================================
                // FEEDBACK
                // ====================================

                showFeedback({

                    type:
                        correct
                            ? "success"
                            : "warning",

                    message:

                        correct

                            ? "✅ Chính xác • Bạn đang ghi nhớ rất tốt"

                            : "💡 Chưa đúng • Hãy thử lại để củng cố workflow"

                });
            };
        });
}