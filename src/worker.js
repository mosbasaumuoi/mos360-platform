import { CONFIG } from "./config/config.js";
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const webPaths = ["/", "/index.html", "/courses", "/library", "/login"];
    if (!webPaths.includes(path)) return fetch(request);

    let studentData = "";
    try {
      const resp = await fetch(CONFIG.SHEET_URL + "&v=" + Date.now());
      const tsv = await resp.text();
      const rows = tsv.split("\n").slice(1);
      let htmlContent = "";
      rows.forEach(row => {
        const link = row.split("\t")[0]?.replace(/\r/g, "").trim();
        if (link && link.startsWith("http")) {
          let finalLink = link;
          if (link.includes("drive.google.com")) {
            const imgId = link.match(/[-\w]{25,}/);
            finalLink = `https://lh3.googleusercontent.com/d/${imgId}`;
          }
          htmlContent += `<div class="student-item"><img src="${finalLink}" loading="lazy"></div>`;
        }
      });
      studentData = htmlContent + htmlContent; 
    } catch (e) { studentData = "<p>Đang tải dữ liệu...</p>"; }

    let content = "";
    if (path === "/courses") content = this.getCoursesUI();
    else if (path === "/login") content = this.getLoginUI();
    else if (path === "/library") content = this.getLibraryUI();
    else content = this.getHomeUI(studentData);

    return new Response(this.layout(content), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  },

  getHomeUI(studentData) {
    return `
      <div class="stats-bar">
          <div class="stat-item"><h2>100%</h2><p>Thi đậu ngay lần đầu</p></div>
          <div class="stat-item"><h2>1.000+</h2><p>Học viên đã nhận chứng chỉ</p></div>
          <div class="stat-item"><h2>500+</h2><p>Truy cập thường xuyên</p></div>
      </div>

      <div class="main-container">
          <div class="left-col">
              <div class="promo-box-top" style="border: 1.5px solid var(--primary); background: rgba(255,87,34,0.1); border-radius:15px; padding:15px; margin-bottom:15px;">
                  <p style="font-size:1.1rem; line-height:1.4; text-align:center;">🔥 <b style="color:var(--primary);">Siêu ưu đãi đặc biệt trong tháng 5 !!!</b><br><span style="font-size:0.9rem; opacity:0.9;">Mua 3 khóa tính tiền 2</span><br><span style="color:#FFD700; font-weight:800; font-size:1.2rem;">Tiết kiệm 400k</span></p>
              </div>
              <div class="section-card wheel-card" style="text-align: center;">
                  <h3 class="wheel-title" style="margin-bottom: 15px;">Vòng Quay May Mắn</h3>
                  <div class="wheel-box">
                      <div class="wheel-pointer"></div>
                      <div class="wheel-circle idle-spin" id="main-wheel">
                          <div class="wheel-label l1"><b>GIẢM 50K</b></div>
                          <div class="wheel-label l2"><b>GIẢM 50%</b></div>
                          <div class="wheel-label l3"><b>GIẢM 100K</b></div>
                          <div class="wheel-label l4"><b>GIẢM 80%</b></div>
                      </div>
                      <div class="wheel-center">MOS</div>
                  </div>
                  <div class="wheel-inputs">
                      <input type="text" placeholder="Họ tên của bạn" id="w-name">
                      <input type="text" placeholder="Số điện thoại của bạn" id="w-phone">
                  </div>
                  <button class="btn-action" onclick="spinWheel()">QUAY NGAY</button>
              </div>
          </div>

          <div class="right-col">
              <div class="section-card" id="bang-vang-container">
                  <h3 class="bv-title">🏆 Bảng Vàng Chứng Chỉ</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">${studentData}</div>
                  </div>
              </div>
          </div>
      </div>

      <div class="services-grid">
          <div class="service-card"><h4>Thi Thật 100%</h4><p class="small-desc">Hệ thống mô phỏng sát đề quốc tế.</p></div>
          <div class="service-card ai-chat-card" style="display: flex; flex-direction: column; justify-content: center;">
              <h4 style="color:var(--cyan); margin-bottom: 10px;">AI Assistant 24/7 ✨</h4>
              <div class="chat-input-box">
                  <input type="text" placeholder="Chào bạn, hỏi MOS đi..."><button style="color: white; font-family: 'Plus Jakarta Sans', sans-serif; font-weight:800;">GỬI</button>
              </div>
          </div>
          <div class="service-card"><h4>Đồng hành trọn đời</h4><p class="small-desc">Hỗ trợ đề án, luận văn, tin học công sở.</p></div>
      </div>

      <div class="side-socials">
        <a href="https://zalo.me/0912888360" target="_blank" class="s-btn"><img src="https://img.icons8.com/color/48/zalo.png"></a>
        <a href="https://facebook.com/mos360.vn" target="_blank" class="s-btn"><img src="https://img.icons8.com/color/48/facebook-new.png"></a>
        <a href="https://m.me/mos360.vn" target="_blank" class="s-btn"><img src="https://img.icons8.com/color/48/facebook-messenger--v1.png"></a>
        <a href="https://youtube.com/@mos360_vn" target="_blank" class="s-btn"><img src="https://img.icons8.com/color/48/youtube-play.png"></a>
        <a href="https://tiktok.com/@mos360.vn" target="_blank" class="s-btn" style="background:#000;"><img src="https://img.icons8.com/ios-filled/50/ffffff/tiktok--v1.png"></a>
      </div>

      <script>
        function spinWheel() {
            const name = document.getElementById('w-name').value;
            const phone = document.getElementById('w-phone').value;
            if(!name || !phone) { alert('Vui lòng nhập đủ thông tin!'); return; }
            const wheel = document.getElementById('main-wheel');
            wheel.classList.remove('idle-spin');
            const deg = 3600 + Math.random() * 360;
            wheel.style.transition = 'transform 4s cubic-bezier(0.1, 0, 0.1, 1)';
            wheel.style.transform = 'rotate(' + deg + 'deg)';
            setTimeout(() => { alert('Chúc mừng ' + name + '! MOS360 sẽ liên hệ ưu đãi qua SĐT ' + phone); }, 4500);
        }
      </script>`;
  },

  getCoursesUI() {
    return `<div class="section-card" style="max-width:900px; margin:40px auto;">
        <h1 style="text-align:center; color:var(--primary); margin-bottom:10px;">ĐĂNG KÝ KHÓA HỌC</h1>
        <div style="text-align:center; margin-bottom:30px; padding:10px; border:1px solid rgba(255,87,34,0.3); border-radius:10px;">
            <p style="color:#FFD700; font-size:1.1rem;">🔥 <b>Siêu ưu đãi đặc biệt trong tháng 5 !!!</b></p>
            <p style="color:#888; font-size:0.9rem;">Chương trình: <b>Mua 3 khóa tính tiền 2</b></p>
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
            <div class="course-group" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:20px;">
                <h3>MOS 2019</h3>
                <div style="margin-top:15px;">
                  <label><input type="checkbox" class="course-cb" data-price="400000"> Word 2019 (400k)</label><br><br>
                  <label><input type="checkbox" class="course-cb" data-price="400000"> Excel 2019 (400k)</label><br><br>
                  <label><input type="checkbox" class="course-cb" data-price="400000"> PowerPoint 2019 (400k)</label>
                </div>
            </div>
            <div class="course-group" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:20px;">
                <h3>MOS 365</h3>
                <div style="margin-top:15px;">
                  <label><input type="checkbox" class="course-cb" data-price="400000"> Word 365 (400k)</label><br><br>
                  <label><input type="checkbox" class="course-cb" data-price="400000"> Excel 365 (400k)</label><br><br>
                  <label><input type="checkbox" class="course-cb" data-price="400000"> PowerPoint 365 (400k)</label>
                </div>
            </div>
        </div>
        <div style="margin-top:30px; text-align:center; padding:25px; background:#000; border-radius:15px; border:1px solid var(--primary);">
            <h2 id="total-price" style="color:#FFD700">Tổng thanh toán: 0đ</h2>
            <p id="discount-note" style="color:var(--cyan); font-size:0.9rem; margin-top:5px;"></p>
            <button class="btn-action" style="margin-top:15px; max-width:300px;">THANH TOÁN NGAY</button>
        </div>
        <script>
            document.querySelectorAll('.course-cb').forEach(cb => {
                cb.addEventListener('change', () => {
                    let prices = [];
                    document.querySelectorAll('.course-cb:checked').forEach(c => prices.push(parseInt(c.dataset.price)));
                    let total = 0;
                    let note = "";
                    if (prices.length >= 3) {
                        prices.sort((a, b) => b - a);
                        total = prices[0] + prices[1]; 
                        note = "✨ Đã áp dụng ưu đãi Mua 3 tính tiền 2 (Tiết kiệm " + prices[2].toLocaleString() + "đ)";
                    } else {
                        total = prices.reduce((a, b) => a + b, 0);
                    }
                    document.getElementById('total-price').innerText = 'Tổng thanh toán: ' + total.toLocaleString('vi-VN') + 'đ';
                    document.getElementById('discount-note').innerText = note;
                });
            });
        </script>
    </div>`;
  },

  layout(content) {
    return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.TITLE}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #FF5722; --bg: #080808; --card: #121212; --text: #fff; --border: rgba(255,255,255,0.08); --cyan: #00f2ff; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

        header { padding: 10px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(8,8,8,0.9); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid var(--border); }
        .brand { display: flex; align-items: center; text-decoration: none; color: #fff; font-weight: 800; font-size: 1.2rem; }
        .brand img { height: 35px; margin-right: 10px; }
        nav a { color: #888; text-decoration: none; font-weight: 700; margin-left: 20px; font-size: 0.8rem; }

        .stats-bar { display: flex; justify-content: center; gap: 30px; padding: 25px; text-align: center; }
        .stat-item h2 { color: var(--primary); font-size: 2rem; }

        .main-container { max-width: 1400px; margin: 0 auto; padding: 0 5%; display: grid; grid-template-columns: 320px 1fr; gap: 25px; }
        .section-card { background: var(--card); border: 1px solid var(--border); border-radius: 28px; padding: 25px; }

        .wheel-box { position: relative; width: 180px; height: 180px; margin: 0 auto 20px; }
        .wheel-circle { width: 100%; height: 100%; border-radius: 50%; border: 4px solid #FFD700; position: relative; background: conic-gradient(#ff6b6b 0 90deg, #4ecdc4 90deg 180deg, #ffbe0b 180deg 270deg, #ff006e 270deg 360deg); }
        .idle-spin { animation: slowRotate 15s linear infinite; }
        @keyframes slowRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .wheel-center { position: absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:40px; height:40px; background:#fff; border-radius:50%; color:#000; font-weight:900; display:flex; align-items:center; justify-content:center; z-index:20; font-size:0.6rem; }
        .wheel-label { position: absolute; width:100%; height:100%; display:flex; justify-content:center; align-items:flex-start; padding-top:20px; font-size:0.65rem; color:#fff; }
        .l1{transform:rotate(45deg)} .l2{transform:rotate(135deg)} .l3{transform:rotate(225deg)} .l4{transform:rotate(315deg)}
        .wheel-pointer { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); border-top: 15px solid #FFD700; border-left: 8px solid transparent; border-right: 8px solid transparent; z-index: 10; }

        #bang-vang-container { height: 450px; overflow: hidden; }
        .carousel-viewport { width: 100%; height: 100%; overflow: hidden; position: relative; background: rgba(0,0,0,0.4); border-radius: 20px; }
        .carousel-track { display: flex; align-items: center; gap: 20px; position: absolute; left: 0; top: 0; height: 100%; animation: scroll-left 100s linear infinite; }
        .student-item { flex: 0 0 auto; width: 320px; height: 100%; display: flex; align-items: center; justify-content: center; }
        .student-item img { max-width: 100%; max-height: 90%; object-fit: contain; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); }
        @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .side-socials { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 9999; }
        .s-btn { width: 45px; height: 45px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .s-btn img { width: 25px; height: 25px; }

        .services-grid { max-width: 1400px; margin: 30px auto; padding: 0 5%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .service-card { background: var(--card); padding: 25px; border-radius: 20px; border-left: 4px solid var(--primary); }
        .chat-input-box { display: flex; background: #000; border-radius: 8px; padding: 4px; border: 1px solid #222; }
        .chat-input-box input { flex:1; background:transparent; border:none; color:#fff; padding:10px; outline:none; font-size:0.85rem; }
        .chat-input-box button { background:var(--cyan); border:none; padding:0 15px; border-radius:6px; font-weight:800; cursor:pointer; }

        footer { padding: 50px 5%; background: #050505; border-top: 1px solid var(--border); margin-top: 50px; }
        .footer-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1.2fr; gap: 40px; }
        .btn-action { background: var(--primary); color: white; border: none; padding: 12px; border-radius: 30px; font-weight: 800; cursor: pointer; width: 100%; }
        .wheel-inputs input { width: 100%; padding: 10px; margin-bottom: 10px; background: #000; border: 1px solid #333; color: #fff; border-radius: 8px; }

        @media (max-width: 800px) { .main-container, .services-grid, .footer-grid { grid-template-columns: 1fr; } }
    </style>
    </head><body>
    <header>
        <a href="/" class="brand"><img src="${CONFIG.LOGO_URL}"> MOS360</a>
        <nav><a href="/">TRANG CHỦ</a><a href="/courses">KHÓA HỌC</a><a href="/library">KHO MOS</a><a href="/login" style="color:var(--primary)">ĐĂNG NHẬP</a></nav>
    </header>
    <main>${content}</main>
    <footer>
        <div class="footer-grid">
            <div><h2 style="color:var(--primary)">MOS360.VN</h2><p>📍 Số 57 Lê Văn Thuyết A, An Biên, Hải Phòng</p><p>📞 Hotline: 0912.888.360</p></div>
            <div><h4>🕒 GIỜ LÀM VIỆC</h4><p>T2 - T7: 08:00 – 17:00<br>Chủ Nhật & Lễ: Nghỉ</p></div>
            <div style="height:180px; border-radius:15px; overflow:hidden;">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.665792945241!2d106.6791653!3d20.8431818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7af99d2557e9%3A0x679c2980c6c7478d!2zNTcgTMOqIFbEg24gVGh1eeG6v3QsIEFuIEJpw6puLCBMw6ogQ2jDom4sIEjhuqNpIFBow7JuZw!5e0!3m2!1svi!2s!4v1714368000000!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    </footer>
    </body></html>`;
  },

  getLoginUI() { return `<div class="section-card" style="max-width:400px; margin:100px auto; text-align:center;"><h2>Đăng Nhập</h2><input type="password" placeholder="Mật khẩu" style="width:100%; padding:15px; margin:20px 0; background:#000; border:1px solid #333; color:#fff; border-radius:10px;"><button class="btn-action">VÀO HỆ THỐNG</button></div>`; },
  getLibraryUI() { return `<div class="section-card" style="max-width:800px; margin:50px auto; text-align:center;"><h2>📚 Kho Tài Liệu MOS</h2><p>Nội dung đang được cập nhật...</p></div>`; }
};
