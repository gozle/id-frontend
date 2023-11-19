export const getUserIdFromToken = (token: string): number | null => {
  try {
    const payload = JSON.parse(window.atob(token.split('.')[1]));

    return payload.uid as number;
  } catch {
    return null;
  }
};
