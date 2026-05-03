export const indexHTML = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>MOS360</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body { font-family: Arial; margin:0; background:#f5f7fb; }
header { background:#0f172a; color:white; padding:16px; text-align:center; }
.container { padding:20px; }

.course {
  background:white;
  padding:15px;
  margin-bottom:12px;
  border-radius:10px;
  box-shadow:0 3px 10px rgba(0,0,0,0.1);
}

.side-socials {
  position:fixed;
  right:10px;
  bottom:20px;
  display:flex;
  flex-direction:column;
  gap:10px;
}

.s-btn {
  width:50px;
  height:50px;
  border-radius:50%;
  background:white;
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 4px 10px rgba(0,0,0,0.2);
  cursor:pointer;
}

.s-btn img { width:28px; }
</style>
</head>

<body>

<header>
<h1>MOS360 🚀</h1>
<p>Nền tảng học MOS + AI</p>
</header>

<div class="container">
<h2>Khóa học nổi bật</h2>
<div id="courses">Đang tải...</div>
</div>

<div class="side-socials">
  <div class="s-btn" onclick="trackAndOpen('zalo','https://zalo.me/0912888360')">
    <img src="https://img.icons8.com/color/48/zalo.png">
  </div>

  <div class="s-btn" onclick="trackAndOpen('facebook','https://facebook.com/mos360.vn')">
    <img src="https://img.icons8.com/color/48/facebook-new.png">
  </div>

  <div class="s-btn" onclick="trackAndOpen('messenger','https://m.me/mos360.vn')">
    <img src="https://img.icons8.com/color/48/facebook-messenger--v1.png">
  </div>
</div>

<script>
async function loadCourses() {
  try {
    const res = await fetch("/api/public/courses");
    const data = await res.json();

    document.getElementById("courses").innerHTML =
      data.map(c => \`
        <div class="course">
          <h3>\${c.title}</h3>
          <p>\${c.description}</p>
        </div>
      \`).join("");

  } catch {
    document.getElementById("courses").innerText = "Lỗi tải dữ liệu";
  }
}

function trackAndOpen(source, url) {
  fetch("/api/public/track?source=" + source)
    .finally(() => {
      setTimeout(() => {
        window.open(url, "_blank");
      }, 150);
    });
}

loadCourses();
<\/script>

</body>
</html>`;
