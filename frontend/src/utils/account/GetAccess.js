export function isLogin() {
  return !!sessionStorage.getItem("logged");
}
