import { validPhone } from "../utilities/number";

test("check if contact is in a valid ph phone format ", () => {
  expect(validPhone("09127486790")).toBe(false);
  expect(validPhone("")).toBe(false);
  expect(validPhone("heloo989")).toBe(false);
  expect(validPhone("iyweighweoghlwehglehwgj")).toBe(false);
  expect(validPhone("6397645376521")).toBe(false);
  expect(validPhone("639764537652")).toBe(true);
});
