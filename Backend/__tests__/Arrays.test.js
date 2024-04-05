import { hasFalsyElement } from "../utilities/array";

test("check if any elements pass is falsy ", () => {
  expect(hasFalsyElement("")).toBe(true);
  expect(hasFalsyElement("test", null)).toBe(true);
  expect(hasFalsyElement("test", "none", 100)).toBe(false);
});
