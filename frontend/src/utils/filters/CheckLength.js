export function CheckLength(e, maxLength) {
  if (e.target.value.length > maxLength) {
    e.target.value = e.target.value.slice(0, maxLength);
  }
}
