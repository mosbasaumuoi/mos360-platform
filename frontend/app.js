import { router } from "./core/router.js";
import { login, api } from "./core/apiClient.js";

// expose để test trong console
window.login = login;
window.api = api;

document.addEventListener("DOMContentLoaded", () => {
  router();
});
