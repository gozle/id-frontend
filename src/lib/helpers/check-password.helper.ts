export const checkPassword = (value: string) =>
  /^[a-zA-Z0-9!@#$%^&*]{6,64}$/.test(value);
