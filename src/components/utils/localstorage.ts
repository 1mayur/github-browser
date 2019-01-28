export enum Keys {
  USER = 'auth/user',
  CLIENT_ID = 'auth/client_id',
  STATE = 'auth/state',
  CODE = 'auth/code',
  TOKEN = 'auth/token',
}
const NOT_SUPPORTED_MESSAGE = 'Localstorage not supported';

export const lsSet = (key: string, value: any): void => {
  try {
    if (typeof value === 'string') {
      return localStorage.setItem(key, value);
    } else {
      return localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.log(NOT_SUPPORTED_MESSAGE);
  }
};

export const lsGet = (key: Keys) => {
  try {
    const value = localStorage.getItem(key);
    try {
      return value && JSON.parse(value);
    } catch (e) {
      return value;
    }
  } catch (e) {
    console.log(NOT_SUPPORTED_MESSAGE);
  }
};

export const clearUser = (): void => {
  try {
    localStorage.removeItem(Keys.CODE);
    localStorage.removeItem(Keys.TOKEN);
    localStorage.removeItem(Keys.USER);
  } catch (e) {
    console.log(NOT_SUPPORTED_MESSAGE);
  }
};
