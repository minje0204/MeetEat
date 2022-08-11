export default function NicknameFilter(e) {
  const nickname = e.target.value;
  const regExp = /[가-힣0-9a-zA-Z]/;
  for (let c of nickname) {
    if (regExp.test(c)) {
      continue;
    } else {
      return false;
    }
  }
  if (nickname.length < 2 || nickname.length > 8) {
    return false;
  }
  return true;
}
