import { register } from "../api/auth/register.mjs";
const form = document.querySelector("#registerUser");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  console.log(profile);
  register(profile);
});
