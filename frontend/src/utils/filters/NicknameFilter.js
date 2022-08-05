export default function NicknameFilter(e) {
  const nickname = e.target.value;
  console.log(nickname);
  const regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-9|a-z|A-Z]/g;
  for (let c of nickname) {
    console.log(c);
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
