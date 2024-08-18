import * as constants from "./api/constants.mjs";
import { setLoginFormListener } from "./handlers/login.mjs";

const path = location.pathname;

if (path == "/html/profile/login/") {
  setLoginFormListener();
} // else if (path == "/html/profile/register/") {
// setRegisterFormListener();
//}
