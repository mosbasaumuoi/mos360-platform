import {
    createLessonTemplate
}
    from "../../../templates/createLessonTemplate.js";

export const EXCEL_BASICS_LESSON =

    createLessonTemplate({

        id:
            "excel-basics",

        courseId:
            "mos-excel-expert",

        title:
            "Excel Basics",

        description:
            "Làm quen workflow Excel cơ bản.",

        duration:
            "10 phút",

        videoUrl:
            "https://www.youtube.com/embed/o7mmLCeA1D0?si=Mlk_F1W8eVyvmbKq",

        workflowSteps: [

            "Mở Excel",

            "Tạo bảng",

            "Lưu file"
        ],

        tips: [

            "Ctrl + S thường xuyên",

            "Dùng AutoSave"
        ],

        practicalContent:
            "Tạo bảng quản lý chi tiêu.",

        resources: [

            {

                type:
                    "document",

                title:
                    "Tài liệu Excel PDF",

                url:
                    "https://example.com/excel-guide.pdf"
            },

            {

                type:
                    "practice",

                title:
                    "File thực hành Excel",

                url:
                    "https://example.com/excel-practice.xlsx"
            }
        ]
    });