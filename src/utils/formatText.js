export function capitalize(text) {
  if (!text) return '';
  const str = String(text).toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}
