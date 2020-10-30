export const localDB = {
  // set: (key: string, obj: any) => {
  //   localStorage.setItem(key, JSON.stringify(obj));
  // },
  set(key: string, obj: any) {
    localStorage.setItem(key, JSON.stringify(obj));
  },

  get<T>(key: string): T {
    const item = localStorage.getItem(key);

    if (!item) {
      return;
    }

    return JSON.parse(item);
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};
