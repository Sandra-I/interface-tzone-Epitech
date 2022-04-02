var localStorageMock = (function() {
    var store: {[key: string]: any} = {};
    return {
      getItem: function(key: string) {
        return store[key];
      },
      setItem: function(key: string, value: string) {
        store[key] = value.toString();
      },
      clear: function() {
        store = {};
      },
      removeItem: function(key: string) {
        delete store[key];
      }
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });