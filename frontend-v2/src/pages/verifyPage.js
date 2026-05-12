import "./verify.css";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function renderVerifyPage(
    certificateId
) {

    return `

<div class="verify-page">

  <div
  id="verify-certificate"
  class="verify-container"
>

  <div class="verify-watermark">

  MOS360

   </div>

    <div class="verify-header">

      <img
        src="/src/assets/mos360-logo.png"
        class="verify-logo"
      />

      <div class="verify-status">

        VALID CERTIFICATE

      </div>

    </div>

    <div class="verify-body">

      <div class="verify-label">

        This credential was issued to

      </div>

      <div class="verify-student">

        Student Name

      </div>

      <div class="verify-course">

        MOS Excel Expert

      </div>

    </div>

    <div class="verify-meta">

      <div class="verify-meta-item">

        <span>Credential ID</span>

        <strong>
          ${certificateId}
        </strong>

      </div>

      <div class="verify-meta-item">

        <span>Issue Date</span>

        <strong>
          ${new Date().toLocaleDateString()}
        </strong>

      </div>

      <div class="verify-meta-item">

        <span>Issued By</span>

        <strong>
          MOS360 Academy
        </strong>

      </div>

    </div>

    <div class="verify-security">

      <img
        class="verify-qr"
        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://mos360.vn/verify/${certificateId}"
      />

      <div
        class="verify-security-text"
      >

        This credential has been
        digitally verified and
        secured by MOS360.

      </div>

    </div>

<div class="verify-actions">

  <button
    class="verify-btn"
    onclick="window.history.back()"
  >

    Back

  </button>

  <button
  id="download-verify-btn"
  class="verify-btn verify-btn-primary"
  >

    Download PDF

  </button>

  <button
  id="linkedin-share-btn"
  class="verify-btn"
  >

    Share LinkedIn

  </button>

</div>

</div>

</div>

  `;
}
    export function initVerifyActions() {

        // ====================================
        // DOWNLOAD PDF
        // ====================================

        const downloadBtn =

            document.querySelector(
                "#download-verify-btn"
            );

        if (downloadBtn) {

            downloadBtn.onclick = async () => {

                const element =

                    document.querySelector(
                        "#verify-certificate"
                    );

                const canvas =
                    await html2canvas(
                        element,
                        {
                            scale: 2,
                            useCORS: true
                        }
                    );

                const imgData =
                    canvas.toDataURL(
                        "image/png"
                    );

                const pdf =
                    new jsPDF(
                        "portrait",
                        "mm",
                        "a4"
                    );

                const pdfWidth = 210;

                const pdfHeight = 297;

                const margin = 10;

                pdf.addImage(
                    imgData,
                    "PNG",
                    margin,
                    margin,
                    pdfWidth - margin * 2,
                    pdfHeight - margin * 2
                );

                pdf.save(
                    "MOS360-credential.pdf"
                );
            };
        }

        // ====================================
        // LINKEDIN SHARE
        // ====================================

        const linkedinBtn =

            document.querySelector(
                "#linkedin-share-btn"
            );

        if (linkedinBtn) {

            linkedinBtn.onclick = () => {

                const verifyUrl =
                    window.location.href;

                const linkedInUrl =

                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        verifyUrl
                    )}`;

                window.open(
                    linkedInUrl,
                    "_blank"
                );
            };
        }
    }

