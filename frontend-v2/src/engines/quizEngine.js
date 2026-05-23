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
// RENDER QUIZ SECTION
// ============================================

export function renderQuizSection(

    quiz = []

) {

    const normalizedQuiz =

        normalizeQuiz(
            quiz
        );

    // ========================================
    // EMPTY
    // ========================================

    if (!normalizedQuiz.length) {

        return "";
    }

    // ========================================
    // QUIZ ENTRY
    // ========================================

    return `

        <section class="lesson-quiz-entry">

            <div class="quiz-entry-shell">

                <div class="quiz-entry-top">

                    <div class="quiz-entry-icon">

                        🧠

                    </div>

                    <div>

                        <div class="quiz-entry-label">

                            KNOWLEDGE CHECK

                        </div>

                        <h2>

                            Kiểm tra kiến thức

                        </h2>

                    </div>

                </div>

                <p class="quiz-entry-description">

                    Hoàn thành ${normalizedQuiz.length}
                    câu hỏi ngắn để củng cố workflow
                    và xác nhận bạn đã hiểu bài học.

                </p>

                <button

                    id="startQuizBtn"

                    class="start-quiz-btn"

                >

                    Bắt đầu kiểm tra

                </button>

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

    // ========================================
    // START BUTTON
    // ========================================

    const startBtn =

        document.querySelector(
            "#startQuizBtn"
        );

    if (!startBtn) {

        return;
    }

    // ========================================
    // OPEN QUIZ
    // ========================================

    startBtn.onclick = () => {

        let currentQuestion = 0;

        let score = 0;

        renderQuizModal();

        // ====================================
        // RENDER QUESTION
        // ====================================

        function renderQuestion() {

            const question =

                normalizedQuiz[
                currentQuestion
                ];

            const optionsHtml =

                question.options.map(

                    (
                        option,
                        index
                    ) => `

                        <button

                            class="focus-quiz-option"

                            data-answer="${index}"

                        >

                            ${option}

                        </button>

                    `

                ).join("");

            document.querySelector(

                ".focus-quiz-body"

            ).innerHTML = `

                <div class="focus-quiz-progress">

                    Câu ${currentQuestion + 1}
                    / ${normalizedQuiz.length}

                </div>

                <h2 class="focus-quiz-question">

                    ${question.question}

                </h2>

                <div class="focus-quiz-options">

                    ${optionsHtml}

                </div>

            `;

            bindAnswers(question);
        }

        // ====================================
        // ANSWERS
        // ====================================

        function bindAnswers(question) {

            document

                .querySelectorAll(
                    ".focus-quiz-option"
                )

                .forEach((button) => {

                    button.onclick = () => {

                        const answer =

                            Number(
                                button.dataset.answer
                            );

                        const correct =

                            answer ===
                            question.correctAnswer;

                        if (correct) {

                            score += 1;

                            button.classList.add(
                                "correct"
                            );

                        } else {

                            button.classList.add(
                                "wrong"
                            );

                        }

                        setTimeout(() => {

                            currentQuestion += 1;

                            // ====================
                            // FINISH
                            // ====================

                            if (

                                currentQuestion >=
                                normalizedQuiz.length

                            ) {

                                renderQuizResult();

                                return;
                            }

                            renderQuestion();

                        }, 700);
                    };
                });
        }

        // ====================================
        // MODAL
        // ====================================

        function renderQuizModal() {

            const overlay =

                document.createElement(
                    "div"
                );

            overlay.className =
                "focus-quiz-overlay";

            overlay.innerHTML = `

                <div class="focus-quiz-modal">

                    <div class="focus-quiz-body">

                    </div>

                </div>

            `;

            document.body.appendChild(
                overlay
            );

            document.body.style.overflow =
                "hidden";

            renderQuestion();
        }

        // ====================================
        // RESULT
        // ====================================

        function renderQuizResult() {

            document.querySelector(

                ".focus-quiz-body"

            ).innerHTML = `

                <div class="focus-quiz-result">

                    <div class="focus-quiz-score">

                        ${score}
                        / ${normalizedQuiz.length}

                    </div>

                    <h2>

                        Hoàn thành kiểm tra

                    </h2>

                    <p>

                        Bạn đang tiến bộ rất tốt.
                        Hãy tiếp tục duy trì momentum học tập.

                    </p>

                    <button

                        id="closeQuizBtn"

                        class="close-quiz-btn"

                    >

                        Tiếp tục học

                    </button>

                </div>

            `;

            document.querySelector(

                "#closeQuizBtn"

            ).onclick = () => {

                document
                    .querySelector(
                        ".focus-quiz-overlay"
                    )
                    ?.remove();

                document.body.style.overflow =
                    "";
            };
        }
    };
}