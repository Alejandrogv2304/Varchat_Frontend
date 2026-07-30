const ACCESS_TOKEN_STORAGE_KEY = 'varchat.accessToken';

export const setAccessToken = (token: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
};

export const getAccessToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
};

export const clearAccessToken = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
};
