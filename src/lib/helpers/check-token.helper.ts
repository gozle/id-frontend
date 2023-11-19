export const checkToken = (token: string) => {
  try {
    return JSON.parse(window.atob(token.split('.')[1])).exp > Date.now() / 1000;
  } catch {
    return false;
  }
};
