import { login } from "../api/auth/login.mjs";

const form = document.querySelector("#loginUser");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    console.log(profile);

    login(profile);
  });
}
