import Cookies from 'js-cookie';

export function getCookies(name: string) {
  return Cookies.get(name);
}

export function getToken(key: string) {
  return localStorage.getItem(key);
}

export function setToken(key: string, token: string) {
  localStorage.setItem(key, token);
}

export function removeToken(key: string) {
  localStorage.removeItem(key);
}
