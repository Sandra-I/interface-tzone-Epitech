const localStorageMock = (function initStorageMock() {
  let store: {[key: string]: any} = {};
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
}());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
