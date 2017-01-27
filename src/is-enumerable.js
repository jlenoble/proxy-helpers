export default function isEnumerable (obj) {
  const type = typeof obj;
  if (type === 'string' || obj instanceof String) {
    return false;
  }
  return type === 'object' && obj !== null && (obj.length > 0 ||
    Object.keys(obj).length > 0);
}
