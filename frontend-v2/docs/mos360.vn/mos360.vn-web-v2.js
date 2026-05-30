/* =========================
   MOS360 V2026
   BASELINE CONTRACT LOCKED
   ========================= */

import IC3_LEVEL1 from "./questions/ic3-level1.js";
import IC3_LEVEL2 from "./questions/ic3-level2.js";
import IC3_LEVEL3 from "./questions/ic3-level3.js";
import GENERATIVE_AI from "./questions/generative-ai.js";

const CONFIG = {
    TITLE: "MOS360 - Luyện thi MOS & IC3 GS6",
    LOGO_URL: "https://raw.githubusercontent.com/mosbasaumuoi/mos360-web/main/logo%20vien.png",
    SHEET_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vShTOF13wljdvKF0Olw_s3H4yTMZtlm0LE4Ui7CR-G2OoNQmvrMGUk67YZmoET84GcAV7nu_stXw2zV/pub?output=tsv",
    SHEET_EDIT_URL: "https://docs.google.com/spreadsheets/d/17spoqBAGtinFHQSTGbaDMapFH4nWGS0RHGGhCB5WzqI/edit?gid=0#gid=0",

    SOCIALS: {
        ZALO: "https://zalo.me/0912888360",
        FACEBOOK: "https://facebook.com/mos360",
        MESSENGER: "https://m.me/mos360",
        YOUTUBE: "https://youtube.com/@mos360",
        TIKTOK: "https://tiktok.com/@mos360"
    },

    ADMIN: {
        USER: "admin@mos360",
        PASS: "Mos360"
    }
};

/* ========================
   QUESTION BANK V2
   ========================= */

const COURSE_MAP = {
    "IC3 GS6": [
        ...IC3_LEVEL1,
        ...IC3_LEVEL2,
        ...IC3_LEVEL3
    ],

    "GENERATIVE AI": [
        ...GENERATIVE_AI
    ]
};

/* =========================
   EXAM CONTRACT V2
   ========================= */

