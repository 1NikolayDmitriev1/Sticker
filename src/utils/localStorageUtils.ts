export function saveToLocalStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
