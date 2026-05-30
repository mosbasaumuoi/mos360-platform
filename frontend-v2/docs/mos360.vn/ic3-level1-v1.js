export const IC3_LEVEL1 = [
    {
        id: 1,
        level: "IC3_LEVEL1",
        category: "SOFTWARE",
        difficulty: "easy",
        type: "matching",
        question: "Ghép loại ứng dụng phần mềm với mục đích sử dụng phù hợp.",
        left: [
            "Phần mềm xử lý văn bản",
            "Ứng dụng bảng tính",
            "Hệ thống quản lý cơ sở dữ liệu",
            "Trình duyệt web",
            "Phần mềm trình chiếu"
        ],
        right: [
            "Nhập, chỉnh sửa và định dạng tài liệu",
            "Tính toán và hiển thị dữ liệu dạng biểu đồ",
            "Lưu trữ và quản lý tập hợp thông tin",
            "Truy cập thông tin trên Internet",
            "Hiển thị nội dung dưới dạng trình chiếu"
        ],
        answer: {
            "Phần mềm xử lý văn bản": 0,
            "Ứng dụng bảng tính": 1,
            "Hệ thống quản lý cơ sở dữ liệu": 2,
            "Trình duyệt web": 3,
            "Phần mềm trình chiếu": 4
        },
        explanation:
            "Mỗi loại phần mềm được thiết kế cho một nhóm tác vụ riêng biệt."
    },

    {
        id: 2,
        level: "IC3_LEVEL1",
        category: "HARDWARE",
        difficulty: "easy",
        type: "single",
        question:
            "Máy tính để bàn sử dụng phần cứng nào để lưu trữ dữ liệu lâu dài?",
        options: [
            "Ổ đĩa cứng",
            "CPU",
            "USB Flash",
            "Bo mạch chủ"
        ],
        answer: 0,
        explanation:
            "Ổ đĩa cứng hoặc SSD là thiết bị lưu trữ dữ liệu lâu dài."
    },

    {
        id: 3,
        level: "IC3_LEVEL1",
        category: "PII",
        difficulty: "medium",
        type: "multiple",
        question:
            "Những thông tin nào được xem là PII (Personally Identifiable Information)? Chọn 4.",
        options: [
            "Lịch sử quét sinh trắc học",
            "Địa chỉ gửi thư",
            "Địa chỉ IP",
            "Số an sinh xã hội",
            "Màu tóc"
        ],
        answer: [0, 1, 2, 3],
        explanation:
            "PII là các thông tin có thể nhận dạng hoặc truy vết đến một cá nhân."
    },

    {
        id: 4,
        level: "IC3_LEVEL1",
        category: "PRIVACY",
        difficulty: "easy",
        type: "single",
        question:
            "Cách an toàn để gửi thông tin nhận dạng cá nhân (PII) qua email là gì?",
        options: [
            "Không bao giờ gửi email",
            "Giải mã email",
            "Chỉ gửi cho người thân",
            "Mã hóa email"
        ],
        answer: 3,
        explanation:
            "Mã hóa email giúp bảo vệ dữ liệu khỏi việc bị đọc trái phép."
    },

    {
        id: 5,
        level: "IC3_LEVEL1",
        category: "NETWORK",
        difficulty: "easy",
        type: "truefalse",
        question:
            "Kết nối Ethernet thường cung cấp tốc độ ổn định hơn kết nối Wi-Fi.",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "Ethernet thường ổn định hơn và ít bị nhiễu hơn Wi-Fi."
    },

    {
        id: 6,
        level: "IC3_LEVEL1",
        category: "PRIVACY",
        difficulty: "easy",
        type: "multiple",
        question:
            "Đâu là hai hành động giúp duy trì quyền riêng tư kỹ thuật số? (Chọn 2)",
        options: [
            "Chặn cookie trong trình duyệt",
            "Chỉ dùng email trường học để gửi PII",
            "Tắt GPS khi không sử dụng",
            "Lưu tài liệu cá nhân ở mọi dịch vụ đám mây"
        ],
        answer: [0, 2],
        explanation:
            "Chặn cookie và tắt GPS giúp giảm việc theo dõi người dùng."
    },

    {
        id: 7,
        level: "IC3_LEVEL1",
        category: "BROWSER",
        difficulty: "easy",
        type: "single",
        question:
            "Người dùng có thể tắt tính năng lưu mật khẩu trực tuyến ở đâu?",
        options: [
            "Trong cài đặt trình duyệt",
            "Trong hộp thư đến",
            "Trong cài đặt máy tính",
            "Trong lịch sử duyệt web"
        ],
        answer: 0,
        explanation:
            "Các trình duyệt hiện đại đều có phần quản lý mật khẩu."
    },

    {
        id: 8,
        level: "IC3_LEVEL1",
        category: "PORTS",
        difficulty: "medium",
        type: "matching",
        question:
            "Ghép loại cáp với tên gọi tương ứng.",
        left: [
            "USB-C",
            "Micro USB",
            "Lightning",
            "USB Type-A"
        ],
        right: [
            "Hình A",
            "Hình B",
            "Hình C",
            "Hình D"
        ],
        answer: {
            "USB-C": 0,
            "Micro USB": 1,
            "Lightning": 2,
            "USB Type-A": 3
        },
        explanation:
            "Nhóm câu hỏi nhận diện chuẩn kết nối phần cứng."
    },

    {
        id: 9,
        level: "IC3_LEVEL1",
        category: "BROWSER",
        difficulty: "easy",
        type: "single",
        question:
            "Lợi ích chính của chế độ duyệt web riêng tư là gì?",
        options: [
            "Không lưu lịch sử, cookie và dữ liệu tạm trên thiết bị",
            "Ẩn hoàn toàn lưu lượng mạng",
            "Vô hiệu hóa đăng nhập",
            "Ẩn danh tuyệt đối trên Internet"
        ],
        answer: 0,
        explanation:
            "Private Browsing chỉ hạn chế lưu dữ liệu cục bộ trên thiết bị."
    },

    {
        id: 10,
        level: "IC3_LEVEL1",
        category: "PASSWORD",
        difficulty: "medium",
        type: "multiple",
        question:
            "Đâu là các thực hành tốt về mật khẩu? (Chọn 3)",
        options: [
            "Dùng mật khẩu khác nhau cho từng tài khoản",
            "Ghi mật khẩu ra giấy và luôn mang theo",
            "Sử dụng xác thực đa yếu tố",
            "Dùng mật khẩu hoặc cụm mật khẩu dài"
        ],
        answer: [0, 2, 3],
        explanation:
            "Mật khẩu mạnh + MFA là tiêu chuẩn bảo mật hiện đại."
    },

    {
        id: 11,
        level: "IC3_LEVEL1",
        category: "DEVICES",
        difficulty: "medium",
        type: "multiple",
        question:
            "Thiết bị nào đáp ứng yêu cầu chạy bằng pin và có bàn phím vật lý tích hợp? (Chọn 2)",
        options: [
            "Máy tính để bàn Mac",
            "Điện thoại Android",
            "Laptop Windows",
            "Máy tính bảng Android",
            "Chromebook"
        ],
        answer: [2, 4],
        explanation:
            "Laptop và Chromebook đều có bàn phím vật lý tích hợp."
    },

    {
        id: 12,
        level: "IC3_LEVEL1",
        category: "PII",
        difficulty: "medium",
        type: "truefalse",
        question:
            "Nơi sinh có thể được xem là thông tin nhận dạng cá nhân (PII).",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "Một số dữ liệu cá nhân có thể dùng để nhận dạng hoặc xác thực cá nhân."
    },

    {
        id: 13,
        level: "IC3_LEVEL1",
        category: "PORTS",
        difficulty: "medium",
        type: "matching",
        question:
            "Ghép cổng kết nối với hình tương ứng.",
        left: [
            "DisplayPort",
            "Ethernet",
            "USB",
            "HDMI",
            "Audio"
        ],
        right: [
            "Hình A",
            "Hình B",
            "Hình C",
            "Hình D",
            "Hình E"
        ],
        answer: {
            "DisplayPort": 3,
            "Ethernet": 4,
            "USB": 1,
            "HDMI": 2,
            "Audio": 0
        },
        explanation:
            "Nhận diện cổng kết nối là kỹ năng cơ bản của IC3 GS6."
    },

    {
        id: 14,
        level: "IC3_LEVEL1",
        category: "NETWORK",
        difficulty: "easy",
        type: "single",
        question:
            "Duyệt web riêng tư đảm bảo điều gì?",
        options: [
            "Không cần đổi mật khẩu",
            "Lịch sử duyệt web không được lưu",
            "Tài khoản luôn được ghi nhớ",
            "Tăng dung lượng lưu trữ"
        ],
        answer: 1,
        explanation:
            "Private Browsing không lưu lịch sử duyệt web trên thiết bị."
    },

    {
        id: 15,
        level: "IC3_LEVEL1",
        category: "NETWORK",
        difficulty: "easy",
        type: "single",
        question:
            "Thiết bị nào chuyển đổi tín hiệu số và tương tự để truyền qua mạng?",
        options: [
            "Ethernet Cable",
            "Router",
            "Modem",
            "Network Adapter"
        ],
        answer: 2,
        explanation:
            "Modem thực hiện quá trình điều chế và giải điều chế tín hiệu."
    },

    {
        id: 16,
        level: "IC3_LEVEL1",
        category: "OPEN_SOURCE",
        difficulty: "medium",
        type: "multiple",
        question:
            "Những phát biểu nào đúng về phần mềm nguồn mở? (Chọn 3)",
        options: [
            "Mã nguồn có thể được xem",
            "Người dùng có thể sửa đổi mã nguồn",
            "Luôn phải trả phí bản quyền",
            "Có thể được phân phối lại theo giấy phép phù hợp"
        ],
        answer: [0, 1, 3],
        explanation:
            "Đặc điểm chính của phần mềm nguồn mở là minh bạch và cho phép sửa đổi."
    },

    {
        id: 17,
        level: "IC3_LEVEL1",
        category: "INPUT_DEVICE",
        difficulty: "easy",
        type: "multiple",
        question:
            "Thiết bị nào là thiết bị nhập liệu? (Chọn 3)",
        options: [
            "Bàn phím",
            "Chuột",
            "Máy quét",
            "Màn hình",
            "Máy in"
        ],
        answer: [0, 1, 2],
        explanation:
            "Bàn phím, chuột và máy quét đều là thiết bị nhập dữ liệu."
    },

    {
        id: 18,
        level: "IC3_LEVEL1",
        category: "OPERATING_SYSTEM",
        difficulty: "easy",
        type: "single",
        question:
            "Chức năng chính của hệ điều hành là gì?",
        options: [
            "Quản lý phần cứng và phần mềm",
            "Lưu trữ dữ liệu lâu dài",
            "Kết nối Internet",
            "Tăng tốc CPU"
        ],
        answer: 0,
        explanation:
            "Hệ điều hành đóng vai trò trung gian giữa người dùng và phần cứng."
    },

    {
        id: 19,
        level: "IC3_LEVEL1",
        category: "CYBERBULLYING",
        difficulty: "medium",
        type: "multiple",
        question:
            "Đâu là các ví dụ về bắt nạt trên mạng? (Chọn 2)",
        options: [
            "Đăng video làm người khác xấu hổ",
            "Báo cáo nội dung vi phạm",
            "Tạo website để chế nhạo người khác",
            "Hủy kết bạn sau tranh luận"
        ],
        answer: [0, 2],
        explanation:
            "Bắt nạt trên mạng bao gồm hành vi xúc phạm, làm nhục hoặc lan truyền nội dung gây tổn hại."
    },

    {
        id: 20,
        level: "IC3_LEVEL1",
        category: "DIGITAL_CITIZENSHIP",
        difficulty: "easy",
        type: "truefalse",
        question:
            "Đăng tải hình ảnh riêng tư của người khác mà không được phép là hành vi không phù hợp trên môi trường số.",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "Đây là hành vi vi phạm quyền riêng tư và đạo đức số."
    },

    {
        id: 21,
        level: "IC3_LEVEL1",
        category: "NETWORK",
        difficulty: "medium",
        type: "truefalse",
        question:
            "Kết nối Ethernet thường có độ ổn định cao hơn Wi-Fi.",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "Kết nối có dây thường ít bị nhiễu và ổn định hơn."
    },

    {
        id: 22,
        level: "IC3_LEVEL1",
        category: "PASSWORD",
        difficulty: "easy",
        type: "single",
        question:
            "Xác thực đa yếu tố (MFA) giúp gì cho tài khoản?",
        options: [
            "Tăng tốc độ Internet",
            "Tăng cường bảo mật",
            "Tăng dung lượng lưu trữ",
            "Tăng hiệu suất CPU"
        ],
        answer: 1,
        explanation:
            "MFA bổ sung thêm lớp xác thực ngoài mật khẩu."
    },

    {
        id: 23,
        level: "IC3_LEVEL1",
        category: "NETWORK",
        difficulty: "easy",
        type: "single",
        question:
            "Thiết bị nào chịu trách nhiệm định tuyến dữ liệu giữa các mạng?",
        options: [
            "Router",
            "Máy in",
            "Scanner",
            "Webcam"
        ],
        answer: 0,
        explanation:
            "Router thực hiện việc định tuyến dữ liệu giữa các mạng."
    },

    {
        id: 24,
        level: "IC3_LEVEL1",
        category: "STORAGE",
        difficulty: "easy",
        type: "single",
        question:
            "Thiết bị nào được sử dụng để lưu trữ dữ liệu lâu dài?",
        options: [
            "RAM",
            "CPU",
            "SSD",
            "GPU"
        ],
        answer: 2,
        explanation:
            "SSD là thiết bị lưu trữ không mất dữ liệu khi tắt máy."
    },

    {
        id: 25,
        level: "IC3_LEVEL1",
        category: "PRIVACY",
        difficulty: "medium",
        type: "multiple",
        question:
            "Những dữ liệu nào có thể được xem là PII? (Chọn 3)",
        options: [
            "Ngày sinh",
            "Địa chỉ nhà",
            "Số điện thoại",
            "Màu yêu thích"
        ],
        answer: [0, 1, 2],
        explanation:
            "PII là thông tin có thể dùng để nhận dạng cá nhân."
    },

    {
        id: 26,
        level: "IC3_LEVEL1",
        category: "WEB_BROWSER",
        difficulty: "easy",
        type: "single",
        question:
            "Ứng dụng nào thường được sử dụng để truy cập Internet?",
        options: [
            "Microsoft Word",
            "Google Chrome",
            "Excel",
            "PowerPoint"
        ],
        answer: 1,
        explanation:
            "Chrome là trình duyệt web."
    },

    {
        id: 27,
        level: "IC3_LEVEL1",
        category: "SOFTWARE",
        difficulty: "easy",
        type: "single",
        question:
            "Ứng dụng nào phù hợp nhất để tạo bài thuyết trình?",
        options: [
            "PowerPoint",
            "Notepad",
            "Calculator",
            "Paint"
        ],
        answer: 0,
        explanation:
            "PowerPoint được thiết kế cho trình chiếu."
    },

    {
        id: 28,
        level: "IC3_LEVEL1",
        category: "ETHICS",
        difficulty: "medium",
        type: "truefalse",
        question:
            "Các tiêu chuẩn ứng xử trực tuyến nên tương tự như khi giao tiếp trực tiếp.",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "Đạo đức số yêu cầu tôn trọng người khác trên môi trường trực tuyến."
    },

    {
        id: 29,
        level: "IC3_LEVEL1",
        category: "PORTS",
        difficulty: "medium",
        type: "single",
        question:
            "Cổng mạng LAN thường được gọi là gì?",
        options: [
            "USB",
            "HDMI",
            "Ethernet",
            "DisplayPort"
        ],
        answer: 2,
        explanation:
            "Ethernet là chuẩn kết nối mạng có dây phổ biến."
    },

    {
        id: 30,
        level: "IC3_LEVEL1",
        category: "SECURITY",
        difficulty: "medium",
        type: "single",
        question:
            "Hành động nào an toàn nhất khi nhận email đáng ngờ?",
        options: [
            "Mở file đính kèm ngay",
            "Nhấp vào mọi liên kết để kiểm tra",
            "Xóa hoặc xác minh nguồn gửi trước khi mở",
            "Chuyển tiếp cho tất cả bạn bè"
        ],
        answer: 2,
        explanation:
            "Email đáng ngờ có thể chứa mã độc hoặc lừa đảo."
    },

    {
        id: 31,
        level: "IC3_LEVEL1",
        category: "NETWORK",
        difficulty: "medium",
        type: "single",
        question:
            "Thiết bị nào chịu trách nhiệm kết nối mạng gia đình với nhà cung cấp Internet?",
        options: [
            "Modem",
            "Máy in",
            "Scanner",
            "Webcam"
        ],
        answer: 0,
        explanation:
            "Modem thực hiện kết nối giữa mạng nội bộ và ISP."
    },

    {
        id: 32,
        level: "IC3_LEVEL1",
        category: "ETHICS",
        difficulty: "medium",
        type: "multiple",
        question:
            "Đâu là những ví dụ về hành vi đúng mực trên môi trường số? (Chọn 2)",
        options: [
            "Tôn trọng người khác khi trao đổi trực tuyến",
            "Chia sẻ thông tin cá nhân của đồng nghiệp",
            "Tuân thủ quy tắc ứng xử của tổ chức",
            "Đăng nội dung xúc phạm người khác"
        ],
        answer: [0, 2],
        explanation:
            "Đạo đức số yêu cầu tôn trọng người khác và tuân thủ quy định."
    },

    {
        id: 33,
        level: "IC3_LEVEL1",
        category: "SECURITY",
        difficulty: "easy",
        type: "single",
        question:
            "Phần mềm chống virus được sử dụng để làm gì?",
        options: [
            "Tăng tốc CPU",
            "Phát hiện và loại bỏ phần mềm độc hại",
            "Tăng dung lượng ổ cứng",
            "Nâng cấp RAM"
        ],
        answer: 1,
        explanation:
            "Antivirus giúp bảo vệ thiết bị khỏi mã độc."
    },

    {
        id: 34,
        level: "IC3_LEVEL1",
        category: "PRIVACY",
        difficulty: "medium",
        type: "truefalse",
        question:
            "Tắt GPS khi không sử dụng có thể giúp bảo vệ quyền riêng tư.",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "GPS có thể tiết lộ vị trí người dùng."
    },

    {
        id: 35,
        level: "IC3_LEVEL1",
        category: "WEB_BROWSER",
        difficulty: "easy",
        type: "single",
        question:
            "Cookie trên trình duyệt thường được dùng để làm gì?",
        options: [
            "Lưu một số thông tin phiên làm việc của người dùng",
            "Tăng tốc CPU",
            "Nâng cấp hệ điều hành",
            "Mã hóa toàn bộ Internet"
        ],
        answer: 0,
        explanation:
            "Cookie giúp website ghi nhớ tùy chọn và trạng thái đăng nhập."
    },

    {
        id: 36,
        level: "IC3_LEVEL1",
        category: "HARDWARE",
        difficulty: "easy",
        type: "single",
        question:
            "CPU là viết tắt của cụm từ nào?",
        options: [
            "Central Processing Unit",
            "Computer Power Utility",
            "Central Program Utility",
            "Computer Processing Utility"
        ],
        answer: 0,
        explanation:
            "CPU là bộ xử lý trung tâm của máy tính."
    },

    {
        id: 37,
        level: "IC3_LEVEL1",
        category: "STORAGE",
        difficulty: "medium",
        type: "multiple",
        question:
            "Thiết bị nào được sử dụng để lưu trữ dữ liệu? (Chọn 3)",
        options: [
            "SSD",
            "USB Flash",
            "Ổ cứng HDD",
            "CPU",
            "Card mạng"
        ],
        answer: [0, 1, 2],
        explanation:
            "SSD, USB và HDD đều là thiết bị lưu trữ."
    },

    {
        id: 38,
        level: "IC3_LEVEL1",
        category: "SOFTWARE",
        difficulty: "easy",
        type: "single",
        question:
            "Phần mềm bảng tính thường được sử dụng cho mục đích nào?",
        options: [
            "Soạn thảo văn bản",
            "Tính toán và phân tích dữ liệu",
            "Duyệt web",
            "Chỉnh sửa video"
        ],
        answer: 1,
        explanation:
            "Spreadsheet được dùng để xử lý dữ liệu dạng bảng."
    },

    {
        id: 39,
        level: "IC3_LEVEL1",
        category: "NETWORK",
        difficulty: "easy",
        type: "single",
        question:
            "Wi-Fi là công nghệ kết nối thuộc loại nào?",
        options: [
            "Mạng không dây",
            "Mạng có dây",
            "Lưu trữ dữ liệu",
            "Mã hóa dữ liệu"
        ],
        answer: 0,
        explanation:
            "Wi-Fi là chuẩn mạng không dây phổ biến."
    },

    {
        id: 40,
        level: "IC3_LEVEL1",
        category: "PASSWORD",
        difficulty: "medium",
        type: "single",
        question:
            "Mật khẩu nào mạnh nhất?",
        options: [
            "12345678",
            "password",
            "NguyenVanA",
            "T8#vL2!mQ9@x"
        ],
        answer: 3,
        explanation:
            "Mật khẩu mạnh nên dài, phức tạp và khó đoán."
    },

    {
        id: 41,
        level: "IC3_LEVEL1",
        category: "DIGITAL_CITIZENSHIP",
        difficulty: "medium",
        type: "truefalse",
        question:
            "Nội dung đăng trên Internet có thể tồn tại rất lâu dù đã bị xóa.",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "Nội dung số có thể được lưu trữ, sao chép hoặc lưu cache."
    },

    {
        id: 42,
        level: "IC3_LEVEL1",
        category: "INPUT_DEVICE",
        difficulty: "easy",
        type: "multiple",
        question:
            "Đâu là các thiết bị nhập liệu? (Chọn 3)",
        options: [
            "Bàn phím",
            "Chuột",
            "Micro",
            "Màn hình",
            "Máy in"
        ],
        answer: [0, 1, 2],
        explanation:
            "Các thiết bị nhập giúp đưa dữ liệu vào máy tính."
    },

    {
        id: 43,
        level: "IC3_LEVEL1",
        category: "SECURITY",
        difficulty: "medium",
        type: "single",
        question:
            "Phishing là gì?",
        options: [
            "Một hình thức lừa đảo để đánh cắp thông tin",
            "Một loại ổ cứng",
            "Một giao thức mạng",
            "Một trình duyệt web"
        ],
        answer: 0,
        explanation:
            "Phishing là hình thức giả mạo nhằm lấy cắp dữ liệu người dùng."
    },

    {
        id: 44,
        level: "IC3_LEVEL1",
        category: "CYBERBULLYING",
        difficulty: "medium",
        type: "multiple",
        question:
            "Đâu là ví dụ của bắt nạt trên mạng? (Chọn 2)",
        options: [
            "Đăng video làm nhục người khác",
            "Tạo trang web chế giễu ai đó",
            "Báo cáo nội dung vi phạm",
            "Chặn quảng cáo"
        ],
        answer: [0, 1],
        explanation:
            "Đây là những hành vi gây tổn hại đến người khác trên môi trường số."
    },

    {
        id: 45,
        level: "IC3_LEVEL1",
        category: "PRESENTATION",
        difficulty: "easy",
        type: "truefalse",
        question:
            "Trong bài trình chiếu, nên sử dụng độ tương phản rõ ràng giữa màu nền và màu chữ.",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "Độ tương phản tốt giúp người xem dễ đọc nội dung."
    },

    {
        id: 46,
        level: "IC3_LEVEL1",
        category: "PRESENTATION",
        difficulty: "easy",
        type: "single",
        question:
            "Phần mềm nào thường được sử dụng để tạo bài thuyết trình?",
        options: [
            "PowerPoint",
            "Excel",
            "Chrome",
            "Notepad"
        ],
        answer: 0,
        explanation:
            "Microsoft PowerPoint là phần mềm trình chiếu phổ biến."
    },

    {
        id: 47,
        level: "IC3_LEVEL1",
        category: "SOFTWARE",
        difficulty: "easy",
        type: "single",
        question:
            "Phần mềm cơ sở dữ liệu được dùng để làm gì?",
        options: [
            "Lưu trữ và quản lý dữ liệu",
            "Duyệt Internet",
            "Chỉnh sửa ảnh",
            "Phát video"
        ],
        answer: 0,
        explanation:
            "Database Software dùng để quản lý và truy xuất dữ liệu."
    },

    {
        id: 48,
        level: "IC3_LEVEL1",
        category: "PRIVACY",
        difficulty: "medium",
        type: "multiple",
        question:
            "Những biện pháp nào giúp bảo vệ quyền riêng tư trực tuyến? (Chọn 3)",
        options: [
            "Sử dụng MFA",
            "Chia sẻ vị trí công khai mọi lúc",
            "Kiểm tra cài đặt quyền riêng tư",
            "Cập nhật phần mềm thường xuyên",
            "Dùng chung tài khoản với bạn bè"
        ],
        answer: [0, 2, 3],
        explanation:
            "MFA, cập nhật phần mềm và quản lý quyền riêng tư giúp tăng cường bảo mật."
    },

    {
        id: 49,
        level: "IC3_LEVEL1",
        category: "HARDWARE",
        difficulty: "easy",
        type: "single",
        question:
            "RAM có chức năng chính nào?",
        options: [
            "Lưu trữ tạm thời dữ liệu đang sử dụng",
            "Kết nối Internet",
            "Hiển thị hình ảnh",
            "In tài liệu"
        ],
        answer: 0,
        explanation:
            "RAM là bộ nhớ tạm thời được sử dụng khi hệ thống đang hoạt động."
    },

    {
        id: 50,
        level: "IC3_LEVEL1",
        category: "SECURITY",
        difficulty: "medium",
        type: "truefalse",
        question:
            "Bạn nên cài đặt các bản cập nhật bảo mật ngay khi có thể.",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "Cập nhật giúp vá các lỗ hổng bảo mật đã biết."
    },

    {
        id: 51,
        level: "IC3_LEVEL1",
        category: "NETWORK",
        difficulty: "easy",
        type: "single",
        question:
            "Thiết bị nào thường phát tín hiệu Wi-Fi trong gia đình?",
        options: [
            "Router",
            "Scanner",
            "Monitor",
            "Printer"
        ],
        answer: 0,
        explanation:
            "Router thường cung cấp kết nối mạng không dây cho các thiết bị."
    },

    {
        id: 52,
        level: "IC3_LEVEL1",
        category: "EMAIL",
        difficulty: "medium",
        type: "single",
        question:
            "Dấu hiệu nào thường xuất hiện trong email lừa đảo?",
        options: [
            "Yêu cầu cung cấp mật khẩu hoặc thông tin nhạy cảm",
            "Địa chỉ người gửi quen thuộc",
            "Nội dung rõ ràng và chính xác",
            "Không có liên kết nào"
        ],
        answer: 0,
        explanation:
            "Email phishing thường cố lấy thông tin đăng nhập hoặc dữ liệu cá nhân."
    },

    {
        id: 53,
        level: "IC3_LEVEL1",
        category: "FILE_MANAGEMENT",
        difficulty: "easy",
        type: "single",
        question:
            "Thư mục (Folder) được dùng để làm gì?",
        options: [
            "Tổ chức và lưu trữ tập tin",
            "Tăng tốc CPU",
            "Kết nối Internet",
            "Mã hóa dữ liệu"
        ],
        answer: 0,
        explanation:
            "Folder giúp sắp xếp dữ liệu khoa học và dễ quản lý."
    },

    {
        id: 54,
        level: "IC3_LEVEL1",
        category: "DIGITAL_CITIZENSHIP",
        difficulty: "medium",
        type: "truefalse",
        question:
            "Bạn nên kiểm chứng nguồn tin trước khi chia sẻ lên mạng.",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "Kiểm chứng nguồn giúp hạn chế lan truyền thông tin sai lệch."
    },

    {
        id: 55,
        level: "IC3_LEVEL1",
        category: "BROWSER",
        difficulty: "easy",
        type: "single",
        question:
            "Bookmark trong trình duyệt dùng để làm gì?",
        options: [
            "Lưu địa chỉ trang web để truy cập nhanh",
            "Xóa lịch sử duyệt web",
            "Tăng tốc Internet",
            "Chặn virus"
        ],
        answer: 0,
        explanation:
            "Bookmark giúp lưu các trang web thường xuyên sử dụng."
    },

    {
        id: 56,
        level: "IC3_LEVEL1",
        category: "PORTS",
        difficulty: "medium",
        type: "single",
        question:
            "Cổng HDMI thường được sử dụng để truyền gì?",
        options: [
            "Âm thanh và hình ảnh",
            "Dữ liệu mạng",
            "Nguồn điện",
            "Tín hiệu GPS"
        ],
        answer: 0,
        explanation:
            "HDMI truyền đồng thời tín hiệu hình ảnh và âm thanh số."
    },

    {
        id: 57,
        level: "IC3_LEVEL1",
        category: "PASSWORD",
        difficulty: "medium",
        type: "single",
        question:
            "Cụm mật khẩu (passphrase) thường an toàn hơn vì lý do gì?",
        options: [
            "Dài hơn và khó đoán hơn",
            "Luôn chứa ký tự đặc biệt",
            "Không cần ghi nhớ",
            "Không thể bị tấn công"
        ],
        answer: 0,
        explanation:
            "Độ dài là một trong những yếu tố quan trọng nhất của mật khẩu mạnh."
    },

    {
        id: 58,
        level: "IC3_LEVEL1",
        category: "OPEN_SOURCE",
        difficulty: "medium",
        type: "truefalse",
        question:
            "Người dùng có thể xem mã nguồn của phần mềm nguồn mở.",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "Khả năng truy cập mã nguồn là đặc trưng của Open Source."
    },

    {
        id: 59,
        level: "IC3_LEVEL1",
        category: "CLOUD",
        difficulty: "easy",
        type: "single",
        question:
            "Lợi ích chính của lưu trữ đám mây là gì?",
        options: [
            "Truy cập dữ liệu từ nhiều thiết bị",
            "Tăng tốc CPU",
            "Thay thế hệ điều hành",
            "Loại bỏ hoàn toàn virus"
        ],
        answer: 0,
        explanation:
            "Cloud Storage cho phép truy cập dữ liệu mọi lúc, mọi nơi."
    },

    {
        id: 60,
        level: "IC3_LEVEL1",
        category: "SECURITY",
        difficulty: "medium",
        type: "multiple",
        question:
            "Những hành động nào giúp bảo vệ tài khoản trực tuyến? (Chọn 3)",
        options: [
            "Bật MFA",
            "Dùng mật khẩu mạnh",
            "Chia sẻ mật khẩu cho bạn bè",
            "Cập nhật mật khẩu định kỳ",
            "Dùng cùng một mật khẩu cho mọi dịch vụ"
        ],
        answer: [0, 1, 3],
        explanation:
            "MFA, mật khẩu mạnh và thay đổi định kỳ là các thực hành bảo mật cơ bản."
    },

    {
        id: 61,
        level: "IC3_LEVEL1",
        category: "HARDWARE",
        difficulty: "easy",
        type: "single",
        question:
            "Thiết bị nào hiển thị hình ảnh từ máy tính?",
        options: [
            "Màn hình",
            "Bàn phím",
            "Router",
            "Micro"
        ],
        answer: 0,
        explanation:
            "Màn hình là thiết bị xuất dữ liệu hình ảnh."
    },

    {
        id: 62,
        level: "IC3_LEVEL1",
        category: "INPUT_DEVICE",
        difficulty: "easy",
        type: "single",
        question:
            "Thiết bị nào thường được sử dụng để nhập âm thanh vào máy tính?",
        options: [
            "Micro",
            "Loa",
            "Máy chiếu",
            "Màn hình"
        ],
        answer: 0,
        explanation:
            "Micro là thiết bị nhập âm thanh."
    },

    {
        id: 63,
        level: "IC3_LEVEL1",
        category: "OUTPUT_DEVICE",
        difficulty: "easy",
        type: "multiple",
        question:
            "Đâu là các thiết bị xuất dữ liệu? (Chọn 3)",
        options: [
            "Màn hình",
            "Loa",
            "Máy in",
            "Chuột",
            "Bàn phím"
        ],
        answer: [0, 1, 2],
        explanation:
            "Các thiết bị xuất hiển thị hoặc phát dữ liệu ra bên ngoài."
    },

    {
        id: 64,
        level: "IC3_LEVEL1",
        category: "NETWORK",
        difficulty: "medium",
        type: "single",
        question:
            "Địa chỉ IP được sử dụng để làm gì?",
        options: [
            "Nhận dạng thiết bị trên mạng",
            "Lưu trữ dữ liệu",
            "Tăng tốc Internet",
            "Mã hóa tập tin"
        ],
        answer: 0,
        explanation:
            "IP giúp các thiết bị liên lạc với nhau trên mạng."
    },

    {
        id: 65,
        level: "IC3_LEVEL1",
        category: "EMAIL",
        difficulty: "easy",
        type: "single",
        question:
            "CC trong email thường được dùng để làm gì?",
        options: [
            "Gửi bản sao cho người nhận khác",
            "Xóa email",
            "Mã hóa email",
            "Lưu email"
        ],
        answer: 0,
        explanation:
            "CC cho phép nhiều người cùng nhận bản sao email."
    },

    {
        id: 66,
        level: "IC3_LEVEL1",
        category: "EMAIL",
        difficulty: "medium",
        type: "single",
        question:
            "BCC trong email có ý nghĩa gì?",
        options: [
            "Người nhận bị ẩn",
            "Người nhận ưu tiên",
            "Email đã mã hóa",
            "Email đã lưu"
        ],
        answer: 0,
        explanation:
            "BCC giúp ẩn danh sách người nhận khỏi những người khác."
    },

    {
        id: 67,
        level: "IC3_LEVEL1",
        category: "FILE_MANAGEMENT",
        difficulty: "easy",
        type: "single",
        question:
            "Phần mở rộng .pdf thường dùng cho loại tệp nào?",
        options: [
            "Tài liệu",
            "Âm thanh",
            "Video",
            "Hệ điều hành"
        ],
        answer: 0,
        explanation:
            "PDF là định dạng tài liệu phổ biến."
    },

    {
        id: 68,
        level: "IC3_LEVEL1",
        category: "FILE_MANAGEMENT",
        difficulty: "easy",
        type: "single",
        question:
            "Phần mở rộng .xlsx thuộc loại tệp nào?",
        options: [
            "Bảng tính",
            "Video",
            "Âm thanh",
            "Hình ảnh"
        ],
        answer: 0,
        explanation:
            ".xlsx là định dạng Microsoft Excel."
    },

    {
        id: 69,
        level: "IC3_LEVEL1",
        category: "FILE_MANAGEMENT",
        difficulty: "easy",
        type: "single",
        question:
            "Phần mở rộng .pptx thuộc loại tệp nào?",
        options: [
            "Trình chiếu",
            "Cơ sở dữ liệu",
            "Âm thanh",
            "Hình ảnh"
        ],
        answer: 0,
        explanation:
            ".pptx là định dạng PowerPoint."
    },

    {
        id: 70,
        level: "IC3_LEVEL1",
        category: "OPERATING_SYSTEM",
        difficulty: "easy",
        type: "single",
        question:
            "Đâu là một hệ điều hành?",
        options: [
            "Windows",
            "Chrome",
            "Excel",
            "PowerPoint"
        ],
        answer: 0,
        explanation:
            "Windows là hệ điều hành phổ biến."
    },

    {
        id: 71,
        level: "IC3_LEVEL1",
        category: "CLOUD",
        difficulty: "medium",
        type: "truefalse",
        question:
            "Dữ liệu lưu trên đám mây có thể được truy cập từ nhiều thiết bị.",
        options: ["Đúng", "Sai"],
        answer: 0,
        explanation:
            "Đó là một trong những ưu điểm chính của cloud."
    },

    {
        id: 72,
        level: "IC3_LEVEL1",
        category: "PRIVACY",
        difficulty: "medium",
        type: "single",
        question:
            "Thông tin nào KHÔNG nên chia sẻ công khai trên Internet?",
        options: [
            "Số điện thoại cá nhân",
            "Sở thích âm nhạc",
            "Màu yêu thích",
            "Đội bóng yêu thích"
        ],
        answer: 0,
        explanation:
            "Số điện thoại là dữ liệu cá nhân cần được bảo vệ."
    },

    {
        id: 73,
        level: "IC3_LEVEL1",
        category: "PASSWORD",
        difficulty: "medium",
        type: "truefalse",
        question:
            "Sử dụng cùng một mật khẩu cho mọi tài khoản là thực hành tốt.",
        options: ["Đúng", "Sai"],
        answer: 1,
        explanation:
            "Mỗi tài khoản nên có mật khẩu riêng."
    },

    {
        id: 74,
        level: "IC3_LEVEL1",
        category: "SECURITY",
        difficulty: "medium",
        type: "single",
        question:
            "Malware là gì?",
        options: [
            "Phần mềm độc hại",
            "Thiết bị lưu trữ",
            "Trình duyệt web",
            "Mạng nội bộ"
        ],
        answer: 0,
        explanation:
            "Malware là thuật ngữ chung cho phần mềm gây hại."
    },

    {
        id: 75,
        level: "IC3_LEVEL1",
        category: "SECURITY",
        difficulty: "medium",
        type: "single",
        question:
            "Firewall có nhiệm vụ gì?",
        options: [
            "Kiểm soát lưu lượng mạng",
            "Lưu trữ dữ liệu",
            "Tăng tốc CPU",
            "Tạo bài trình chiếu"
        ],
        answer: 0,
        explanation:
            "Firewall giúp bảo vệ hệ thống khỏi truy cập trái phép."
    },

    {
        id: 76,
        level: "IC3_LEVEL1",
        category: "NETWORK",
        difficulty: "easy",
        type: "single",
        question:
            "Internet là gì?",
        options: [
            "Mạng kết nối các mạng trên toàn thế giới",
            "Một hệ điều hành",
            "Một trình duyệt",
            "Một cơ sở dữ liệu"
        ],
        answer: 0,
        explanation:
            "Internet là mạng toàn cầu kết nối hàng tỷ thiết bị."
    },

    {
        id: 77,
        level: "IC3_LEVEL1",
        category: "SOFTWARE",
        difficulty: "easy",
        type: "single",
        question:
            "Microsoft Word thuộc nhóm phần mềm nào?",
        options: [
            "Xử lý văn bản",
            "Bảng tính",
            "Thiết kế đồ họa",
            "Cơ sở dữ liệu"
        ],
        answer: 0,
        explanation:
            "Word là phần mềm soạn thảo văn bản."
    },

    {
        id: 78,
        level: "IC3_LEVEL1",
        category: "SOFTWARE",
        difficulty: "easy",
        type: "single",
        question:
            "Microsoft Excel thuộc nhóm phần mềm nào?",
        options: [
            "Bảng tính",
            "Trình duyệt",
            "Hệ điều hành",
            "Email"
        ],
        answer: 0,
        explanation:
            "Excel là phần mềm xử lý bảng tính."
    },

    {
        id: 79,
        level: "IC3_LEVEL1",
        category: "SOFTWARE",
        difficulty: "easy",
        type: "single",
        question:
            "Microsoft PowerPoint thuộc nhóm phần mềm nào?",
        options: [
            "Trình chiếu",
            "Email",
            "Mạng",
            "Bảo mật"
        ],
        answer: 0,
        explanation:
            "PowerPoint dùng để tạo và trình bày slide."
    },

    {
        id: 80,
        level: "IC3_LEVEL1",
        category: "DIGITAL_CITIZENSHIP",
        difficulty: "medium",
        type: "multiple",
        question:
            "Đâu là các hành vi thể hiện công dân số có trách nhiệm? (Chọn 3)",
        options: [
            "Tôn trọng người khác trên mạng",
            "Kiểm chứng thông tin trước khi chia sẻ",
            "Bảo vệ thông tin cá nhân",
            "Phát tán tin đồn",
            "Chia sẻ mật khẩu cho bạn bè"
        ],
        answer: [0, 1, 2],
        explanation:
            "Công dân số có trách nhiệm cần tôn trọng, xác minh và bảo vệ dữ liệu cá nhân."
    }

];
export default IC3_LEVEL1;
