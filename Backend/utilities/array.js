export const hasFalsyElement = (...arr) => {
  // Check if any element is falsy or an empty string
  for (const element of arr) {
    if (!element || element === "") {
      return true; // Return true if a falsy element or an empty string is found
    }
  }
  return false; // Return false if no falsy elements or empty strings are found
};
