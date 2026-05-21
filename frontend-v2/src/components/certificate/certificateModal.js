import html2canvas
from "html2canvas";

import jsPDF
from "jspdf";

import logo from "../../assets/mos360-logo.png";

import {
  saveCredential
} from "../../utils/credentialStorage";

export function openCertificateModal({

  studentName,

  courseName

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

  const credentialData = {

    certificateId,

    studentName,

    courseName,

    issueDate:
      new Date().toLocaleDateString()
  };

  saveCredential(
    credentialData
  );  

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

<div class="certificate-overlay">

  <div class="certificate-modal">

    <div
      id="certificate-paper"
      class="certificate-paper"
    >

      <div class="certificate-border"></div>

      <div class="certificate-watermark">

        MOS360

      </div>

      <div class="certificate-top">

  <img
    src="${logo}"
    alt="MOS360"
    class="certificate-logo-image"
  />

  <div class="certificate-subtitle">

    CERTIFICATE OF COMPLETION

  </div>

    </div>

      <div class="certificate-body">

        <div class="certificate-awarded">

          THIS CERTIFICATE IS AWARDED TO

        </div>

        <div class="certificate-student">

          ${studentName}

        </div>

        <div class="certificate-description">

          for successfully completing

        </div>

        <div class="certificate-course">

          ${courseName}

        </div>

      </div>

      <div class="certificate-footer">

  <div
    class="certificate-signature-block"
  >

    <div
      class="certificate-digital-badge"
    >

      ✓ Digitally Signed by MOS360

    </div>

    <div
      class="certificate-signature-role"
    >

      Verified Digital Credential

    </div>

  </div>

  <div
    class="certificate-verify-block"
  >

    <div
      class="certificate-qr"
    >

      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://mos360.vn/verify/${certificateId}"
      />

    </div>

    <div
      class="certificate-verify-text"
    >

      Scan to verify credential

    </div>

  </div>

</div>

      <div class="certificate-meta">

  <div>

    Credential ID:
    ${certificateId}

  </div>

  <div>

    Issued:
    ${new Date().toLocaleDateString()}

  </div>

</div>

    </div>

    <div class="certificate-actions">

      <button
        class="certificate-close-btn"
      >

        Close

      </button>

      <button
        id="download-certificate-btn"
        class="certificate-download-btn"
      >

        Download PDF

      </button>

    </div>

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
  // CLOSE BUTTON
  // ========================================

  const closeBtn =

    overlay.querySelector(
      ".certificate-close-btn"
    );

  closeBtn.addEventListener(
    "click",
    () => {

      overlay.remove();

    }
  );

  // ========================================
  // CLICK OUTSIDE TO CLOSE
  // ========================================

  overlay.addEventListener(
    "click",
    (e) => {

      if (
        e.target === overlay
      ) {

        overlay.remove();

      }

    }
  );

  // ========================================
  // DOWNLOAD PDF
  // ========================================

  const downloadBtn =

    overlay.querySelector(
      "#download-certificate-btn"
    );

  downloadBtn.addEventListener(
    "click",
    async () => {

      const certificate =

        overlay.querySelector(
          "#certificate-paper"
        );

      const canvas =
        await html2canvas(
          certificate,
          {
            scale: 3,
            useCORS: true
          }
        );

      const imgData =
        canvas.toDataURL(
          "image/png"
        );

      const pdf =
        new jsPDF(
          "landscape",
          "px",
          [
            canvas.width,
            canvas.height
          ]
        );

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        canvas.width,
        canvas.height
      );

      pdf.save(
        `${courseName}-certificate.pdf`
      );

    }
  );

  // ========================================
  // RETURN CERTIFICATE ID
  // ========================================

  return certificateId;

}