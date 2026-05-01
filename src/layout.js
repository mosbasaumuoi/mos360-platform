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
    .courses-page{
  max-width:1200px;
  margin:auto;
  padding:40px 20px;
}

.page-title{
  font-size:40px;
  margin-bottom:30px;
}

.courses-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:20px;
}

.course-card{
  background:#111827;
  border-radius:16px;
  padding:24px;
  border:1px solid #1f2937;
}

.course-title{
  font-size:24px;
  margin-bottom:12px;
}

.course-desc{
  color:#9ca3af;
  line-height:1.6;
  margin-bottom:20px;
}

.download-btn{
  display:inline-block;
  background:#2563eb;
  color:white;
  padding:12px 20px;
  border-radius:10px;
  text-decoration:none;
}

.download-btn:hover{
  opacity:0.9;
}
.courses-page{
  max-width:1200px;
  margin:auto;
  padding:40px 20px;
}

.page-title{
  font-size:42px;
  margin-bottom:30px;
}

.courses-grid{
  display:grid;
  gap:20px;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
}

.course-card{
  background:#111827;
  border:1px solid #1f2937;
  border-radius:16px;
  padding:24px;
}

.course-title{
  font-size:24px;
  margin-bottom:12px;
}

.course-info{
  color:#9ca3af;
  margin-bottom:20px;
}

.course-btn{
  display:inline-block;
  background:#ea580c;
  color:white;
  padding:12px 20px;
  border-radius:10px;
  text-decoration:none;
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
