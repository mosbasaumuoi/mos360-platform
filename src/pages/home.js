export function getHomeUI(studentData) {
    return `
      <div class="stats-bar">
          <div class="stat-item"><h2>100%</h2><p>Thi \u0111\u1EADu ngay l\u1EA7n \u0111\u1EA7u</p></div>
          <div class="stat-item"><h2>1.000+</h2><p>H\u1ECDc vi\xEAn \u0111\xE3 nh\u1EADn ch\u1EE9ng ch\u1EC9</p></div>
          <div class="stat-item"><h2>500+</h2><p>Truy c\u1EADp th\u01B0\u1EDDng xuy\xEAn</p></div>
      </div>

      <div class="main-container">
          <div class="left-col">
              <div class="promo-box-top" style="border: 1.5px solid var(--primary); background: rgba(255,87,34,0.1); border-radius:15px; padding:15px; margin-bottom:15px;">
                  <p style="font-size:1.1rem; line-height:1.4; text-align:center;">\u{1F525} <b style="color:var(--primary);">Si\xEAu \u01B0u \u0111\xE3i \u0111\u1EB7c bi\u1EC7t trong th\xE1ng 5 !!!</b><br><span style="font-size:0.9rem; opacity:0.9;">Mua 3 kh\xF3a t\xEDnh ti\u1EC1n 2</span><br><span style="color:#FFD700; font-weight:800; font-size:1.2rem;">Ti\u1EBFt ki\u1EC7m 400k</span></p>
              </div>
              <div class="section-card wheel-card" style="text-align: center;">
                  <h3 class="wheel-title" style="margin-bottom: 15px;">V\xF2ng Quay May M\u1EAFn</h3>
                  <div class="wheel-box">
                      <div class="wheel-pointer"></div>
                      <div class="wheel-circle idle-spin" id="main-wheel">
                          <div class="wheel-label l1"><b>GI\u1EA2M 50K</b></div>
                          <div class="wheel-label l2"><b>GI\u1EA2M 50%</b></div>
                          <div class="wheel-label l3"><b>GI\u1EA2M 100K</b></div>
                          <div class="wheel-label l4"><b>GI\u1EA2M 80%</b></div>
                      </div>
                      <div class="wheel-center">MOS</div>
                  </div>
                  <div class="wheel-inputs">
                      <input type="text" placeholder="H\u1ECD t\xEAn c\u1EE7a b\u1EA1n" id="w-name">
                      <input type="text" placeholder="S\u1ED1 \u0111i\u1EC7n tho\u1EA1i c\u1EE7a b\u1EA1n" id="w-phone">
                  </div>
                  <button class="btn-action" onclick="spinWheel()">QUAY NGAY</button>
              </div>
          </div>

          <div class="right-col">
              <div class="section-card" id="bang-vang-container">
                  <h3 class="bv-title">\u{1F3C6} B\u1EA3ng V\xE0ng Ch\u1EE9ng Ch\u1EC9</h3>
                  <div class="carousel-viewport">
                      <div class="carousel-track">${studentData}</div>
                  </div>
              </div>
          </div>
      </div>

      <div class="services-grid">
          <div class="service-card"><h4>Thi Th\u1EADt 100%</h4><p class="small-desc">H\u1EC7 th\u1ED1ng m\xF4 ph\u1ECFng s\xE1t \u0111\u1EC1 qu\u1ED1c t\u1EBF.</p></div>
          <div class="service-card ai-chat-card" style="display: flex; flex-direction: column; justify-content: center;">
              <h4 style="color:var(--cyan); margin-bottom: 10px;">AI Assistant 24/7 \u2728</h4>
              <div class="chat-input-box">
                  <input type="text" placeholder="Ch\xE0o b\u1EA1n, h\u1ECFi MOS \u0111i..."><button style="color: white; font-family: 'Plus Jakarta Sans', sans-serif; font-weight:800;">G\u1EECI</button>
              </div>
          </div>
          <div class="service-card"><h4>\u0110\u1ED3ng h\xE0nh tr\u1ECDn \u0111\u1EDDi</h4><p class="small-desc">H\u1ED7 tr\u1EE3 \u0111\u1EC1 \xE1n, lu\u1EADn v\u0103n, tin h\u1ECDc c\xF4ng s\u1EDF.</p></div>
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
            if(!name || !phone) { alert('Vui l\xF2ng nh\u1EADp \u0111\u1EE7 th\xF4ng tin!'); return; }
            const wheel = document.getElementById('main-wheel');
            wheel.classList.remove('idle-spin');
            const deg = 3600 + Math.random() * 360;
            wheel.style.transition = 'transform 4s cubic-bezier(0.1, 0, 0.1, 1)';
            wheel.style.transform = 'rotate(' + deg + 'deg)';
            setTimeout(() => { alert('Ch\xFAc m\u1EEBng ' + name + '! MOS360 s\u1EBD li\xEAn h\u1EC7 \u01B0u \u0111\xE3i qua S\u0110T ' + phone); }, 4500);
        }
      <\/script>
      `;
  },
