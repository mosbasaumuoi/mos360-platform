import { CONFIG } from "./config/config.js";

export function layout(content) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>

    <style>
      body {
        margin: 0;
        font-family: Arial;
        background: #0f0f0f;
        color: white;
      }

      header {
        padding: 15px 20px;
        background: #111;
        border-bottom: 1px solid #222;
        display: flex;
        justify-content: space-between;
      }

      footer {
        padding: 30px;
        text-align: center;
        color: #777;
        border-top: 1px solid #222;
        margin-top: 50px;
      }

      button {
        padding: 10px 15px;
        background: #ff5722;
        border: none;
        color: white;
        cursor: pointer;
        border-radius: 6px;
      }
    </style>

  </head>

  <body>

    <header>
      <div><b>MOS360</b></div>
      <div>Hệ sinh thái học MOS</div>
    </header>

    ${content}

    <footer>
      MOS360 © 2026 - Học MOS thật - Thi thật - Đậu thật
    </footer>

  </body>
  </html>
  `;
}
