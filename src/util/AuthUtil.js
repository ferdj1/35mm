import {ACCESS_TOKEN} from "../constants/AuthConstants";

export function isLoggedIn() {
  return localStorage.getItem(ACCESS_TOKEN);
}
