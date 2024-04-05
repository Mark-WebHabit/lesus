import { isValidEmail } from "../utilities/strings.js";

test("check if input email is valid", () => {
  expect(isValidEmail("email@gmail.com")).toBe(true);
  expect(isValidEmail("email@gmail@.com")).toBe(false);
  expect(isValidEmail("gmail.com")).toBe(false);
  expect(isValidEmail("")).toBe(false);
});
