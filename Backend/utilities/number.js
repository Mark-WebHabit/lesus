export function generateSixDigitCode() {
  const code = ("000000" + Math.floor(Math.random() * 1000000)).slice(-6);
  return code;
}
export const validPhone = (phone) => {
  const pattern = /^639\d{9}$/;

  return pattern.test(phone);
};
