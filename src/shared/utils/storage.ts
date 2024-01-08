export const getLocal = (key: string, parse = false) => {
  if (typeof localStorage === undefined || !key) return '';
  if (parse) {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  return localStorage.getItem(key);
};

export const setLocal = (key: string, value: string) => {
  if (typeof localStorage === undefined || !key) return;

  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value.toString());
  }
};

export const removeLocal = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocal = () => {
  localStorage.clear();
};

export const getSession = (key: string, parse = false) => {
  if (typeof sessionStorage === undefined || !key) return '';
  if (parse) {
    const value = sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  return sessionStorage.getItem(key);
};

export const setSession = (key: string, value: string) => {
  if (typeof sessionStorage === undefined || !key) return;
  if (typeof value === 'object') {
    sessionStorage.setItem(key, JSON.stringify(value));
  } else {
    sessionStorage.setItem(key, value.toString());
  }
};

export const removeSession = (key: string) => {
  sessionStorage.removeItem(key);
};

export const clearSession = () => {
  sessionStorage.clear();
};
