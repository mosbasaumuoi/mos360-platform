import { getHomePage } from "./pages/home.js";
import { getHeader } from "./components/header.js";
import { getFooter } from "./components/footer.js";

export default {
  async fetch(request) {

    const html = `
      <!DOCTYPE html>
      <html>
      <body>

        ${getHeader()}

        ${getHomePage()}

        ${getFooter()}

      </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};