const EXAM_CONFIG = {
    QUESTION_COUNT: 45,
    EXAM_DURATION: 50,
    PASS_SCORE: 700,
    MAX_SCORE: 1000,

    TRIAL_DURATION: 10
};

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;

        // ===== FIX 3: API xác thực – chuẩn hóa SĐT và tên khóa trước khi so khớp nhau =====
        if (path === "/api/verify-code") {
            const rawPhone = url.searchParams.get("phone") || "";
            const rawCourse = url.searchParams.get("course") || "";

            // Chuẩn hóa SĐT: bỏ khoảng trắng, chuyển đầu +84 → 0
            function normalizePhone(raw) {
                return raw
                    .trim()
                    .replace(/^\+84/, "0")
                    .replace(/^84/, "0");
            }

            const phone = normalizePhone(rawPhone);
            const course = rawCourse.replace(/\s+/g, " ").trim().toLowerCase();

            if (!phone || !course) {
                return new Response(JSON.stringify({ success: false, msg: "Thiếu thông tin tra cứu!" }), { headers: { "Content-Type": "application/json" } });
            }

            try {
                const resp = await fetch(CONFIG.SHEET_EDIT_URL + "&v=" + Date.now());
                const tsv = await resp.text();
                const rows = tsv.split("\n");

                let isValid = false;
                let reason = "Mã số điện thoại chưa được đăng ký trên hệ thống!";

                for (let i = 1; i < rows.length; i++) {
                    const cols = rows[i].split("\t");
                    if (cols.length >= 2) {
                        // Chuẩn hóa cả dữ liệu sheet
                        const sheetCourse = (cols[0] || "").replace(/\r/g, "").replace(/\s+/g, " ").trim().toLowerCase();
                        const rawSheetPhone = (cols[1] || "").replace(/\r/g, "").trim();
                        const sheetPhone = rawSheetPhone.replace(/^(\+84|84)/, "0");
                        const expireStr = (cols[3] || "").replace(/\r/g, "").trim();

                        if (
                            sheetPhone === phone &&
                            (
                                sheetCourse === course ||
                                sheetCourse.includes(course) ||
                                course.includes(sheetCourse)
                            )
                        ) {

                            if (expireStr) {

                                const parts =
                                    expireStr.includes("/")
                                        ? expireStr.split("/")
                                        : expireStr.split("-");

                                const expireDate =
                                    expireStr.includes("/")
                                        ? new Date(
                                            parseInt(parts[2]),
                                            parseInt(parts[1]) - 1,
                                            parseInt(parts[0]),
                                            23, 59, 59
                                        )
                                        : new Date(
                                            parseInt(parts[0]),
                                            parseInt(parts[1]) - 1,
                                            parseInt(parts[2]),
                                            23, 59, 59
                                        );

                                if (new Date() > expireDate) {

                                    reason =
                                        "Tài khoản đã hết hạn. Vui lòng liên hệ MOS360 để gia hạn!";

                                    break;
                                }
                            }

                            isValid = true;
                            break;
                        }
                    }
                }
                return new Response(JSON.stringify({ success: isValid, msg: isValid ? "Kích hoạt thành công!" : reason }), {
                    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
                });
            } catch (err) {
                return new Response(JSON.stringify({ success: false, msg: "Lỗi kết nối máy chủ dữ liệu!" }), { headers: { "Content-Type": "application/json" } });
            }
        }

        if (path === "/generative-ai") {
            return new Response(this.getQuizEnginePage("GENERATIVE AI"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }
        if (path === "/ic3-test") {
            return new Response(this.getQuizEnginePage("IC3 GS6"), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
        }

        // ===== FIX 1: Tải ảnh Bảng Vàng – dùng SHEET_URL pub TSV (v1 logic) =====
        let studentData = "";
        try {
            const resp = await fetch(CONFIG.SHEET_URL + "&v=" + Date.now());
            const tsv = await resp.text();
            const rows = tsv.split("\n").slice(1);
            let htmlContent = "";
            rows.forEach(row => {
                const cols = row.split("\t");
                // Cột 1 (index 0) = tên khóa học / link ảnh chứng chỉ
                const link = cols[0]?.replace(/\r/g, "").trim();
                if (link && link.startsWith("http")) {
                    let finalLink = link;
                    // Chuyển đổi link Google Drive sang link trực tiếp (lh3.googleusercontent)
                    if (link.includes("drive.google.com")) {
                        const match = link.match(/[-\w]{25,}/);
                        if (match) finalLink = "https://lh3.googleusercontent.com/d/" + match[0];
                    }
                    htmlContent += `<div class="student-item"><img src="${finalLink}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`;
                }
            });
            // Nhân 3 lần để hiệu ứng cuộn không bị hết nội dung
            studentData = htmlContent
                ? htmlContent + htmlContent + htmlContent
                : "<div style='color:#64748b;padding:20px;'>Đang cập nhật bảng vàng...</div>";
        } catch (e) {
            studentData = "<div style='color:#64748b;padding:20px;'>Hệ thống đang đồng bộ dữ liệu...</div>";
        }

        let content = "";
        if (path === "/courses") content = this.getCoursesUI();
        else if (path === "/login") content = this.getLoginUI();
        else if (path === "/library") content = this.getLibraryUI();
        else content = this.getHomeUI(studentData);

        return new Response(this.layout(content), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    },

    layout(content) {
        return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #06070d; --card: #111422; --text: #fff; --border: rgba(255,255,255,0.06); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; -webkit-tap-highlight-color: transparent; }
        header { padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(6,7,13,0.9); backdrop-filter: blur(12px); z-index: 1000; border-bottom: 1px solid var(--border); }
        .brand { display: flex; align-items: center; text-decoration: none; color: #fff; font-weight: 800; font-size: 1.3rem; }
        .brand img { height: 36px; margin-right: 10px; }
        nav { display: flex; align-items: center; }
        nav a { color: #94a3b8; text-decoration: none; font-weight: 700; margin-left: 20px; font-size: 0.85rem; transition: color 0.2s; }
        nav a:hover { color: #fff; }
        .admin-only-btn { display: none; background: rgba(255,215,0,0.1); color: #FFD700 !important; border: 1px solid #FFD700; padding: 6px 12px; border-radius: 6px; font-weight: 800; }

        .hero-banner { position: relative; width: 100%; min-height: 340px; background: linear-gradient(135deg, #090e1a 0%, #151d30 100%); overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center; padding: 40px 20px; border-bottom: 1px solid var(--border); }
        .hero-content { position: relative; z-index: 2; max-width: 800px; }
        .hero-content h1 { font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 15px; }
        .hero-content h1 span { background: linear-gradient(to right, #FF5722, #ff8a65); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-content p { color: #94a3b8; font-size: 1rem; margin-bottom: 25px; line-height: 1.6; }

        .stats-bar { display: flex; justify-content: center; gap: 40px; padding: 25px 5%; text-align: center; background: rgba(255,255,255,0.01); border-bottom: 1px solid var(--border); }
        .stat-item h2 { color: var(--primary); font-size: 2rem; font-weight: 800; }
        .stat-item p { color: #64748b; font-size: 0.8rem; font-weight: 600; }

        .main-container { max-width: 1400px; margin: 30px auto; padding: 0 5%; display: grid; grid-template-columns: 360px 1fr; gap: 30px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }

        .featured-highlights-box { background: #111422; border: 1px solid var(--border); border-radius: 24px; padding: 35px 25px; box-shadow: 0 12px 40px rgba(0,0,0,0.3); position: relative; overflow: hidden; }
        .featured-highlights-box::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(to bottom, #FF5722, #ff9100); }
        .featured-main-title { font-size: 1.85rem; font-weight: 800; color: #fff; line-height: 1.25; letter-spacing: -0.5px; margin-top: 5px; }
        .featured-main-title span { color: #FF5722; display: block; font-size: 2.15rem; margin-top: 5px; text-shadow: 0 0 15px rgba(255,87,34,0.2); }
        .highlight-list { list-style: none; margin: 30px 0; display: flex; flex-direction: column; gap: 16px; }
        .highlight-list li { display: flex; align-items: center; gap: 12px; font-size: 1.05rem; font-weight: 700; color: #cbd5e1; }
        .highlight-list li::before { content: "✓"; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; background: rgba(255,87,34,0.15); color: #FF5722; border-radius: 50%; font-size: 11px; font-weight: 900; }

        /* FIX 1: Bảng Vàng - carousel cuộn mượt */
        #bang-vang-container { height: 420px; overflow: hidden; }
        .carousel-viewport { width: 100%; height: 100%; overflow: hidden; position: relative; background: rgba(0,0,0,0.2); border-radius: 16px; }
        .carousel-track { display: flex; align-items: center; gap: 20px; position: absolute; left: 0; top: 0; height: 100%; animation: scroll-left 60s linear infinite; width: max-content; }
        .carousel-track:hover { animation-play-state: paused; }
        .student-item { flex: 0 0 auto; width: 280px; height: 100%; display: flex; align-items: center; justify-content: center; }
        .student-item img { max-width: 100%; max-height: 90%; object-fit: contain; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }

        /* FIX 2: Icon Zalo SVG chuẩn thương hiệu – nền xanh tròn, chữ Z trắng sắc nét */
        .social-sticky-bar { position: fixed; right: 25px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 9999; }
        .social-sticky-item { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.4); text-decoration: none; }
        .social-sticky-item:hover { transform: scale(1.15); }
        .social-sticky-item svg { width: 48px; height: 48px; }
        .s-zalo { box-shadow: 0 4px 14px rgba(0,104,255,0.5); }
        .s-zalo svg {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              overflow: hidden;
          }
        .s-fb { background: #1877F2; box-shadow: 0 4px 14px rgba(24,119,242,0.4); }
        .s-fb svg, .s-mess svg, .s-yt svg, .s-tt svg { width: 26px; height: 26px; fill: white; }
        .s-mess { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); box-shadow: 0 4px 14px rgba(214,36,159,0.4); }
        .s-yt { background: #FF0000; box-shadow: 0 4px 14px rgba(255,0,0,0.4); }
        .s-tt { background: #000; border: 1px solid rgba(255,255,255,0.15); }

        .course-block-title { display: flex; align-items: center; gap: 12px; margin: 40px 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid var(--border); color: #fff; }
        .course-block-title svg { width: 28px; height: 28px; fill: var(--primary); }
        .course-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .price-tag { font-size: 1.3rem; font-weight: 800; color: #00f2ff; margin: 15px 0; display: flex; align-items: center; gap: 8px; }
        .price-tag span { font-size: 0.85rem; color: #64748b; text-decoration: line-through; font-weight: normal; }
        .course-btn-group { display: flex; flex-direction: column; gap: 8px; margin-top: 15px; }

        .btn-action { background: linear-gradient(135deg, #FF5722, #ff784e); color: white; border: none; padding: 12px; border-radius: 25px; font-weight: 800; cursor: pointer; width: 100%; text-decoration: none; display: inline-block; text-align: center; box-shadow: 0 4px 12px rgba(255,87,34,0.2); transition: transform 0.15s; }
        .btn-sub { padding: 10px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: #cbd5e1; cursor: pointer; text-decoration: none; text-align: center; transition: all 0.2s; }
        .btn-sub:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .btn-trial { background: rgba(0,242,255,0.08); color: #00f2ff; border: 1px solid rgba(0,242,255,0.2); }

        footer { padding: 40px 5%; background: #030408; border-top: 1px solid var(--border); margin-top: 40px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 30px; }

        @media (max-width: 768px) {
            header { padding: 12px 4%; flex-direction: column; gap: 8px; text-align: center; }
            nav { width: 100%; justify-content: center; flex-wrap: wrap; gap: 6px; }
            nav a { margin: 3px 6px; font-size: 0.78rem; }
            .hero-content h1 { font-size: 1.7rem; }
            .stats-bar { gap: 15px; flex-wrap: wrap; }
            .main-container { grid-template-columns: 1fr; gap: 20px; padding: 0 4%; }
            .footer-grid { grid-template-columns: 1fr; }
            .social-sticky-bar { position: relative; top: 0; transform: none; right: 0; flex-direction: row; justify-content: center; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 12px; margin: 10px 4%; gap: 15px; }
        }
    </style>
    </head><body>

    <header>
        <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> MOS360</a>
        <nav>
            <a href="/">TRANG CHỦ</a>
            <a href="/courses">KHÓA HỌC</a>
            <a href="/library">KHO MOS</a>
            <a href="${CONFIG.SHEET_EDIT_URL}" target="_blank" class="admin-only-btn" id="adminPanelBtn">[QUẢN LÝ HỌC VIÊN]</a>
            <a href="/login" id="navLoginLink" style="color:var(--primary)">ĐĂNG NHẬP</a>
        </nav>
    </header>

    <nav style="background:rgba(0,242,255,0.03); padding:12px 5%; font-size:0.8rem; border-bottom:1px solid var(--border); display:flex; gap:15px; overflow-x:auto; white-space:nowrap; -webkit-overflow-scrolling:touch;">
        <span style="color:#64748b; font-weight:bold;">🎯 Lối tắt phòng thi:</span>
        <a href="/generative-ai" style="color:var(--cyan); text-decoration:none; font-weight:bold;">✨ Luyện thi GENERATIVE AI</a>
        <a href="/ic3-test" style="color:#FFD700; text-decoration:none; font-weight:bold;">🌍 Luyện thi IC3 GS6 Tổng hợp</a>
    </nav>

    <!-- FIX 2: Icon Zalo SVG logo chuẩn thương hiệu chính thức -->
    <div class="social-sticky-bar" id="stickySocialBar">
        <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="social-sticky-item s-zalo" title="Zalo">
            <!-- SVG Zalo logo chính thức: nền xanh tròn bo góc, chữ Zalo trắng -->
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="12" fill="#0068FF"/>
                <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="-0.5">Zalo</text>
            </svg>
        </a>
        <a href="${CONFIG.SOCIALS.FACEBOOK}" target="_blank" class="social-sticky-item s-fb" title="Facebook">
            <svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
        </a>
        <a href="${CONFIG.SOCIALS.MESSENGER}" target="_blank" class="social-sticky-item s-mess" title="Messenger">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.36 2 2 6.13 2 11.43c0 2.99 1.45 5.63 3.73 7.37.19.15.31.38.31.62l-.07 1.94c-.02.51.52.88.96.63l2.15-1.21c.18-.1.39-.13.59-.08 1.02.28 2.1.43 3.33.43 5.64 0 10-4.13 10-9.43S17.64 2 12 2zm1.02 12.35l-2.42-2.58-4.73 2.58 5.2-5.53 2.47 2.58 4.68-2.58-5.2 5.53z"/></svg>
        </a>
        <a href="${CONFIG.SOCIALS.YOUTUBE}" target="_blank" class="social-sticky-item s-yt" title="Youtube">
            <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.503 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.387.508 9.387.508s7.517 0 9.387-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        <a href="${CONFIG.SOCIALS.TIKTOK}" target="_blank" class="social-sticky-item s-tt" title="Tiktok">
            <svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.16 8.16 0 004.77 1.52V7.09a4.85 4.85 0 01-1-.4z" fill="white"/></svg>
        </a>
    </div>

    <main id="mainWebBody">${content}</main>

    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p><p>📞 Hotline: 0912.888.360</p></div>
            <div><h4>🕒 GIỜ LÀM VIỆC</h4><p>T2 - T7: 08:00 – 17:00<br>Chủ Nhật & Lễ: Nghỉ</p></div>
            <div style="height:160px; border-radius:15px; overflow:hidden;">
                <iframe src="https://maps.google.com/maps?q=Hai%20Phong&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>

    <script>
        // FIX 4: Admin đa thiết bị – KHÔNG thu hồi session cũ, chỉ thêm session mới
        function applyAdminSession() {
            var isAdmin = localStorage.getItem('mos360_admin_session') === 'active';
            if (isAdmin) {
                document.getElementById('adminPanelBtn').style.display = 'inline-block';
                var logLink = document.getElementById('navLoginLink');
                if (logLink) {
                    logLink.textContent = "ĐĂNG XUẤT ADMIN"; logLink.href = "#";
                    logLink.onclick = function(e) {
                        e.preventDefault();
                        // Chỉ xóa session trên thiết bị này, không ảnh hưởng thiết bị khác
                        localStorage.removeItem('mos360_admin_session');
                        window.location.href = "/";
                    };
                }
            }
        }
        applyAdminSession();

        function adjustLayoutMobile() {
            if (window.innerWidth <= 768) {
                var bar = document.getElementById('stickySocialBar');
                var main = document.getElementById('mainWebBody');
                if (bar && main && bar.parentNode !== main) main.appendChild(bar);
            }
        }
        window.addEventListener('resize', adjustLayoutMobile);
        window.addEventListener('DOMContentLoaded', adjustLayoutMobile);
    </script>
    </body></html>`;
    },

    getHomeUI(studentData) {
        return `
      <div class="hero-banner">
          <div class="hero-content">
              <h1>HỆ THỐNG LUYỆN THI <span>CHỨNG CHỈ QUỐC TẾ</span> CHUYÊN NGHIỆP</h1>
              <p>Học trực quan, luyện đề thực chiến bám sát kho đề thi Certiport thực tế. Cam kết chuẩn đầu ra tối ưu cho học viên và người đi làm.</p>
              <div style="max-width:240px; margin:0 auto;"><a href="/courses" class="btn-action">XEM KHÓA HỌC NGAY</a></div>
          </div>
      </div>

      <div class="stats-bar">
          <div class="stat-item"><h2>100%</h2><p>Thi đậu ngay lần đầu</p></div>
          <div class="stat-item"><h2>1.200+</h2><p>Học viên nhận chứng chỉ</p></div>
          <div class="stat-item"><h2>600+</h2><p>Truy cập học trực tuyến</p></div>
      </div>

      <div class="main-container">
          <div class="featured-highlights-box">
              <div class="featured-main-title">
                  Xóa tan nỗi lo
                  <span>CHUẨN ĐẦU RA</span>
                  cho sinh viên
              </div>
              <ul class="highlight-list">
                  <li>Học thật, tiến bộ thật</li>
                  <li>Thi thật 100%</li>
                  <li>Đồng hành trọn đời</li>
              </ul>
              <div style="background:rgba(255,87,34,0.06); padding:12px; border-radius:12px; border:1px dashed rgba(255,87,34,0.3); font-size:0.8rem; line-height:1.4; color:#ffaa80; margin-bottom:20px; text-align:center; font-weight:bold;">
                  🎁 Gói combo siêu lời đăng ký 2 khóa tặng ngay 1 khóa bất kỳ!
              </div>
              <button class="btn-action" onclick="location.href='/courses'">XEM KHÓA HỌC</button>
          </div>

          <div class="right-col">
              <div class="section-card" id="bang-vang-container">
                  <h3 style="margin-bottom:15px; font-size:1rem; letter-spacing:0.5px;">🏆 BẢNG VÀNG CHỨNG CHỈ QUỐC TẾ</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">${studentData}</div>
                  </div>
              </div>
          </div>
      </div>`;
    },

    getCoursesUI() {
        return `<div style="max-width:1200px; margin:30px auto; padding:0 15px;">
        <h2 style="color:var(--primary); text-align:center; margin-bottom:10px; font-weight:800; font-size:1.8rem;">LỘ TRÌNH LUYỆN THI CHỨNG CHỈ QUỐC TẾ</h2>
        <p style="text-align:center; color:#888; margin-bottom:30px; font-size:0.9rem;">Học và ôn thi trực tuyến tương tác cao, bám sát cấu trúc hành trình Certiport.</p>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M22 18H2V4h20v14zm-11 2h2v2h-2v-2zm-9-4h18V6H2v10z"/></svg>
            <h2>LỚP KHÓA HỌC LUYỆN THI MOS OFFICE 2019</h2>
        </div>
        <div class="course-grid">
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS WORD 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-W19" onclick="triggerRemoteVerification('MOS WORD 2019')">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS EXCEL 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-E19" onclick="triggerRemoteVerification('MOS EXCEL 2019')">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(255,87,34,0.1); color:var(--primary); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 2019</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS PPT 2019</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-P19" onclick="triggerRemoteVerification('MOS PPT 2019')">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
        </div>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <h2>LỚP KHÓA HỌC LUYỆN THI MOS OFFICE 365</h2>
        </div>
        <div class="course-grid">
            <div class="section-card">
                <span style="background:rgba(0,242,255,0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS WORD 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-W365" onclick="triggerRemoteVerification('MOS WORD 365')">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(0,242,255,0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS EXCEL 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-E365" onclick="triggerRemoteVerification('MOS EXCEL 365')">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
            <div class="section-card">
                <span style="background:rgba(0,242,255,0.1); color:var(--cyan); padding:4px 10px; border-radius:15px; font-size:0.75rem; font-weight:bold;">MOS 365</span>
                <h3 style="margin:12px 0 8px 0; font-size:1.15rem;">Luyện thi MOS PPT 365</h3>
                <div class="price-tag">400.000đ <span>600.000đ</span></div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action">ĐĂNG KÝ HỌC</a>
                    <button class="btn-sub" id="btn-auth-P365" onclick="triggerRemoteVerification('MOS PPT 365')">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                </div>
            </div>
        </div>

        <div class="course-block-title">
            <svg viewBox="0 0 24 24"><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.2 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>
            <h2>PHÒNG THI THỬ ĐẶC BIỆT CHUYÊN SÂU</h2>
        </div>
        <div class="course-grid">
            <div class="section-card" style="border-color:#FFD700; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(255,215,0,0.1); color:#FFD700; padding:4px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold;">IC3 GS6</span>
                    <h3 style="margin:12px 0 8px 0; font-size:1.2rem; color:#FFD700;">Luyện thi IC3 GS6</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.5;">Phòng ôn luyện bao gồm cả chế độ luyện tập tự do và thi thử tính giờ thực tế.</p>
                    <div class="price-tag">200.000đ <span>450.000đ</span></div>
                </div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action" style="background:linear-gradient(135deg,#FFD700,#cca400); color:#000;">ĐĂNG KÝ NGAY</a>
                    <button class="btn-sub" id="btn-auth-IC3" onclick="triggerRemoteVerification('IC3 GS6')">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess('/ic3-test','IC3 GS6')">🎯 VÀO PHÒNG ÔN LUYỆN THI THỬ</button>
                </div>
            </div>
            <div class="section-card" style="border-color:var(--cyan); display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <span style="background:rgba(0,242,255,0.1); color:var(--cyan); padding:4px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold;">AI DIGITAL</span>
                    <h3 style="margin:12px 0 8px 0; font-size:1.2rem; color:var(--cyan);">Luyện thi GENERATIVE AI</h3>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.5;">Bộ ngân hàng 45 câu xáo trộn ngẫu nhiên đạt tiêu chuẩn từ đề thi quốc tế.</p>
                    <div class="price-tag">200.000đ <span>400.000đ</span></div>
                </div>
                <div class="course-btn-group">
                    <a href="${CONFIG.SOCIALS.ZALO}" target="_blank" class="btn-action" style="background:linear-gradient(135deg,#00f2ff,#00a2ff); color:#000;">ĐĂNG KÝ NGAY</a>
                    <button class="btn-sub" id="btn-auth-AI" onclick="triggerRemoteVerification('GENERATIVE AI')">🔑 ĐĂNG NHẬP HỌC VIÊN</button>
                    <button class="btn-sub btn-trial" onclick="startTrialAccess('/generative-ai','GENERATIVE AI')">🎯 VÀO PHÒNG ÔN LUYỆN THI THỬ</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        const cList = ["MOS WORD 2019","MOS EXCEL 2019","MOS PPT 2019","MOS WORD 365","MOS EXCEL 365","MOS PPT 365","IC3 GS6","GENERATIVE AI"];
        const idMap = {
            "MOS WORD 2019":"btn-auth-W19","MOS EXCEL 2019":"btn-auth-E19","MOS PPT 2019":"btn-auth-P19",
            "MOS WORD 365":"btn-auth-W365","MOS EXCEL 365":"btn-auth-E365","MOS PPT 365":"btn-auth-P365",
            "IC3 GS6":"btn-auth-IC3","GENERATIVE AI":"btn-auth-AI"
        };
        function checkState() {
            cList.forEach(c => {
                if (localStorage.getItem('course_auth_' + c) === 'verified') {
                    var el = document.getElementById(idMap[c]);
                    if (el) { el.innerHTML = "✅ FULL QUYỀN HỌC VIÊN"; el.style.color = "#00f2ff"; }
                }
            });
        }
        // FIX 3: Chuẩn hóa SĐT phía client trước khi gửi lên API
        function normalizePhone(raw) {
            return raw.trim().replace(/^(\+84|84)/, "0");
        }
        async function triggerRemoteVerification(courseName) {
            var rawPhone = prompt("Nhập số điện thoại đăng ký [" + courseName + "] của bạn:");
            if (!rawPhone) return;
            var phone = normalizePhone(rawPhone);
            try {
                var res = await fetch("/api/verify-code?phone=" + encodeURIComponent(phone) + "&course=" + encodeURIComponent(courseName));
                var data = await res.json();
                if (data.success) {
                    alert("🎉 Xác thực thành công [" + courseName + "]! Hệ thống mở khóa toàn bộ quyền Ôn Tập & Thi Thử.");
                    localStorage.setItem('course_auth_' + courseName, 'verified');
                    checkState();
                } else { alert("❌ Không thành công: " + data.msg); }
            } catch(e) { alert("Lỗi kết nối hệ thống!"); }
        }
        function startTrialAccess(targetUrl, courseName) {
            sessionStorage.setItem('mos360_active_course_context', courseName);
            window.location.href = targetUrl;
        }
        window.onload = checkState;
    </script>`;
    },

    getLoginUI() {
        return `
    <div class="section-card" style="max-width:420px; margin:60px auto; padding:35px 25px;">
        <h2 style="text-align:center; color:var(--primary); margin-bottom:5px;">ĐĂNG NHẬP ADMIN</h2>
        <p style="text-align:center; color:#64748b; font-size:0.85rem; margin-bottom:25px;">Chức năng bảo mật phân tầng dành riêng cho quản trị viên</p>
        <div style="margin-bottom:15px;">
            <label style="font-size:0.8rem; color:#94a3b8; font-weight:bold; display:block; margin-bottom:5px;">TÀI KHOẢN ADMIN</label>
            <input type="text" id="admUser" placeholder="admin@mos360" style="width:100%; padding:14px; background:#090b11; border:1px solid #282f44; color:#fff; border-radius:10px; font-weight:bold;">
        </div>
        <div style="margin-bottom:25px;">
            <label style="font-size:0.8rem; color:#94a3b8; font-weight:bold; display:block; margin-bottom:5px;">MẬT KHẨU</label>
            <input type="password" id="admPass" placeholder="••••••••" style="width:100%; padding:14px; background:#090b11; border:1px solid #282f44; color:#fff; border-radius:10px; font-weight:bold;">
        </div>
        <!-- FIX 4: Đăng nhập admin chỉ set localStorage, không thu hồi session thiết bị khác -->
        <button class="btn-action" onclick="handleAdminLoginGate()">XÁC THỰC QUYỀN TRUY CẬP</button>
    </div>
    <script>
        function handleAdminLoginGate() {
            var u = document.getElementById('admUser').value.trim();
            var p = document.getElementById('admPass').value.trim();
            if (u === "admin@mos360" && p === "Mos360") {
                // FIX 4: localStorage là per-device – mỗi thiết bị lưu riêng, không xung đột
                localStorage.setItem('mos360_admin_session', 'active');
                alert("Đăng nhập Admin thành công! Nút [QUẢN LÝ HỌC VIÊN] đã được mở trên thiết bị này.");
                window.location.href = "/";
            } else { alert("Tài khoản hoặc mật khẩu quản lý không đúng!"); }
        }
    </script>`;
    },

    getLibraryUI() {
        return `<div class="section-card" style="max-width:800px; margin:50px auto; text-align:center;"><h2>📚 Kho Thư Viện Đề Thi MOS & IC3</h2><p style="color:#64748b; margin-top:15px;">Dữ liệu tài nguyên thư viện đang đồng bộ...</p></div>`;
    },

    // FIX 5: Phòng ôn luyện với phản hồi đúng/sai ngay lập tức + hộp giải thích
    getQuizEnginePage(courseType) {
        /* =========================
       QUESTION BANK V2
       ========================= */

        const questionBank =
            COURSE_MAP[courseType] || [];

        if (!questionBank.length) {

            return `
  <!DOCTYPE html>
  <html>
  <body style="
      background:#08090e;
      color:white;
      font-family:sans-serif;
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
      text-align:center;
  ">
      <div>
          <h2>⚠ Không tìm thấy Question Bank</h2>
          <p>${courseType}</p>
          <a href="/courses">Quay lại</a>
      </div>
  </body>
  </html>
  `;
        }

        const bankJSON = JSON.stringify(
            questionBank.map(item => ({
                q: item.question,
                o: item.options,
                c: item.answer,
                e: item.explanation || ""
            }))
        );

        return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Phòng Luyện Thi: ${courseType}</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', -apple-system, sans-serif; }
        body { background: #08090e; color: #e2e8f0; padding: 15px; }
        .container { max-width: 1200px; margin: 0 auto; background: #121522; border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); overflow: hidden; }
        header { background: #171b2a; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .timer-box { border: 2px solid #00f2ff; padding: 6px 14px; border-radius: 8px; font-size: 16px; font-weight: 800; color: #00f2ff; }

        .mode-selection-overlay { position: absolute; inset: 0; background: #0c0e17; z-index: 999; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; border-radius: 12px; }
        .mode-btn { width: 100%; max-width: 380px; padding: 16px; margin: 8px 0; border: 2px solid #282f44; background: #161927; color: white; border-radius: 12px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s; text-align: left; }
        .mode-btn:hover { border-color: #00f2ff; background: rgba(0,242,255,0.04); }
        .lock-badge { font-size: 0.75rem; display: block; margin-top: 4px; font-weight: normal; }

        .quiz-layout { display: grid; grid-template-columns: 1fr 280px; gap: 20px; padding: 20px; }
        .main-quiz { background: #161927; padding: 20px; border-radius: 12px; min-height: 440px; display: flex; flex-direction: column; position: relative; }

        .question-box { font-size: 1.05rem; font-weight: 700; line-height: 1.5; margin-bottom: 20px; color: #fff; }
        .option { display: flex; align-items: flex-start; padding: 14px 16px; background: #1e2235; border: 2px solid #29304a; border-radius: 10px; cursor: pointer; margin-bottom: 10px; font-size: 0.95rem; font-weight: 600; transition: all 0.15s; gap: 10px; }
        .option.selected { border-color: #00f2ff; background: rgba(0,242,255,0.04); color: #00f2ff; }
        /* FIX 5: Màu phản hồi đúng/sai ngay lập tức cho chế độ ôn luyện */
        .option.correct-ans { border-color: #22c55e !important; background: rgba(34,197,94,0.12) !important; color: #22c55e !important; }
        .option.wrong-ans { border-color: #ef4444 !important; background: rgba(239,68,68,0.1) !important; color: #ef4444 !important; }
        .option.show-correct { border-color: #22c55e !important; background: rgba(34,197,94,0.06) !important; color: #86efac !important; }
        /* FIX 5: Hộp giải thích trượt xuống */
        .explanation-box { background: rgba(0,242,255,0.06); border: 1px solid rgba(0,242,255,0.2); border-radius: 10px; padding: 14px 16px; margin-top: 12px; font-size: 0.88rem; line-height: 1.6; color: #94a3b8; display: none; animation: slideDown 0.25s ease; }
        .explanation-box.visible { display: block; }
        .explanation-box strong { color: #00f2ff; }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }

        .right-sidebar { background: #161927; padding: 15px; border-radius: 12px; display: flex; flex-direction: column; }
        .nav-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; overflow-y: auto; max-height: 350px; }
        .nav-item { height: 36px; background: #1e2235; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; border-radius: 6px; cursor: pointer; color: #94a3b8; }
        .nav-item.current { border: 1px solid #00f2ff; color: #00f2ff; background: rgba(0,242,255,0.05); }
        .nav-item.answered { background: #384260; color: #fff; }
        .nav-item.correct-nav { background: #166534; color: #86efac; }
        .nav-item.wrong-nav { background: #7f1d1d; color: #fca5a5; }

        .control-btns { display: flex; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 20px; }
        .btn-ctrl { padding: 12px 18px; background: #23293f; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.85rem; }
        .btn-submit { background: #16a34a; font-weight: 800; }

        .result-overlay { position: absolute; inset: 0; background: #0c0e17; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; z-index: 1000; display: none; border-radius: 12px; }

        @media (max-width: 768px) {
            header { flex-direction: column; gap: 8px; text-align: center; padding: 12px; }
            .quiz-layout { grid-template-columns: 1fr; gap: 15px; padding: 10px; }
            .right-sidebar { order: 2; }
            .nav-grid { grid-template-columns: repeat(9, 1fr); max-height: none; }
            .control-btns { flex-wrap: wrap; }
            .btn-ctrl { flex: 1 1 40%; text-align: center; }
            .btn-submit { flex: 1 1 100%; order: -1; }
        }
    </style></head><body>
    <div class="container">
        <header>
            <div>
                <h3 style="color:#fff;">🎯 Phòng Ôn Luyện & Sát Hạch: ${courseType}</h3>
                <p style="color:#64748b; font-size:0.75rem; margin-top:2px;">Tiêu chuẩn đạt: ${EXAM_CONFIG.PASS_SCORE} / ${EXAM_CONFIG.MAX_SCORE} điểm | ${EXAM_CONFIG.QUESTION_COUNT} Câu hỏi
                </p>
            </div>
            <div class="timer-box" id="timerContainer">⏱️ <span id="clock">00:00</span></div>
        </header>
        <div class="quiz-layout">
            <div class="main-quiz">

                <div class="mode-selection-overlay" id="modeSelectBox">
                    <h2 style="color:#fff; margin-bottom:6px;">CHỌN CHẾ ĐỘ HỌC TẬP</h2>
                    <p style="font-size:0.85rem; margin-bottom:20px; font-weight:bold;" id="modeWelcomeTxt">Đang kiểm tra quyền truy cập...</p>
                    <button class="mode-btn" onclick="launchEngine('practice')">
                        📖 Chế độ Ôn luyện tự do
                        <span class="lock-badge" id="lock-practice"> </span>
                    </button>
                    <button class="mode-btn" onclick="launchEngine('exam')">
                        ⏱️ Chế độ Thi thử thực chiến
                        <span class="lock-badge" id="lock-exam"> </span>
                    </button>
                    <a href="/courses" style="color:#64748b; font-size:0.8rem; margin-top:15px; text-decoration:none;">← Quay lại danh mục khóa học</a>
                </div>

                <div class="result-overlay" id="resBox">
                    <h2 style="color:#00f2ff; font-weight:800;">KẾT QUẢ SÁT HẠCH</h2>
                    <div style="font-size:42px; font-weight:800; margin:15px 0;" id="resScore">0 / 1000</div>
                    <p style="margin-bottom:25px; color:#cbd5e1; font-size:0.95rem; max-width:420px; line-height:1.5;" id="resText"></p>
                    <button onclick="location.href='/courses'" style="padding:12px 35px; background:linear-gradient(135deg,#FF5722,#ff784e); border:none; color:#fff; font-weight:800; border-radius:25px; cursor:pointer; margin-bottom:12px;">QUAY LẠI TRANG KHÓA HỌC</button>
                    <button onclick="restartQuiz()" style="padding:10px 25px; background:#1e2235; border:1px solid #282f44; color:#94a3b8; font-weight:700; border-radius:20px; cursor:pointer;">LÀM LẠI BÀI THI</button>
                </div>

                <div style="font-size:11px; color:#00f2ff; font-weight:800; letter-spacing:0.5px; margin-bottom:10px;">
                CÂU HỎI: <span id="lblIdx">1</span> / ${EXAM_CONFIG.QUESTION_COUNT}
                </div>
                <div class="question-box" id="lblText">Đang tải...</div>
                <div id="optsArea"></div>
                <!-- FIX 5: Hộp giải thích -->
                <div class="explanation-box" id="explanationBox"><strong>💡 Giải thích:</strong> <span id="explanationText"></span></div>

                <div class="control-btns">
                    <button class="btn-ctrl" onclick="go(-1)">← TRƯỚC</button>
                    <button class="btn-ctrl btn-submit" id="btnSubmit" onclick="submitExamNow()">NỘP BÀI CHẤM ĐIỂM</button>
                    <button class="btn-ctrl" onclick="go(1)">TIẾP THEO →</button>
                </div>
            </div>

            <div class="right-sidebar">
                <h4 style="margin-bottom:12px; font-size:12px; color:#94a3b8;">DANH SÁCH CÂU HỎI</h4>
                <div class="nav-grid" id="gridArea"></div>
                <div style="margin-top:15px; font-size:11px; color:#64748b; line-height:1.6;">
                    <span style="color:#22c55e;">■</span> Đúng &nbsp;
                    <span style="color:#ef4444;">■</span> Sai &nbsp;
                    <span style="color:#384260;">■</span> Đã chọn
                </div>
            </div>
        </div>
    </div>

    <script>
    var qCount = ${EXAM_CONFIG.QUESTION_COUNT};
    var list = [];
    var cur = 0;
    var userAns = new Array(qCount).fill(null);
    var isDone = false;
    var mode = "";
    var isVerified = localStorage.getItem('course_auth_${courseType}') === 'verified';

    // Ngân hàng câu hỏi với explanation
    var bank = ${bankJSON};

/* =========================
   RANDOM 45 QUESTIONS
   ========================= */

function shuffleArray(arr) {

    var clone = arr.slice();

    for (var i = clone.length - 1; i > 0; i--) {

        var j = Math.floor(
            Math.random() * (i + 1)
        );

        var temp = clone[i];
        clone[i] = clone[j];
        clone[j] = temp;
    }

    return clone;
}

var shuffledBank = shuffleArray(bank);

var selectedQuestions =
    shuffledBank.slice(
        0,
        Math.min(qCount, shuffledBank.length)
    );

for (var i = 0; i < selectedQuestions.length; i++) {

    var b = selectedQuestions[i];

    list.push({
        q: "[Câu " + (i + 1) + "] " + b.q,
        options: b.o.slice(),
        c: b.c,
        e: b.e
    });
}

qCount = list.length;
userAns = new Array(qCount).fill(null);

    function verifyModeMenu() {
        if (isVerified) {
            document.getElementById('modeWelcomeTxt').textContent = "✅ Quyền học viên hợp lệ – Mở khóa đầy đủ tính năng!";
            document.getElementById('modeWelcomeTxt').style.color = "#22c55e";
            document.getElementById('lock-practice').textContent = "🔓 Ôn tập tự do – Xem giải thích ngay, không giới hạn thời gian";
            document.getElementById('lock-practice').style.color = "#00f2ff";
            document.getElementById('lock-exam').textContent = "🔓 Thi thử thực chiến – 50 phút, tính điểm chuẩn Certiport";
            document.getElementById('lock-exam').style.color = "#00f2ff";
        } else {
            document.getElementById('modeWelcomeTxt').textContent = "⚠️ Chưa đăng nhập – Trải nghiệm dùng thử 10 phút";
            document.getElementById('modeWelcomeTxt').style.color = "#FF5722";
            document.getElementById('lock-practice').textContent = "⏱️ Ôn luyện dùng thử – Giới hạn 10 phút, có giải thích";
            document.getElementById('lock-practice').style.color = "#ffaa80";
            document.getElementById('lock-exam').textContent = "⏱️ Thi thử dùng thử – Giới hạn 10 phút";
            document.getElementById('lock-exam').style.color = "#ffaa80";
        }
    }

    function launchEngine(chosenMode) {
        mode = chosenMode;
        document.getElementById('modeSelectBox').style.display = "none";
        if (mode === 'exam') {
            document.getElementById('btnSubmit').style.display = 'inline-block';
        } else {
            // Chế độ ôn luyện: ẩn nút nộp bài
            document.getElementById('btnSubmit').style.display = 'none';
        }
        initQuiz();
    }

    function initQuiz() {
        var g = document.getElementById('gridArea');
        g.innerHTML = '';
        for (var i = 0; i < qCount; i++) {
            var d = document.createElement('div');
            d.className = 'nav-item';
            d.id = 'ni-' + i;
            d.textContent = i + 1;
            (function(idx){ d.onclick = function() { cur = idx; renderQ(); }; })(i);
            g.appendChild(d);
        }
        renderQ();
        var mins =
        isVerified
            ? (
                mode === 'exam'
                    ? ${EXAM_CONFIG.EXAM_DURATION}
                    : 0
            )
            : ${EXAM_CONFIG.TRIAL_DURATION}
            if (mins > 0) {
                startTimer(mins);
            } else {
                document.getElementById('timerContainer').innerHTML = "📖 Ôn luyện tự do";
                document.getElementById('timerContainer').style.border = "2px solid #22c55e";
                document.getElementById('timerContainer').style.color = "#22c55e";
            }
    }

    function renderQ() {
        document.getElementById('lblIdx').textContent = cur + 1;
        document.getElementById('lblText').textContent = list[cur].q;
        var area = document.getElementById('optsArea');
        area.innerHTML = '';
        var expBox = document.getElementById('explanationBox');
        expBox.classList.remove('visible');

        var answered = userAns[cur] !== null;

        for (var i = 0; i < list[cur].options.length; i++) {
            var div = document.createElement('div');
            var isSelected = userAns[cur] === i;
            var isCorrect = list[cur].c === i;

            // FIX 5: Tô màu đúng/sai ngay sau khi chọn (chế độ practice)
            var cls = 'option';
            if (answered && mode === 'practice') {
                if (isSelected && isCorrect) cls += ' correct-ans';
                else if (isSelected && !isCorrect) cls += ' wrong-ans';
                else if (!isSelected && isCorrect) cls += ' show-correct';
            } else if (isSelected) {
                cls += ' selected';
            }

            div.className = cls;
            div.innerHTML = '<span style="min-width:22px; font-weight:900; color:#64748b;">' + String.fromCharCode(65+i) + '.</span>' + list[cur].options[i];

            if (!isDone && !(answered && mode === 'practice')) {
                (function(optIdx){
                    div.onclick = function() {
                        userAns[cur] = optIdx;
                        document.getElementById('ni-' + cur).classList.add('answered');
                        if (mode === 'practice') {
                            // Cập nhật màu nav
                            var ni = document.getElementById('ni-' + cur);
                            ni.classList.remove('answered');
                            if (optIdx === list[cur].c) ni.classList.add('correct-nav');
                            else ni.classList.add('wrong-nav');
                        }
                        renderQ();
                        // Hiện giải thích nếu chế độ ôn luyện
                        if (mode === 'practice') {
                            document.getElementById('explanationText').textContent = list[cur].e;
                            document.getElementById('explanationBox').classList.add('visible');
                        }
                    };
                })(i);
            }
            area.appendChild(div);
        }

        // Nếu đã trả lời và đang xem lại trong practice, hiện giải thích
        if (answered && mode === 'practice') {
            document.getElementById('explanationText').textContent = list[cur].e;
            expBox.classList.add('visible');
        }

        for (var j = 0; j < qCount; j++) document.getElementById('ni-' + j).classList.remove('current');
        document.getElementById('ni-' + cur).classList.add('current');
    }

    function go(d) { cur = Math.max(0, Math.min(qCount-1, cur + d)); renderQ(); }

    function startTimer(m) {
        var sec = m * 60;
        var t = setInterval(function() {
            if (isDone) { clearInterval(t); return; }
            sec--;
            var mins = Math.floor(sec / 60), s = sec % 60;
            document.getElementById('clock').textContent = (mins<10?'0':'')+mins+':'+(s<10?'0':'')+s;
            if (sec <= 0) { clearInterval(t); alert("Hết thời gian làm bài!"); submitExamNow(); }
        }, 1000);
    }

    function submitExamNow() {
        if (isDone) return;
        if (mode === 'exam' && isVerified) {
            var answered = userAns.filter(a => a !== null).length;
            if (!confirm("Bạn đã trả lời " + answered + "/" + qCount + " câu. Xác nhận nộp bài?")) return;
        }
        isDone = true;
        var rights = 0;
        for (var i = 0; i < qCount; i++) { if (userAns[i] === list[i].c) rights++; }
        var score = Math.round((rights / qCount) * 1000);
        document.getElementById('resScore').textContent = score + "/" + EXAM_CONFIG.MAX_SCORE + " điểm";
        if (score >= EXAM_CONFIG.PASS_SCORE) {
            document.getElementById('resScore').style.color = "#22c55e";
            document.getElementById('resText').innerHTML = "🎉 XUẤT SẮC ĐẠT CHUẨN! Bạn trả lời đúng " + rights + "/" + qCount + " câu, đạt " + score + "/" + EXAM_CONFIG.MAX_SCORE + " điểm (Tiêu chuẩn PASS Certiport: 700đ).";
        } else {
            document.getElementById('resScore').style.color = "#FF5722";
            document.getElementById('resText').innerHTML = "⚠️ CHƯA ĐẠT CHUẨN. Bạn đạt " + score + "/" + EXAM_CONFIG.MAX_SCORE + " điểm, cần ôn thêm để đạt mức " + EXAM_CONFIG.PASS_SCORE + " điểm. Hãy thử chế độ Ôn luyện để xem giải thích từng câu!";
        }
        document.getElementById('resBox').style.display = "flex";
    }

    function restartQuiz() {
        isDone = false;
        userAns = new Array(qCount).fill(null);
        cur = 0;
        document.getElementById('resBox').style.display = "none";
        renderQ();
        var allNi = document.querySelectorAll('.nav-item');
        allNi.forEach(function(n) { n.className = 'nav-item'; });
        document.getElementById('ni-0').classList.add('current');
    }

    window.onload = verifyModeMenu;
    </script>
    </body></html>`;
    }
};