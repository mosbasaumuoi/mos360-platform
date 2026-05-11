import "./certificate.css";

import html2canvas
from "html2canvas";

import jsPDF
from "jspdf";

export function openCertificateModal({

  studentName,

  courseTitle

}) {

  // ========================================
  // REMOVE OLD
  // ========================================

  const oldModal =

    document.querySelector(
      ".certificate-overlay"
    );

  if (oldModal) {

    oldModal.remove();
  }

  // ========================================
  // CERTIFICATE ID
  // ========================================

  const certificateId =

    `MOS-${Date.now()}`;

  // ========================================
  // CREATE MODAL
  // ========================================

  const overlay =

    document.createElement(
      "div"
    );

  overlay.className =
    "certificate-overlay";

   
  overlay.innerHTML = `

    <div class="certificate-modal">

      <div class="certificate-paper">

        <div class="certificate-logo">

          MOS360

        </div>

        <div class="certificate-title">

          CERTIFICATE

        </div>

        <div class="certificate-subtitle">

          OF COMPLETION

        </div>

        <div class="certificate-text">

          This certifies that

        </div>

        <div class="certificate-name">

          ${studentName}

        </div>

        <div class="certificate-text">

          has successfully completed

        </div>

        <div class="certificate-course">

          ${courseTitle}

        </div>

        <div class="certificate-footer">

          <div
            class="certificate-signature"
          >

            <div
              class="certificate-signature-line"
            ></div>

            <div>

              MOS360 Director

            </div>

          </div>

          <div>

            📅
            ${new Date().toLocaleDateString()}

          </div>

        </div>

        <div class="certificate-id">

          Certificate ID:
          ${certificateId}

        </div>

      </div>

      <div class="certificate-actions">

        <button
          class="certificate-btn close-certificate"
        >

          Close

        </button>

        <button
          class="certificate-btn download-certificate"
        >

          Download PDF

        </button>

      </div>

    </div>

  `;

  // ========================================
  // APPEND TO BODY
  // ========================================

  document.body.appendChild(
    overlay
  );

  // ========================================
  // CLOSE
  // ========================================

  overlay
    .querySelector(
      ".close-certificate"
    )
    .onclick = () => {

      overlay.remove();
    };

  // ========================================
  // CLICK OUTSIDE
  // ========================================

  overlay.onclick = (event) => {

    if (
      event.target === overlay
    ) {

      overlay.remove();
    }
  };

  // ========================================
  // DOWNLOAD
  // ========================================

  overlay
    .querySelector(
      ".download-certificate"
    )
    .onclick = () => {

      const certificateElement =

  overlay.querySelector(
    ".certificate-paper"
  );

html2canvas(

  certificateElement,

  {
    scale: 2,
    useCORS: true
  }

).then((canvas) => {

  const imageData =

    canvas.toDataURL(
      "image/png"
    );

  // ======================================
  // PDF
  // ======================================

  const pdf =

    new jsPDF({

      orientation:
        "landscape",

      unit:
        "px",

      format:
        [canvas.width, canvas.height]

    });

  pdf.addImage(

    imageData,

    "PNG",

    0,

    0,

    canvas.width,

    canvas.height

  );

  pdf.save(

    `${courseTitle}-certificate.pdf`

  );
});
    };
}